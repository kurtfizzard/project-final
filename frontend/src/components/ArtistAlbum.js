import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const ArtistAlbum = ({ album }) => {
  let history = useHistory();

  if (album) {
    const { artists, id, images, name, release_date } = album;
    return (
      <Wrapper
        onClick={() => {
          history.push(`/release/${id}`);
        }}
      >
        {images[1] && <Image src={images[1].url} />}
        <Container>
          <Title>{name}</Title>
          <Info>{release_date.slice(0, 4)}</Info>
        </Container>
      </Wrapper>
    );
  } else {
    <Loading />;
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  padding: 10px;
  width: 90%;
`;

const Image = styled.img`
  height: 100px;
  margin-right: 5%;
  width: 100px;
`;

const Container = styled.div``;

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 2%;
`;

const Info = styled.p`
  font-size: 0.9em;
`;

export default ArtistAlbum;
