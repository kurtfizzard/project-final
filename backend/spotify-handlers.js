require("dotenv").config({ path: `${__dirname}/.env` });
require("isomorphic-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_SECRET;

const getAccessToken = async (req, res) => {
  // We need, annoyingly, a base64-encoded string of our id:secret, for spotify.
  // We can use Buffers to do this for us.
  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  // TODO: use authString in a request to Spotify!
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const json = await response.json();

  return res.send(json);
};

const getSpotifySearchResults = async (req, res) => {
  const { token, value } = req.body;
  const replaced = value.split(" ").join("%20");

  fetch(
    `https://api.spotify.com/v1/search?q=${replaced}&type=artist&market=CA`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json({
        status: 200,
        results: {
          artists: data.artists.items,
        },
      });
    });
};

const getAlbumsByArtist = async (req, res) => {
  const { token } = req.body;
  const { id } = req.params;

  fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json({
        status: 200,
        albums: data.items,
      });
    });
};

const getReleaseById = async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;

  fetch(`https://api.spotify.com/v1/albums/${id}	`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json({
        status: 200,
        data: data,
      });
    });
};

module.exports = {
  getAccessToken,
  getAlbumsByArtist,
  getReleaseById,
  getSpotifySearchResults,
};
