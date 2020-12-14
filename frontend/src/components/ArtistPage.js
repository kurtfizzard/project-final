import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArtistAlbum from "./ArtistAlbum";
import { SpotifyAuthContext } from "./reducers/auth-context";

const ArtistPage = () => {
  const [artist, setArtist] = useState("");
  const [artistAlbums, setArtistAlbums] = useState([]);
  const { id } = useParams();
  const { token } = useContext(SpotifyAuthContext);

  useEffect(() => {
    fetch(`http://localhost:8000/artistbyid/${id}`, {
      method: "POST",
      body: JSON.stringify({ token: token.token }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setArtist(res.albums[0].artists[0].name);
        setArtistAlbums(res.albums);
      });
  }, []);

  return (
    <Wrapper>
      <ArtistName>{artist}</ArtistName>
      {artistAlbums &&
        artistAlbums.map((album) => {
          return <ArtistAlbum album={album} key={Math.random()} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const ArtistName = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

export default ArtistPage;
