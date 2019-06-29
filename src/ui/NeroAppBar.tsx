import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  createStyles
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useReactRouter from "use-react-router";
import { connect } from "react-redux";
import { logOut } from "../store/actions/authActions";
import { Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

interface NeroAppBarProps {
  logout: () => void;
}

const NeroAppBar: React.FunctionComponent<NeroAppBarProps> = (
  props: NeroAppBarProps
) => {
  const classes = useStyles();
  const { history } = useReactRouter();
  const { logout } = props;

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">NeroBot</Typography>
          <div className={classes.root} />
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => logOut()(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(NeroAppBar);
