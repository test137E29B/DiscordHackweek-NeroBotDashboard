import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export const FeaturesPage = () => {
  const classes = useStyles();
  return <React.Fragment>{/* PAGE CONTENTS */}</React.Fragment>;
};
