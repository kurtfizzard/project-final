import React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const range = (num) => {
  let array = [];
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  return array;
};

const ReviewRating = ({ rating, size }) => {
  return (
    <Wrapper>
      {range(5).map((num) => {
        return num <= rating ? (
          <AiFillStar color="yellow" key={Math.random()} size={size && size} />
        ) : (
          <AiOutlineStar key={Math.random()} size={size && size} />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default ReviewRating;
