import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer, { AuthState } from "./reducers/authReducers";
import guildReducer, { GuildState } from "./reducers/guildReducers";

export interface ApplicationState {
  auth: AuthState;
  guild: GuildState;
}

const rootReducer: Reducer<ApplicationState> = combineReducers<
  ApplicationState
>({
  auth: authReducer,
  guild: guildReducer
});

// Init store
export const initStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
};
