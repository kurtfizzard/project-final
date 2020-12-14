import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import LikeButton from "./LikeButton";
import ReviewRating from "./ReviewRating";
import Loading from "./Loading";

const LargeReview = () => {
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  const [currentReview, setCurrentReview] = useState(null);
  const [isLikedbyCurrentUser, setIsLikedbyCurrentUser] = useState(
    currentReview?.likes
      ? currentReview.likes.includes(currentUser.user._id)
      : false
  );
  const [isFollowedByCurrentUser, setIsFollowedByCurrentUser] = useState(
    currentReview && currentUser?.following
      ? currentUser.following.includes(currentReview.uid)
      : false
  );
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setCurrentReview(res.data);
      });
  }, [isLikedbyCurrentUser]);

  const likeReview = () => {
    fetch(`http://localhost:8000/reviews/${id}/like`, {
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
      });
  };

  const handleFollow = () => {
    fetch(`http://localhost:8000/user/follow/${currentReview.uid}`, {
      method: "POST",
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
        setIsFollowedByCurrentUser(!isFollowedByCurrentUser);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:8000/users/${currentUser.user._id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatchCurrentUser({ type: "SIGN_IN", data: res.data });
      });
  }, [isFollowedByCurrentUser]);

  if (!currentUser || !currentReview) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const {
    artists,
    date,
    images,
    likeCount,
    likes,
    name,
    rating,
    releaseId,
    release_date,
    review,
    uid,
    username,
  } = currentReview;

  const { following } = currentUser.user;

  const size = "2em";
  return (
    <Wrapper>
      <Header
        onClick={() => {
          history.push(`/profile/${uid}`);
        }}
      >
        <Author>{username}</Author> <span>{date}</span>
      </Header>
      <ReleaseInfo>
        {artists[0].name} - {name} ({release_date.slice(0, 4)})
      </ReleaseInfo>
      <CoverPhoto
        src={images[1].url}
        onClick={() => history.push(`/release/${releaseId}`)}
      />
      <ReviewRating rating={rating} size={size} />
      <Review>{review}</Review>
      <ActionDiv>
        <LikeButton
          isLikedbyCurrentUser={currentReview.likes.includes(
            currentUser.user._id
          )}
          likeCount={likeCount}
          likeReview={likeReview}
        />
        {!(currentUser.user._id === uid) && (
          <FollowButton onClick={handleFollow}>
            {following?.includes(currentReview.uid) ? "UNFOLLOW" : "FOLLOW"}
          </FollowButton>
        )}
      </ActionDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
  width: 90%;
`;

const Author = styled.span`
  font-weight: bold;
`;

const ReleaseInfo = styled.p`
  margin-bottom: 2%;
  text-align: center;
  width: 90%;
`;

const CoverPhoto = styled.img`
  margin-bottom: 2%;
`;

const Review = styled.p`
  margin-bottom: 2%;
  margin-top: 2%;
  text-align: center;
  width: 90%;
`;

const ActionDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const FollowButton = styled.button`
  background: #fca311;
  border: none;
  border-radius: 5%;
  color: white;
  letter-spacing: 1px;
  padding: 2%;
`;

export default LargeReview;
