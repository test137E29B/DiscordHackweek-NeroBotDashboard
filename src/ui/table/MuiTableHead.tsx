import React from "react";
import { TableCell, TableHead, TableRow, Checkbox } from "@material-ui/core";
import uuid from "uuidv4";

import { MuiTableColumnItem } from "./MuiTable";

interface MuiTableHeadProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  columns: MuiTableColumnItem[];
  selectable: boolean;
  itemActions?: boolean;
}

const renderItemColumn = (row: MuiTableColumnItem): React.ReactNode => (
  <TableCell key={uuid()} align="justify" size="small">
    {row.label}
  </TableCell>
);
const renderItemActionsColumn = (): React.ReactNode => (
  <TableCell key={uuid()} align="justify" size="small">
    Actions
  </TableCell>
);

export const MuiTableHead: React.SFC<MuiTableHeadProps> = ({
  onSelectAllClick,
  selectable,
  itemActions,
  columns,
  numSelected,
  rowCount
}) => (
  <TableHead>
    <TableRow>
      {selectable && (
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
      )}
      {columns.map(renderItemColumn)}
      {itemActions && renderItemActionsColumn()}
    </TableRow>
  </TableHead>
);
