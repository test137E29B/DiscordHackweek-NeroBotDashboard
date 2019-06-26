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
  const urr = useReactRouter();
  const activePage = getActivePage(pages, urr.location.pathname);
  const { title, description } = activePage
    ? activePage
    : { title: "", description: "" };
  return (
    <div className={classes.root}>
      <NeroPageWrapper title={title} description={description}>
        <Route path={routes.FEATURES} exact component={FeaturesPage} />
      </NeroPageWrapper>
    </div>
  );
};
