import React, { CSSProperties } from "react";
import clsx from "clsx";
import { Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      boxSizing: "border-box",
      position: "relative",

      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      flexShrink: 0,
      alignContent: "flex-start",

      borderWidth: 0,
      margin: 0,
      padding: 0,
      minWidth: 0
    },

    row: {
      flexDirection: "row"
    },

    rowWithGutter: {
      "& > *:not(:first-child)": {
        marginLeft: theme.spacing(2)
      }
    },

    rowCell: {
      "&:not(:first-child)": {
        marginBottom: theme.spacing(2)
      }
    },

    columnCell: {
      "&:not(:first-child)": {
        marginLeft: theme.spacing(2)
      }
    }
  })
);

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  component: string;
  align?: CSSProperties["justifyContent"];
  valign?: CSSProperties["alignItems"];
  flex?: CSSProperties["flex"];
  wrap?: CSSProperties["flexWrap"];
  gutter?: boolean;
  cell?: boolean;
}

export const Row = (props: RowProps) => {
  const {
    component,
    align,
    valign,
    flex,
    wrap,
    style,
    className,
    children,
    cell,
    gutter,
    ...rest
  } = props;
  const classes = useStyles(props);
  const updatedStyle = {
    flex,
    flexWrap: wrap,
    justifyContent: align,
    alignItems: valign,
    ...style
  };
  const rowProps = {
    className: clsx(classes.flex, classes.row, className, {
      [classes.rowCell]: cell,
      row: true,
      [classes.rowWithGutter]: gutter
    }),
    style: updatedStyle,
    ...rest
  };
  return React.createElement(component, rowProps, children);
};

Row.defaultProps = {
  component: "div"
};

export type ColumnProps = React.HTMLAttributes<HTMLDivElement> & {
  component: string;
  align?: CSSProperties["alignItems"];
  valign?: CSSProperties["justifyContent"];
  flex?: CSSProperties["flex"];
  wrap?: CSSProperties["flexWrap"];
  cell?: boolean;
};

export const Column = (props: ColumnProps) => {
  const {
    component,
    align,
    valign,
    flex,
    style,
    className,
    children,
    cell,
    ...rest
  } = props;
  const classes = useStyles(props);
  const updatedStyle = {
    flex,
    justifyContent: valign,
    alignItems: align,
    ...style
  };
  const columnProps = {
    className: clsx(classes.flex, className, {
      cell,
      [classes.columnCell]: cell,
      column: true
    }),
    style: updatedStyle,
    ...rest
  };
  return React.createElement(component, columnProps, children);
};

Column.defaultProps = {
  component: "div"
};

const positions = {
  topLeft: { top: 0, left: 0 },
  top: { top: 0 },
  topRight: { top: 0, right: 0 },
  bottomRight: { bottom: 0, right: 0 },
  bottom: { bottom: 0 },
  bottomLeft: { bottom: 0, bottomLeft: 0 },
  left: { left: 0 }
};

export type DockPositions = keyof typeof positions;

export type DockProps = ColumnProps & {
  offset: [number, number, number, number] | number; // top, right, bottom, left or all
  position: DockPositions;
  withPadding?: boolean;
};

const getPositionProps = (
  offset: [number, number, number, number] | number,
  position: DockPositions
) => {
  if (position) {
    return positions[position];
  }

  const specificOffset =
    typeof offset === "number" ? [offset, offset, offset, offset] : offset;

  return {
    top: specificOffset[0],
    right: specificOffset[1],
    bottom: specificOffset[2],
    left: specificOffset[3]
  };
};

export const Dock = ({
  children,
  offset,
  style,
  position,
  withPadding,
  ...rest
}: DockProps) => {
  const padding = withPadding ? 16 : style && style.padding;

  const mergedStyle = {
    padding,
    position: "absolute",
    ...getPositionProps(offset, position),
    ...style
  } as CSSProperties;

  return (
    <Column style={mergedStyle} {...rest}>
      {children}
    </Column>
  );
};
Dock.defaultProps = {
  offset: 0
};
