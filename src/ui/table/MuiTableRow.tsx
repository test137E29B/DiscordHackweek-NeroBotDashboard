import React from "react";

import TableRow, { TableRowProps } from "@material-ui/core/TableRow";

interface MuiTableRowProps {
  onClick?: (id: string, index: number) => void;
  id?: string;
  hover: boolean;
  selected: boolean;
  selectable: boolean;
  index: number;
}

export class MuiTableRow extends React.Component<MuiTableRowProps> {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id || "", this.props.index);
    }
  };

  render() {
    const { children, hover, selectable, selected, onClick } = this.props;
    let rowProps: TableRowProps = {
      hover
    };
    if (onClick) {
      rowProps = {
        ...rowProps,
        onClick: this.handleClick
      };
    }
    if (selectable) {
      rowProps = {
        ...rowProps,
        selected,
        onClick: this.handleClick
      };
    }
    return <TableRow {...rowProps}>{children}</TableRow>;
  }
}
