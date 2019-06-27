import React from "react";
import {
  ListItem,
  Divider,
  makeStyles,
  Theme,
  createStyles,
  Button
} from "@material-ui/core";
import clsx from "clsx";
import useReactRouter from "use-react-router";

const MuiButton = (props: any) => <Button {...props} />;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      width: "100%"
    },
    item: {
      display: "block",
      width: "100%",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    itemLeaf: (props: NeroAppDrawerItemProps) => ({
      width: "100%",
      display: "flex",
      paddingTop: props.href && props.depth === 0 ? theme.spacing(1) : 0,
      paddingBottom: props.href && props.depth === 0 ? theme.spacing(1) : 0
    }),
    typography: {
      marginLeft: theme.spacing(2),
      fontWeight: "normal",
      fontSize: "14px"
    },
    typographyRoot: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1, 2),
      fontSize: "14px"
    },
    button: {
      letterSpacing: 0,
      justifyContent: "flex-start",
      textTransform: "none",
      width: "100%",
      fontSize: "1.125rem"
    },
    buttonLeaf: (props: NeroAppDrawerItemProps) => ({
      letterSpacing: 0,
      justifyContent: "flex-start",
      textTransform: "none",
      width: "100%",
      fontSize: "1.125rem",
      padding: "0",
      height: theme.spacing(5),
      borderRadius: "0",
      backgroundColor: props.isactive ? "rgba(92,92,92,0.16)" : "inherit",
      color: props.isactive
        ? theme.palette.primary.main
        : theme.palette.text.secondary
    }),
    buttonLeafIcon: (props: NeroAppDrawerItemProps) => ({
      color: props.isactive
        ? theme.palette.primary.main
        : theme.palette.text.secondary
    }),
    active: {
      color: theme.palette.primary.main,
      fontWeight: 500
    }
  })
);

interface NeroAppDrawerItemProps {
  href?: string;
  title?: string;
  Icon?: React.ComponentClass<{ className: string }>;
  children?: React.ReactElement | null;
  naked?: boolean;
  depth?: number;
  isactive?: boolean;
}

export const NeroAppDrawerItem: React.FunctionComponent<
  NeroAppDrawerItemProps
> = props => {
  const classes = useStyles(props);
  const { history } = useReactRouter();
  const { children, naked, href, Icon, title, depth, ...other } = props;

  const style: React.CSSProperties = {
    paddingLeft: 16
  };

  if (href) {
    return (
      <React.Fragment>
        <ListItem className={classes.itemLeaf} disableGutters {...other}>
          <MuiButton
            href={href}
            className={clsx(classes.buttonLeaf, `depth-${depth}`)}
            classes={{ label: classes.label }}
            disableTouchRipple
            fullWidth
            style={style}
            onClick={() => history.push(href)}
          >
            {Icon !== undefined && <Icon className={classes.buttonLeafIcon} />}
            <div className={classes.typography}>{title}</div>
          </MuiButton>
        </ListItem>
        {depth === 0 && <Divider />}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ListItem className={classes.item} disableGutters {...other}>
        {title && <div className={classes.typographyRoot}>{title}</div>}
        {children}
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};
