import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
  loading: true,
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_UP": {
      return {
        ...state,
        user: action.data.user,
        loading: false,
      };
    }
    case "SIGN_IN": {
      return {
        ...state,
        user: action.data,
        loading: false,
      };
    }
    case "SIGN_OUT": {
      localStorage.clear();
      return {
        ...state,
        user: action.data,
        loading: false,
      };
    }
  }
};

const UserProvider = ({ children }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(
    userReducer,
    initialState
  );

  const signOut = (e) => {
    e.preventDefault();
    dispatchCurrentUser({ type: "SIGN_OUT", data: null });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        dispatchCurrentUser,
        signOut,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default UserProvider;
