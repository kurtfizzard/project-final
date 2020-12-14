import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import FeedReview from "./FeedReview";
import Loading from "./Loading";

const Feed = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/reviews/feed/${currentUser.user._id}`, {
      method: "POST",
      body: JSON.stringify({
        following: currentUser.user.following,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
      });
  }, []);

  if (loading === true) {
    return <Loading />;
  } else if (feed.length === 0) {
    return (
      <Wrapper>
        <Notice>
          Your feed is current empty. Follow other users to see their reviews
          here.
        </Notice>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        {feed.reverse().map((review) => {
          return <FeedReview key={Math.random()} props={review} />;
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Notice = styled.p`
  /* font-size: 1.5em; */
  text-align: center;
  width: 90%;
`;

export default Feed;
