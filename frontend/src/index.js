import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SpotifyAuthContext from "./components/reducers/auth-context";
import CurrentUserContext from "./components/reducers/userReducer";

ReactDOM.render(
  <SpotifyAuthContext>
    <CurrentUserContext>
      <App />
    </CurrentUserContext>
  </SpotifyAuthContext>,
  document.getElementById("root")
);
