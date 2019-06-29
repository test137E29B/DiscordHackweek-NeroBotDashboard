import React from "react";
import {
  Theme,
  Typography,
  IconButton,
  TableCell,
  Checkbox,
  Table,
  TableBody
} from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import NotInterested from "@material-ui/icons/NotInterested";
import getValue from "get-value";
import uuid from "uuidv4";
import { Waypoint } from "react-waypoint";
import { MenuOn, MuiMenuItem } from "../MenuOn";
import { MuiTableToolbar } from "./MuiTableToolbar";
import { MuiTableHead } from "./MuiTableHead";
import { MuiTableRow } from "./MuiTableRow";
import { withStyles, WithStyles, createStyles } from "@material-ui/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    noDataText: {
      textAlign: "center",
      color: theme.palette.text.disabled,
      padding: theme.spacing(3),
      paddingTop: 0
    },
    noDataIcon: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      color: theme.palette.text.disabled,
      padding: theme.spacing(3),
      paddingBottom: 0,
      fontSize: theme.spacing(10)
    },
    tableWrapper: {
      overflowX: "auto"
    }
  });

export interface MuiTableColumnItem {
  id?: string;
  label: string;
  render?: (item: any, key: string) => React.ReactNode;
}

export interface MuiTableMoreItem {
  label: string;
  onClick: (locationIds?: string[]) => void;
}

export interface MuiTableSettingsItem {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

export interface MuiTableToolbarItems {
  more?: {
    items: MuiTableMoreItem[];
    title?: string;
  };
  settings?: {
    items: MuiTableSettingsItem[];
    title?: string;
  };
  search?: {
    onSearchChange?: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onSearch: (value: string) => void;
    searchPending: boolean;
    placeholder?: string;
  };
  renderCustomElement?: () => React.ReactNode;
}

export interface MuiTableScrollItems {
  onScroll: () => void;
  isMoreItems: boolean;
}

interface MuiTableProps<Model> extends WithStyles<typeof styles> {
  data: any;
  columns: MuiTableColumnItem[];
  toolbarItems?: MuiTableToolbarItems;
  scroll?: MuiTableScrollItems;
  selectable?: boolean;
  itemActions?: (item: Model, index: number) => MuiMenuItem[];
  onClick?: (data: Model) => void;
}

export const MuiTable = withStyles(styles)(
  // TODO: Model id
  class BaseTable<
    Model extends { _id?: string; id?: string }
  > extends React.Component<MuiTableProps<Model>> {
    state = {
      selected: [] as string[]
    };

    handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        this.setState({ selected: this.props.data.map((n: Model) => n._id) });
        return;
      }
      this.setState({ selected: [] });
    };

    handleRowClick = (id: string, index: number) => {
      const { selected } = this.state;
      const { data } = this.props;
      const selectedIndex = selected.indexOf(id);
      let newSelected: string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      if (this.props.onClick) {
        this.props.onClick(data[index]);
      }
      this.setState({ selected: newSelected });
    };

    isSelected = (id: string) => this.state.selected.indexOf(id) !== -1;

    renderRows = (n: Model, index: number) => {
      const { data, scroll, selectable, itemActions } = this.props;
      const id = n._id || n.id || "";
      const isSelected = this.isSelected(id);

      return (
        <React.Fragment key={uuid()}>
          {scroll && scroll.isMoreItems && index === data.length - 1 && (
            <Waypoint scrollableAncestor={window} onEnter={scroll.onScroll}>
              <tr />
            </Waypoint>
          )}
          <MuiTableRow
            index={index}
            selectable={selectable || false}
            hover
            id={id}
            onClick={this.handleRowClick}
            selected={isSelected}
          >
            {selectable && (
              <TableCell padding="checkbox">
                <Checkbox color="primary" checked={isSelected} />
              </TableCell>
            )}
            {this.renderItemsCells(n)}
            {itemActions && this.renderItemActionsCell(itemActions(n, index))}
          </MuiTableRow>
        </React.Fragment>
      );
    };

    renderItemActionsCell = (items: MuiMenuItem[]) => (
      <TableCell key={uuid()} align="justify" size="small">
        <MenuOn
          items={items}
          renderOn={toggle => (
            <IconButton disabled={!items.length} onClick={toggle}>
              <MoreVert />
            </IconButton>
          )}
        />
      </TableCell>
    );

    renderItemsCells = (n: Model) =>
      this.props.columns.map((item: MuiTableColumnItem) => {
        if (item.render) {
          return item.render(n, uuid());
        }
        return (
          <TableCell key={uuid()} align="justify" size="small">
            {getValue(n, item.id || "")}
          </TableCell>
        );
      });

    render() {
      const {
        classes,
        columns,
        data,
        itemActions,
        selectable,
        toolbarItems
      } = this.props;
      const { selected } = this.state;
      return (
        <div className={classes.root}>
          <MuiTableToolbar
            selectable={selectable || false}
            selected={selected}
            items={toolbarItems || {}}
            numSelected={selected.length}
          />
          {data && data.length ? (
            <div className={classes.tableWrapper}>
              <Table>
                <MuiTableHead
                  selectable={selectable || false}
                  itemActions={!!itemActions}
                  numSelected={selected.length}
                  onSelectAllClick={this.handleSelectAllClick}
                  rowCount={data.length}
                  columns={columns}
                />
                <TableBody>{data.map(this.renderRows)}</TableBody>
              </Table>
            </div>
          ) : (
            <div>
              <NotInterested className={classes.noDataIcon} strokeWidth="1.5" />
              <Typography
                variant="h6"
                className={classes.noDataText}
                color="inherit"
              >
                No data
              </Typography>
            </div>
          )}
        </div>
      );
    }
  }
);
