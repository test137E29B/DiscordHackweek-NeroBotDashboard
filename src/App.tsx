import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import NeroAppBar from "./ui/NeroAppBar";
import { NeroAppDrawer } from "./ui/NeroAppDrawer";
import { Theme } from "@material-ui/core/styles";
import { NeroContent } from "./ui/NeroContent";
import { NeroAppContent } from "./ui/NeroAppContent";
import { routes } from "./config/routes";
import { LoginPage } from "./pages/LoginPage";
// import { RootPage } from "./pages/RootPage";
import { Route, Switch } from "react-router";

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
        <Switch>
          <Route path={routes.ROOT} exact component={LoginPage} />
          <Route path={routes.LOGIN} exact component={LoginPage} />
          <Route
            path="*"
            component={() => (
              <React.Fragment>
                <NeroAppBar />
                <NeroAppContent>
                  <NeroAppDrawer />
                  <NeroContent />
                </NeroAppContent>
              </React.Fragment>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
