import { GuildSettings, RecursivePartial } from "../../config/customTypes";
import { BASE_API_URL } from "../../config/constants";

// Update a guildId with settings function
export const updateGuildSettings = async (
  token: string,
  guildId: string,
  settings: RecursivePartial<GuildSettings>
) => {
  console.warn(`UPDATING WITH SETTINGS: ${JSON.stringify(settings)}`);
  const response = await fetch(`${BASE_API_URL}/guild/settings/${guildId}`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify(settings)
  }).then(res => res.json());

  return response;
};

export const getGuildSettings = async (token: string, guildId: string) => {
  const response: {
    success: boolean;
    data: GuildSettings | null;
    error: string | null;
  } = await fetch(`${BASE_API_URL}/guild/settings/${guildId}`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      accept: "application/json"
    }
  }).then(res => res.json());

  return response;
};
