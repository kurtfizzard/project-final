import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import ReleasePage from "./components/ReleasePage";
import CreateReview from "./components/CreateReview";
import Search from "./components/Search";
import ArtistPage from "./components/ArtistPage";
import SignIn from "./components/SignIn";
import GlobalStyle from "./GlobalStyles";
import ScrollToTop from "./components/ScrollToTop";
import SignUpPage from "./components/SignUpPage";
import Profile from "./components/Profile";
import { SpotifyAuthContext } from "./components/reducers/auth-context";
import LargeReview from "./components/LargeReview";
import { CurrentUserContext } from "./components/reducers/userReducer";
import Feed from "./components/Feed";

const App = () => {
  const { token, dispatchToken } = useContext(SpotifyAuthContext);
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatchToken({
          type: "RECEIVE_ACCESS_TOKEN",
          token: json.access_token,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    if (accessToken) {
      fetch("/me", {
        headers: {
          "Content-Type": "application/json",
          token: accessToken,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatchCurrentUser({ type: "SIGN_IN", data: res.user });
        });
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <ScrollToTop />
        <Header />
        {!currentUser.user ? (
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Redirect to="/signup" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <Feed />
            </Route>
            <Route path="/artist/:id">
              <ArtistPage />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUpPage />
            </Route>
            <Route path="/welcome">
              <Home />
            </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>
            <Route path="/release/:id">
              <ReleasePage />
            </Route>
            <Route exact path="/review">
              <CreateReview />
            </Route>
            <Route path="/review/:id">
              <LargeReview />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
};

export default App;
