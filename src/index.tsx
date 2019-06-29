import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/styles";
import { MuiTheme } from "./config/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { initStore } from "./store/store";
import { Provider } from "react-redux";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={MuiTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
