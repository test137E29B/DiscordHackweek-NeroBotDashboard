import React from "react";
import { Button, Theme, CircularProgress } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";
import clsx from "clsx";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonProgress: {
      color: theme.palette.secondary.main,
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    wrapper: { position: "relative" },
    gutterBottom: { marginBottom: theme.spacing(2) }
  })
);

export type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  gutterBottom?: boolean;
};

export const LoadingButton = (props: LoadingButtonProps) => {
  const { loading, gutterBottom, ...rest } = props;
  const classes = useStyles(props);
  return (
    <div
      className={clsx(classes.wrapper, {
        [classes.gutterBottom]: gutterBottom
      })}
    >
      <Button {...rest} />
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
