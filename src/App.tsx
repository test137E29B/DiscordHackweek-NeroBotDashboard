import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { NeroAppBar } from "./ui/NeroAppBar";
import { NeroAppDrawer } from "./ui/NeroAppDrawer";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <NeroAppBar />
        <NeroAppDrawer />
      </div>
    </div>
  );
};

export default App;
