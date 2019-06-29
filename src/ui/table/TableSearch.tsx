import React from "react";
import { Input, Theme, CircularProgress } from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import Search from "@material-ui/icons/Search";
import { Row } from "../Flex";

const styles = (theme: Theme) =>
  createStyles({
    search: {
      minWidth: theme.spacing(35)
    }
  });

export interface TableSearchProps extends WithStyles<typeof styles> {
  onSearchChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSearch: (value: string) => void;
  searchPending: boolean;
  placeholder?: string;
}

export const TableSearch = withStyles(styles)(
  class BaseTableSearch extends React.Component<TableSearchProps> {
    state = {
      search: ""
    };
    handleSearchChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { onSearchChange } = this.props;
      this.setState({ search: e.target.value });
      if (onSearchChange) {
        onSearchChange(e);
      }
    };
    handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        this.props.onSearch(this.state.search);
      }
    };
    render() {
      const { searchPending, classes, placeholder } = this.props;
      return (
        <Row valign="center" gutter>
          {searchPending ? <CircularProgress size={24} /> : <Search />}
          <Input
            onKeyDown={this.handleSearch}
            className={classes.search}
            disabled={searchPending}
            onChange={this.handleSearchChange}
            placeholder={placeholder}
          />{" "}
        </Row>
      );
    }
  }
);
