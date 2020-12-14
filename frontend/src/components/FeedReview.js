import { isFuture } from "date-fns";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReviewRating from "./ReviewRating";
import StarRatingBar from "./StarRatingBar";

const FeedReview = ({ props }) => {
  const {
    _id,
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
  } = props;
  let history = useHistory();

  return (
    <Wrapper onClick={() => history.push(`/review/${_id}`)}>
      <CoverPhoto src={images[1].url} />
      <Container>
        <ReleaseInfo>
          {artists[0].name} - {name} ({release_date.slice(0, 4)})
        </ReleaseInfo>
        <ReviewRating rating={rating} />
        <UserInfo>Reviewed by: {username}</UserInfo>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100px;
  margin-bottom: 2%;
  width: 90%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CoverPhoto = styled.img`
  height: 100px;
  margin-right: 2%;
  width: 100px;
`;

const ReleaseInfo = styled.p`
  margin-bottom: 2%;
`;

const UserInfo = styled.p`
  margin-top: 2%;
`;

export default FeedReview;
