import { createStyles, makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { NeroAppBar } from "./ui/NeroAppBar";
import { NeroAppDrawer } from "./ui/NeroAppDrawer";
import { Theme } from "@material-ui/core/styles";
import { NeroContent } from "./ui/NeroContent";
import { NeroAppContent } from "./ui/NeroAppContent";
import useReactRouter from "use-react-router";
import { routes } from "./config/routes";
import { RootPage } from "./pages/RootPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  const [loggedIn] = useState(true);
  const {
    location: { pathname }
  } = useReactRouter();
  const isRoot = pathname === routes.ROOT;

  const displayRoot: boolean = !!isRoot || !loggedIn;
  const displayDashboard: boolean = !displayRoot;

  return (
    <div className="App">
      <div className={classes.root}>
        {displayRoot && <RootPage />}
        {displayDashboard && (
          <React.Fragment>
            <NeroAppBar />
            <NeroAppContent>
              <NeroAppDrawer />
              <NeroContent />
            </NeroAppContent>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;
