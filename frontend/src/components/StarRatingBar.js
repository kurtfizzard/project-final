import React from "react";
import styled from "styled-components";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRatingBar = ({ rating, setRating }) => {
  return (
    <Wrapper>
      {rating >= "1" ? (
        <AiFillStar
          color="yellow"
          onClick={() => {
            setRating(1);
          }}
        />
      ) : (
        <AiOutlineStar
          onClick={() => {
            setRating(1);
          }}
        />
      )}
      {rating >= "2" ? (
        <AiFillStar
          color="yellow"
          onClick={() => {
            setRating(2);
          }}
        />
      ) : (
        <AiOutlineStar
          onClick={() => {
            setRating(2);
          }}
        />
      )}
      {rating >= "3" ? (
        <AiFillStar
          color="yellow"
          onClick={() => {
            setRating(3);
          }}
        />
      ) : (
        <AiOutlineStar
          onClick={() => {
            setRating(3);
          }}
        />
      )}
      {rating >= "4" ? (
        <AiFillStar
          color="yellow"
          onClick={() => {
            setRating(4);
          }}
        />
      ) : (
        <AiOutlineStar
          onClick={() => {
            setRating(4);
          }}
        />
      )}
      {rating > "4" ? (
        <AiFillStar
          color="yellow"
          onClick={() => {
            setRating(5);
          }}
        />
      ) : (
        <AiOutlineStar
          onClick={() => {
            setRating(5);
          }}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default StarRatingBar;
