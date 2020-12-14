import React from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ isLikedbyCurrentUser, likeCount, likeReview, size }) => {
  return (
    <Wrapper>
      <HeartButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          likeReview();
        }}
      >
        {isLikedbyCurrentUser ? <FaHeart color="red" /> : <FaRegHeart />}
      </HeartButton>
      <LikeNumber>{likeCount}</LikeNumber>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const HeartButton = styled.button`
  border: none;
`;

const LikeNumber = styled.p``;

export default LikeButton;
