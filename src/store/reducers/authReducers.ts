import { createReducer } from "redux-create-reducer";
import AuthActionTypes from "../types/authTypes";
import { LogInAction } from "../actions/authActions";
import { DiscordUser } from "../../config/customTypes";

export interface AuthState {
  user?: DiscordUser;
  token?: string;
  error?: string;
}

type AuthHandlers = {
  [key in AuthActionTypes]: (state: AuthState, action: LogInAction) => AuthState
};

const initialState: AuthState = {
  error: undefined,
  user: undefined,
  token: undefined
};

const authHandlers: AuthHandlers = {
  [AuthActionTypes.AUTH_LOGIN_SUCCESS]: (state, { token, user, error }) => ({
    ...state,
    token,
    user,
    error
  }),
  [AuthActionTypes.AUTH_LOGIN_FAILED]: (state, { token, user, error }) => ({
    ...state,
    token,
    user,
    error
  }),
  [AuthActionTypes.AUTH_LOGGED_OUT]: (state, { token, user, error }) => ({
    ...state,
    token,
    user,
    error
  })
};

export default createReducer(initialState, authHandlers);
