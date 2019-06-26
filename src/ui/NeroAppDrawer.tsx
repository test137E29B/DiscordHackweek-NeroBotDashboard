import React from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Drawer, List, Typography } from "@material-ui/core";
import { NeroAppDrawerItem } from "./NeroAppDrawerItem";
import { pages, Page } from "../config/pages";
import { pageToTitle } from "../lib/helpers";
import useReactRouter from "use-react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      width: theme.spacing(28),
      flexShrink: 0
    },
    drawerPaper: {
      width: theme.spacing(28),
      zIndex: 0
    },
    toolbar: {
      minHeight: "64px"
    },
    drawerFooterText: {
      padding: theme.spacing(1, 2),
      color: theme.palette.text.secondary
    }
  })
);

interface RenderNavItemsProps {
  icon?: React.ReactNode;
  pages: Page[];
  depth: number;
  pathname: string;
}

const renderNavItems: React.SFC<RenderNavItemsProps> = ({
  pages,
  ...params
}) => {
  return (
    <List disablePadding>
      {pages.reduce(
        (items, page: Page) => reduceChildRoutes({ items, page, ...params }),
        []
      )}
    </List>
  );
};

const reduceChildRoutes = ({
  items,
  page,
  depth,
  pathname
}: {
  items: any;
  page: Page;
  depth: number;
  pathname: string;
}) => {
  if (page.children && page.children.length) {
    const title = pageToTitle(page);

    items.push(
      <NeroAppDrawerItem
        Icon={page.icon}
        depth={depth}
        key={title}
        title={title}
      >
        {renderNavItems({
          pages: page.children,
          depth: depth + 1,
          icon: page.icon,
          pathname
        })}
      </NeroAppDrawerItem>
    );
  } else {
    const title = pageToTitle(page);
    page =
      page.children && page.children.length === 1 ? page.children[0] : page; // tslint:disable-line:no-parameter-reassignment
    items.push(
      <NeroAppDrawerItem
        Icon={page.icon}
        key={title}
        title={title}
        href={page.pathname}
        isActive={page.pathname === pathname}
      />
    );
  }

  return items;
};

export const NeroAppDrawer: React.FunctionComponent = () => {
  const classes = useStyles();
  const urr = useReactRouter();
  const drawerFooter = (
    <Typography
      variant="caption"
      display="block"
      gutterBottom
      className={classes.drawerFooterText}
    >
      © 2019 NeroBot
    </Typography>
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbar} />
      {renderNavItems({ pages, depth: 0, pathname: urr.location.pathname })}
      {drawerFooter}
    </Drawer>
  );
};
