import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import ReviewRating from "./ReviewRating";
import LikeButton from "./LikeButton";

const ReleasePageReview = ({ props, render, setRender }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { _id, date, likeCount, likes, rating, review, uid, username } = props;
  let history = useHistory();
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    likes.includes(currentUser.user._id)
  );

  const likeReview = () => {
    fetch(`http://localhost:8000/reviews/${_id}/like`, {
      method: "PUT",
      body: JSON.stringify({
        currentUserUID: currentUser.user._id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLikedbyCurrentUser(!isLikedbyCurrentUser);
        setRender(!render);
      });
  };

  return (
    <Wrapper onClick={() => history.push(`/review/${_id}`)}>
      <TopContainer>
        <Username
          onClick={(e) => {
            e.stopPropagation();
            history.push(`/profile/${uid}`);
          }}
        >
          {username}
        </Username>
        <Date>{date}</Date>
      </TopContainer>
      <p>{review}</p>
      <BottomContainer>
        <ReviewRating rating={rating} />
        <LikeButton
          likeReview={likeReview}
          isLikedbyCurrentUser={likes.includes(currentUser.user._id)}
          likeCount={likeCount}
        />
      </BottomContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* border-bottom: 1px solid black; */
  border-radius: 5px;
  /* box-shadow: 5px 10px 10px #888888; */
  margin-bottom: 2%;
  padding: 2%;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`;

const Username = styled.p`
  font-weight: bold;
`;

const Date = styled.p`
  font-size: 0.75em;
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
`;

export default ReleasePageReview;
