import { createStyles, makeStyles } from "@material-ui/styles";
import React from "react";
import { Theme } from "@material-ui/core/styles";
import { NeroPageWrapper } from "./NeroPageWrapper";
import useReactRouter from "use-react-router";
import { getActivePage } from "../lib/helpers";
import { pages } from "../config/pages";
import { Route } from "react-router";
import { FeaturesPage } from "../pages/FeaturesPage";
import { routes } from "../config/routes";
import ServerSelectionPage from "../pages/ServerSelectionPage";
import { SettingsPage } from "../pages/SettingsPage";
import { PerspectivePage } from "../pages/PerspectivePage";
import { WordsPage } from "../pages/WordsPage";
import { InvitesPage } from "../pages/InvitesPage";
import { AboutPage } from "../pages/AboutPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      width: "100%",
      maxHeight: "100%",
      overflowY: "auto",
      overflowX: "hidden"
    }
  })
);

export const NeroContent = () => {
  const classes = useStyles();
  const {
    location: { pathname }
  } = useReactRouter();
  const activePage = getActivePage(pages, pathname);
  const { title, description } = activePage
    ? activePage
    : { title: "", description: "" };
  return (
    <div className={classes.root}>
      <NeroPageWrapper title={title} description={description}>
        <Route path={routes.FEATURES} exact component={FeaturesPage} />
        <Route path={routes.DASHBOARD} exact component={ServerSelectionPage} />
        <Route
          path={routes.AUTOMOD_PERSPECTIVE}
          exact
          component={PerspectivePage}
        />
        <Route path={routes.AUTOMOD_WORDS} exact component={WordsPage} />
        <Route path={routes.AUTOMOD_INVITES} exact component={InvitesPage} />
        <Route path={routes.ROLES_SETTINGS} exact component={SettingsPage} />
        <Route path={routes.ABOUT} exact component={AboutPage} />
      </NeroPageWrapper>
    </div>
  );
};
