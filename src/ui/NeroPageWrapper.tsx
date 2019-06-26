import React, { ReactNode } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleHolder: {
      width: "100%",
      margin: `${theme.spacing(1)}px 0px ${theme.spacing(3)}px 0px`
    },
    title: {
      margin: `0px 0px ${theme.spacing(0.5)}px 0px`,
      color: theme.palette.primary.dark
    },
    description: {
      margin: `0px 0px ${theme.spacing(0.5)}px 0px`,
      color: theme.palette.text.secondary
    }
  })
);

interface NeroPageWrapperProps {
  children?: ReactNode;
  title?: string;
  description?: string;
}

export const NeroPageWrapper = (props: NeroPageWrapperProps) => {
  const classes = useStyles();
  const { children, title, description } = props;
  return (
    <React.Fragment>
      <div className={classes.titleHolder}>
        {!!title && (
          <Typography className={classes.title} variant="h5">
            {title}
          </Typography>
        )}
        {!!description && (
          <Typography className={classes.description} variant="body1">
            {description}
          </Typography>
        )}
      </div>
      {children}
    </React.Fragment>
  );
};
