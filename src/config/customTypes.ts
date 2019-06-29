import { TextChannel, Role } from "discord.js";

export interface DiscordGuild {
  id: string;
  name: string;
  iconURL: string;
  userCanManage: boolean;
  userGuildPermissions: number;
  userIsOwner: boolean;
}

export interface DiscordUser {
  avatar: string;
  avatarURL: string;
  bot: boolean;
  createdTimestamp: number;
  defaultAvatarURL: string;
  guilds: DiscordGuild[];
  id: string;
  lastMessageChannelID: string | null;
  locale: string;
  mfaEnabled: boolean;
  settings: Object;
  tag: string;
  username: string;
}

enum NeroModDashboardActionType {
  BAN,
  SOFTBAN,
  TEMPBAN,
  KICK,
  DELETE,
  WARN,
  MUTE
}

export enum NeroModActionType {
  BAN,
  SOFTBAN,
  TEMPBAN,
  KICK,
  DELETE,
  WARN,
  MUTE,
  PRUNE,
  PRUNECHANNEL
}

export type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

export interface NeroModAction {
  action: NeroModDashboardActionType;
  duration?: Date;
  ignoreStaff: boolean;
  reason?: string;
  feedback?: {
    enabled: boolean;
    text: string;
  };
  delMsgs?: 7 | 1 | 0;
  silent: boolean;
}

interface PerspectiveToxicity extends NeroModAction {
  threshold: number;
}

export interface GuildSettings {
  automod: {
    enabled: boolean;
    perspective: {
      enabled: boolean;
      channels: TextChannel[];
      toxicity: PerspectiveToxicity[];
    };
    words: {
      enabled: boolean;
      channels: TextChannel[];
      list: string[];
      action: NeroModAction;
    };
    invite: {
      enabled: boolean;
      channels: TextChannel[];
      action: NeroModAction;
    };
    repetition: {
      enabled: boolean;
      channels: TextChannel[];
      action: NeroModAction;
    };
  };
  warns: {
    enabled: boolean;
    actions: NeroModAction[];
  };
  toUnmute: string[];
  roles: {
    staff: {
      mute: Role;
      warn: Role;
      kick: Role;
      ban: Role;
      manager: Role;
      admin: Role;
    };
    punishments: {
      muted: Role;
    };
  };
  prefix: string;
  language: string;
}
