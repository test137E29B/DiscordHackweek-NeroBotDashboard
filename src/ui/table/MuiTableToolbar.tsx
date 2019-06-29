import React from "react";
import { Toolbar, Typography, IconButton, Theme } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import FilterList from "@material-ui/icons/FilterList";
import clsx from "clsx";
import { Row } from "../Flex";
import { MenuOn } from "../MenuOn";
import { MuiTableToolbarItems, MuiTableMoreItem } from "./MuiTable";
import { TableSearch } from "./TableSearch";
import { WithStyles, createStyles, withStyles } from "@material-ui/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingRight: theme.spacing(1)
    },
    highlight: {
      color: theme.palette.secondary.main
    },
    spacer: {
      flex: "1 1 100%"
    },
    title: {
      flex: "0 0 auto"
    }
  });

interface MuiTableToolbarProps extends WithStyles<typeof styles> {
  numSelected: number;
  items: MuiTableToolbarItems;
  selected: string[];
  selectable: boolean;
}

export const MuiTableToolbar = withStyles(styles)(
  class extends React.Component<MuiTableToolbarProps> {
    renderSettingsButton = (): React.ReactNode => (
      <MenuOn
        variant="withCheckbox"
        items={this.props.items.settings ? this.props.items.settings.items : []}
        renderOn={toggle => (
          <IconButton onClick={toggle}>
            <FilterList />
          </IconButton>
        )}
      />
    );

    renderMoreButton = (): React.ReactNode => (
      <MenuOn
        items={this.getMoreButtonItems()}
        renderOn={toggle => (
          <IconButton disabled={this.props.numSelected < 1} onClick={toggle}>
            <MoreVert />
          </IconButton>
        )}
      />
    );

    getMoreButtonItems = (): MuiTableMoreItem[] => {
      // Items differ for single and multi table selection
      const { items } = this.props.items.more || { items: [] };
      // Allows provided onClick method be called with state selection parameter
      const enrichedItems = items.map((item: MuiTableMoreItem) => ({
        ...item,
        onClick: () => item.onClick(this.props.selected)
      }));
      return enrichedItems;
    };

    render() {
      const { numSelected, selectable, items, classes } = this.props;
      if (!selectable && !items) {
        return null;
      }
      return (
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: selectable && numSelected > 0
          })}
        >
          {selectable && (
            <div className={classes.title}>
              {numSelected > 0 && (
                <Typography color="inherit" variant="subtitle1">
                  {numSelected} selected
                </Typography>
              )}
            </div>
          )}
          {items && (
            <React.Fragment>
              {items.search && (
                <TableSearch
                  placeholder={items.search.placeholder}
                  searchPending={items.search.searchPending}
                  onSearch={items.search.onSearch}
                />
              )}
              <div className={classes.spacer} />
              <Row>
                {items.renderCustomElement && items.renderCustomElement()}
                <Row valign="center">
                  {items.settings && this.renderSettingsButton()}
                  {selectable && items.more && this.renderMoreButton()}
                </Row>
              </Row>
            </React.Fragment>
          )}
        </Toolbar>
      );
    }
  }
);
