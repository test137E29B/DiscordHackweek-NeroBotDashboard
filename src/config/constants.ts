export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:80"
    : "http://localhost:80";

export const BASE_WEB_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export const LOGIN_URL = BASE_WEB_URL + "/login";

export const CLIENT_ID =
  process.env.NODE_ENV === "development"
    ? "592761728991887367"
    : "592761728991887367";
