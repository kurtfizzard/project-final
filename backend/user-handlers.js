const assert = require("assert");
const { MongoClient, ObjectID, ObjectId } = require("mongodb");
require("dotenv").config({ path: `${__dirname}/.env` });
const { MONGO_URI } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const secret = "uwyM3UnU";

const signUp = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (user) {
      res.status(200).json({
        status: 200,
        message: "That username is already in use. Please try again.",
      });
    } else {
      const hash = bcrypt.hashSync(req.body.password, 8);

      const result = await db.collection("users").insertOne({
        username: req.body.username,
        password: hash,
        followers: [],
        followerCount: 0,
        following: [],
        followingCount: 0,
      });
      res.status(201).json({
        status: 201,
        message: "Your account has been successfully created. Please sign in.",
      });
    }
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

const signIn = async (req, res) => {
  console.log(req.body);

  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();
    // We are using the 'exercises' database
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db
      .collection("users")
      .findOne({ username: req.body.username });

    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign({ _id: user._id }, secret);
        res.status(200).json({
          status: 200,
          user: {
            _id: user._id,
            username: user.username,
            followers: user.followers,
            followerCount: user.followerCount,
            following: user.following,
            followingCount: user.followingCount,
            token: token,
          },
        });
      } else {
        res.status(200).json({
          status: 400,
          message:
            "The password that you entered is invalid, please re-enter your password or confirm that the username provided is correct.",
        });
      }
    } else {
      res.status(200).json({
        status: 400,
        message:
          "This is not a valid username. Please use a different username or sign up.",
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const users = await db.collection("users").findOne().toArray();
    console.log(users);
    res.status(200).json({ status: 200, data: users });
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

const getCurrentUser = async (req, res) => {
  console.log(req.headers);
  if (!req.headers.token) {
    return res.status(400).json({ message: "Unauthorized." });
  }
  const token = req.headers.token;
  const decoded = jwt.verify(token, secret);
  console.log(decoded);

  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db
      .collection("users")
      .findOne({ _id: ObjectID(decoded._id) });
    console.log(user);
    res.status(200).json({ status: 200, user: user });
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

const followUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const currentUserQuery = { _id: ObjectID(req.body.currentUserUID) };
    const targetUserQuery = { _id: ObjectID(req.params.id) };

    const currentUserId = req.body.currentUserUID;
    const targetUserId = req.params.id;

    const currentUser = await db.collection("users").findOne(currentUserQuery);

    if (currentUser.following.includes(targetUserId)) {
      const resultOne = await db
        .collection("users")
        .findOneAndUpdate(targetUserQuery, {
          $inc: { followerCount: -1 },
          $pull: { followers: currentUserId },
        });
      const resultTwo = await db
        .collection("users")
        .findOneAndUpdate(currentUserQuery, {
          $inc: { followingCount: -1 },
          $pull: { following: targetUserId },
        });
      res.status(200).json({ status: 200, data: { resultOne, resultTwo } });
    } else {
      const resultOne = await db
        .collection("users")
        .findOneAndUpdate(targetUserQuery, {
          $inc: { followerCount: 1 },
          $push: { followers: currentUserId },
        });
      const resultTwo = await db
        .collection("users")
        .findOneAndUpdate(currentUserQuery, {
          $inc: { followingCount: 1 },
          $push: { following: targetUserId },
        });
      res.status(200).json({ status: 200, data: { resultOne, resultTwo } });
    }
  } catch (err) {
    console.log(err.message);
  }
  client.close();
  console.log("disconnected!");
};

const getUserById = async (req, res) => {
  console.log("GET USER BY ID", req.params);

  const client = await MongoClient(MONGO_URI, options);

  const query = { _id: ObjectID(req.params.id) };

  try {
    await client.connect();
    const db = client.db("project-database");
    console.log("connected!");

    const user = await db.collection("users").findOne(query);
    res.status(200).json({
      status: 200,
      data: {
        _id: user._id,
        username: user.username,
        followers: user.followers,
        followerCount: user.followerCount,
        following: user.following,
        followingCount: user.followingCount,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
  console.log("disconnected!");
};

module.exports = {
  signIn,
  signUp,
  getCurrentUser,
  getUserById,
  getUsers,
  followUser,
};
