import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { useHistory, useParams } from "react-router";
import { CurrentUserContext } from "./reducers/userReducer";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/user/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      });
  }, []);

  if (loading === true) {
    return <Loading />;
  } else if (reviews.length === 0 && currentUser.user._id === id) {
    return (
      <Wrapper>
        <p>You currently have no reviews.</p>
      </Wrapper>
    );
  } else if (reviews.length === 0) {
    return (
      <Wrapper>
        <p>This user currently has no reviews.</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <UserInfo>
          <Username>{reviews[0].username}</Username>
          <div>
            <FollowerCount>
              Followers: {currentUser.user.followers.length}
            </FollowerCount>
            <p>Following: {currentUser.user.following.length}</p>
          </div>
        </UserInfo>
        <Container>
          {reviews.reverse().map((review) => {
            return (
              <CoverPhoto
                key={Math.random()}
                src={review.images[1].url}
                onClick={() => {
                  history.push(`/review/${review._id}`);
                }}
              />
            );
          })}
        </Container>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5%;
  width: 90%;
`;

const Username = styled.p`
  font-size: 2em;
  font-weight: bold;
`;

const FollowerCount = styled.p`
  margin-bottom: 3%;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
`;

const CoverPhoto = styled.img`
  margin: 0.5%;
  width: 32%;
`;

export default Profile;
