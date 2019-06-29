import React, { useEffect } from "react";
import { DiscordUser } from "../config/customTypes";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { logIn } from "../store/actions/authActions";
import { ApplicationState } from "../store/store";
import { AuthState } from "../store/reducers/authReducers";
import useReactRouter from "use-react-router";
import { LOGIN_URL, CLIENT_ID, BASE_API_URL } from "../config/constants";

const oauthURL = new URL("https://discordapp.com/oauth2/authorize");
// @ts-ignore
oauthURL.search = new URLSearchParams([
  ["redirect_uri", LOGIN_URL],
  ["response_type", "code"],
  ["scope", ["identify", "guilds"].join(" ")],
  ["client_id", CLIENT_ID]
]);

interface LoginPageProps {
  auth: AuthState;
  logIn: (token?: string, user?: DiscordUser) => void;
}

const LoginPageComponent = (props: LoginPageProps) => {
  const { auth, logIn } = props;
  const { history } = useReactRouter();

  const attemptLogin = async () => {
    // Enable if wanting to get Application Data, like amount of guilds etc.
    // await fetchApplication();
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    if (code) {
      await fetchToken(code);
    } else {
      window.location.replace(oauthURL.href);
    }
  };

  // const fetchApplication = async () => {
  //   const application = await fetch(`${BASE_API_URL}/application`).then(res =>
  //     res.json()
  //   );
  // };

  const fetchToken = async (code: string) => {
    try {
      const {
        access_token,
        user
      }: { access_token?: string; user?: DiscordUser } = await fetch(
        `${BASE_API_URL}/oauth/callback`,
        {
          method: "post",
          body: JSON.stringify({ code, redirectUri: LOGIN_URL })
        }
      ).then(res => res.json());
      logIn(access_token, user);
    } catch (err) {
      logIn();
    }
  };

  // On Mount
  useEffect(() => {
    attemptLogin();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!auth.token) {
      // Redirect to Dashboard
      history.push("/dashboard");
    }
    // eslint-disable-next-line
  }, [auth.token]);

  return (
    <React.Fragment>
      {!!auth.error && <p>{auth.error}</p>}
      {!auth.error && !auth.token && <p>Logging in, please wait...</p>}
      {!!auth.token && <p>Redirecting...</p>}
    </React.Fragment>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logIn: (token?: string, user?: DiscordUser) => logIn(token, user)(dispatch)
});

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageComponent);
