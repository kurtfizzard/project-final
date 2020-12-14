import React, { createContext, useReducer } from "react";

export const SpotifyAuthContext = createContext(null);

const initialState = {
  token: null,
  status: "idle",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_ACCESS_TOKEN": {
      return {
        ...state,
        token: action.token,
        status: "idle",
      };
    }

    case "RECEIVE_ACCESS_TOKEN_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
};

const AuthProvider = ({ children }) => {
  const [token, dispatchToken] = useReducer(authReducer, initialState);

  return (
    <SpotifyAuthContext.Provider value={{ token, dispatchToken }}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default AuthProvider;
