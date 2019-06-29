import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      width: "70%",
      marginLeft: "15%"
    },
    heading: {
      marginBottom: theme.spacing(2)
    },
    headingMiddle: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(6)
    }
  })
);

export const AboutPage = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.heading}>
          Who is Nero?
        </Typography>
        <Typography variant="body2">
          Nero is the cat of @jpsl00#0001 - one of the developers of NeroBot.
          Nero can normally be found lazing around in the sun, or under
          blankets. Nero, as the name suggests, is almost entirely black. This
          causes some issues in his home country of Brazil where Black Cats have
          a large amount of superstition around them and are therefore seen as
          undesirable. Nero is cute though.
        </Typography>
        <Typography variant="h5" className={classes.headingMiddle}>
          What is this Bot?
        </Typography>
        <Typography variant="body2">
          NeroBot was a project created for Discord's 2019 Hack Week. NeroBot,
          and this dashboard, were entirely created in under 5 days (while still
          committing to full time jobs and university). There may be some
          unfinished or buggy features, but these will be ironed out after the
          judging of the Competition.
        </Typography>
      </Paper>
    </React.Fragment>
  );
};
