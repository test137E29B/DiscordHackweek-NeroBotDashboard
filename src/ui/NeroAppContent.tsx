import React, { ReactNode } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: `calc(100% - ${theme.spacing(8)}px)`,
      maxHeight: `calc(100% - ${theme.spacing(8)}px)`,
      position: "absolute",
      top: theme.spacing(8),
      left: 0,
      width: "100%",
      display: "flex"
    }
  })
);

interface NeroAppContentProps {
  children?: ReactNode;
}

export const NeroAppContent = (props: NeroAppContentProps) => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};
