import React, { useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikProps } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Row } from "../Flex";
import { FormLabel } from "@material-ui/core";

export enum FormFieldType {
  TEXT,
  OPTION,
  SWITCH
}

export interface FormField {
  type: FormFieldType;
  name: string;
  label?: string;
  helpText?: string;
  initialValue?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%"
    },
    submitButtonHolder: {
      justifyContent: "flex-end"
    }
  })
);

const renderFields = (
  fields: FormField[],
  props: FormikProps<{ [name: string]: any }>,
  handleChange: (
    props: FormikProps<{ [name: string]: any }>,
    name: string,
    event: React.ChangeEvent<any>,
    value: any
  ) => void,
  customClasses?: Record<string, string>
) => {
  const children: JSX.Element[] = fields.map(field => {
    const { type, name, label, helpText, initialValue } = field;

    // Render Correct Field Component
    switch (type) {
      case FormFieldType.TEXT:
        return (
          // TODO: Move Component into a NeroTextField Component and pass in `field={field}`
          <TextField
            name={name}
            label={label}
            onChange={e => handleChange(props, name, e, e.target.value)}
            helperText={helpText}
            key={name}
            value={initialValue}
            className={!!customClasses ? customClasses[name] : undefined}
          />
        );
      case FormFieldType.SWITCH:
        return (
          <React.Fragment>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked={!!initialValue}
                  onChange={e => handleChange(props, name, e, e.target.checked)}
                  key={name}
                  name={name}
                />
              }
              className={!!customClasses ? customClasses[name] : undefined}
              label={label}
            />
            {!!helpText && (
              <FormLabel
                className={!!customClasses ? customClasses[name] : undefined}
                component="legend"
              >
                {helpText}
              </FormLabel>
            )}
          </React.Fragment>
        );
      default:
        return <React.Fragment key="ERROR" />;
    }
  });

  return children;
};

const reduceInitialValues = (fields: FormField[]): { [name: string]: any } => {
  const obj: { [name: string]: any } = {};
  for (const field of fields) {
    if (!!field.initialValue) obj[field.name] = field.initialValue;
    else obj[field.name] = null;
  }
  return obj;
};

interface NeroFormProps {
  fields: FormField[];
  onSubmit: (values: { [name: string]: any }) => Promise<void>;
  onChange?: (name: string, value: any) => void;
  submitButtonText?: string;
  customClasses?: Record<never, string>;
}

export const NeroForm = (props: NeroFormProps) => {
  const { fields, onSubmit, submitButtonText, onChange, customClasses } = props;
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);

  const handleFormSubmit = async (values: { [name: string]: any }) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
  };

  const handleChange = (
    formikProps: FormikProps<{ [name: string]: any }>,
    name: string,
    event: React.ChangeEvent<any>,
    value: any
  ) => {
    formikProps.handleChange(event);

    if (!!onChange) {
      onChange(name, value);
    }
  };

  return (
    <Formik
      initialValues={reduceInitialValues(fields)}
      onSubmit={handleFormSubmit}
      render={formProps => {
        return (
          <form className={classes.form} onSubmit={formProps.handleSubmit}>
            {/* FIELDS THAT GET RENDERED IN THE FORM */}
            <>{renderFields(fields, formProps, handleChange, customClasses)}</>

            {/* FORM SUBMIT BUTTON ON ALL FORMS */}
            <Row className={classes.submitButtonHolder}>
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                color="primary"
                key="submit-button"
              >
                {submitButtonText || "Submit"}
              </Button>
            </Row>
          </form>
        );
      }}
    />
  );
};
