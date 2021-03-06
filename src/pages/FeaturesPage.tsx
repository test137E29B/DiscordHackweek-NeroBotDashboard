import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { FeaturesForm } from "../components/Features/FeaturesForm";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      width: "70%",
      marginLeft: "15%"
    }
  })
);

export const FeaturesPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <FeaturesForm />
      </Paper>
    </React.Fragment>
  );
};
