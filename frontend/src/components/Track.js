import React from "react";
import styled from "styled-components";

const Track = ({ track }) => {
  const { duration_ms, name, track_number } = track;

  const msConvert = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <Wrapper>
      <Position>
        {track_number}. {name}
      </Position>
      <Duration>{msConvert(duration_ms)}</Duration>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  font-size: 0.8em;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const Position = styled.div``;

const Duration = styled.div``;

export default Track;
