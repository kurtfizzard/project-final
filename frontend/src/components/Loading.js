import React from "react";
import styled from "styled-components";
import { GiMusicalNotes } from "react-icons/gi";

const Loading = () => {
  return (
    <Wrapper>
      <GiMusicalNotes color="FCA311" size="5em" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export default Loading;
