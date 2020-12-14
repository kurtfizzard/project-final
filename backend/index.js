"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const {
  addReview,
  getReviews,
  getUserReviews,
  likeReview,
  getReviewbyReviewId,
  getReviewsByUserId,
  getFeedById,
} = require("./review-handlers");

const {
  getAccessToken,
  getAlbumsByArtist,
  getReleaseById,
  getSpotifySearchResults,
} = require("./spotify-handlers");

const {
  signIn,
  signUp,
  followUser,
  getUserById,
  getUsers,
  getCurrentUser,
} = require("./user-handlers");

const PORT = process.env.PORT || 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))
  .use(cors())

  .post("/auth/signin", signIn)

  .post("/auth/signup", signUp)

  .get("/users", getUsers)

  .post("/reviews/add", addReview)

  .get("/reviews", getReviews)

  // .post("/reviews/feed/:id", getUserFeedReviews)

  .get("/users/:id", getUserById)

  .post("/user/follow/:id", followUser)

  .get("/reviews/user/:id", getUserReviews)

  .post("/artistbyid/:id", getAlbumsByArtist)

  .post("/releasebyid/:id", getReleaseById)

  .get("/reviews/release/:id", getReviewsByUserId)

  .post("/reviews/feed/:id", getFeedById)

  .put("/reviews/:id/like", likeReview)

  .get("/spotify_access_token", getAccessToken)

  .post("/spotify/search", getSpotifySearchResults)

  .get("/reviews/:id", getReviewbyReviewId)

  .get("/me", getCurrentUser)

  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
