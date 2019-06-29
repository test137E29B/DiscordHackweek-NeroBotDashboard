import { createReducer } from "redux-create-reducer";
import { GuildSettings } from "../../config/customTypes";
import GuildActionTypes from "../types/guildTypes";
import { GuildAction } from "../actions/guildActions";

export interface GuildState {
  guild?: GuildSettings;
  guildId?: string;
}

type GuildHandlers = {
  [key in GuildActionTypes]: (
    state: GuildState,
    action: GuildAction
  ) => GuildState
};

const initialState: GuildState = {
  guild: undefined,
  guildId: undefined
};

const guildHandlers: GuildHandlers = {
  [GuildActionTypes.GUILD_SET]: (state, { guild, guildId }) => ({
    ...state,
    guild,
    guildId
  }),
  [GuildActionTypes.GUILD_UNSET]: (state, { guild, guildId }) => ({
    ...state,
    guild,
    guildId
  })
};

export default createReducer(initialState, guildHandlers);
