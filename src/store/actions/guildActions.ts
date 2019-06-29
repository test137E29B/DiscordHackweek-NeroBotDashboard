import GuildActionTypes from "../types/guildTypes";
import { ActionCreator } from "redux";
import { GuildSettings } from "../../config/customTypes";

export interface GuildAction {
  type: string;
  guild?: GuildSettings;
  guildId?: string;
}

const guildSet: ActionCreator<GuildAction> = (
  guild: GuildSettings,
  guildId: string
) => {
  return {
    type: GuildActionTypes.GUILD_SET,
    guild,
    guildId
  };
};

const guildUnset: ActionCreator<GuildAction> = () => {
  return {
    type: GuildActionTypes.GUILD_UNSET,
    guild: undefined,
    guildId: undefined
  };
};

export const setGuild = (guild?: GuildSettings, guildId?: string) => {
  return async (dispatch: ActionCreator<GuildAction>) => {
    try {
      if (!!guild && !!guildId) {
        dispatch(guildSet(guild, guildId));
      } else throw new Error("No Guild Settings, or Id, were provided.");
    } catch (err) {
      dispatch(guildUnset(guild, guildId));
    }
  };
};
