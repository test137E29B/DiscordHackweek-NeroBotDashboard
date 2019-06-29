import AuthActionTypes from "../types/authTypes";
import { ActionCreator } from "redux";
import { DiscordUser } from "../../config/customTypes";

export interface LogInAction {
  type: string;
  error?: string;
  user?: DiscordUser;
  token?: string;
}

const logInSuccess: ActionCreator<LogInAction> = (
  token: string,
  user: DiscordUser
) => {
  return {
    type: AuthActionTypes.AUTH_LOGIN_SUCCESS,
    user,
    token,
    error: undefined
  };
};

const logInFailed: ActionCreator<LogInAction> = (error: string) => {
  return {
    type: AuthActionTypes.AUTH_LOGIN_FAILED,
    user: undefined,
    token: undefined,
    error
  };
};

const logOutUser: ActionCreator<LogInAction> = () => {
  return {
    type: AuthActionTypes.AUTH_LOGGED_OUT,
    user: undefined,
    token: undefined,
    error: undefined
  };
};

export const logIn = (token?: string, user?: DiscordUser) => {
  return async (dispatch: ActionCreator<LogInAction>) => {
    try {
      if (!!token && !!user) {
        // Filter Guilds
        user.guilds = user.guilds.filter((g: any) => g.userCanManage);
        dispatch(logInSuccess(token, user));
      } else
        throw new Error(
          "Could not log you in, please try refreshing the page, or try again later."
        );
    } catch (err) {
      dispatch(logInFailed(err.message));
    }
  };
};

export const logOut = () => {
  return async (dispatch: ActionCreator<LogInAction>) => {
    dispatch(logOutUser());
  };
};
