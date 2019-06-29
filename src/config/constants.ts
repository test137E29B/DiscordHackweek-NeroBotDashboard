export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "https://nerobot.aquilamc.net"
    : "https://nerobot.aquilamc.net";

export const BASE_WEB_URL =
  process.env.NODE_ENV === "development"
    ? "https://nero.aquilamc.net"
    : "https://nero.aquilamc.net";

export const LOGIN_URL = BASE_WEB_URL + "/login";

export const CLIENT_ID =
  process.env.NODE_ENV === "development"
    ? "592761856075235339"
    : "592761856075235339";
