import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

const SearchResult = ({ result }) => {
  let history = useHistory();

  if (result) {
    const { id, images, name, type } = result;
    return (
      <Wrapper
        onClick={() => {
          history.push(`/artist/${id}`);
        }}
      >
        {images[1] && <Image src={images[1].url} />}
        <Container>
          <Title>{name}</Title>
          <Info>{type}</Info>
        </Container>
      </Wrapper>
    );
  } else {
    <>
      <Loading />
    </>;
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  margin-bottom: 2%;
`;

const Image = styled.img`
  height: 100%;
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

export default SearchResult;
