import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import CreateReview from "./CreateReview";
import Loading from "./Loading";
import { SpotifyAuthContext } from "./reducers/auth-context";
import ReleasePageReview from "./ReleasePageReview";
import Track from "./Track";

const ReleasePage = () => {
  const [release, setRelease] = useState(null);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [render, setRender] = useState(false);
  const { token } = useContext(SpotifyAuthContext);

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/releasebyid/${id}`, {
      method: "POST",
      body: JSON.stringify({ token: token.token }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRelease(res.data);
      });
    fetch(`http://localhost:8000/reviews/release/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setReviews(res.data);
      });
  }, [render]);

  if (release) {
    const {
      artists,
      genres,
      id,
      images,
      label,
      name,
      release_date,
      tracks,
    } = release;

    return (
      <Wrapper>
        {artists && (
          <InfoHeader onClick={() => history.push(`/artist/${artists[0].id}`)}>
            {artists[0].name} - {name} ({release_date.slice(0, 4)})
          </InfoHeader>
        )}
        <ReleaseLabel>{label}</ReleaseLabel>
        {images && <CoverPhoto src={images[1].url}></CoverPhoto>}
        {tracks && (
          <TrackList>
            {tracks.items.map((track) => (
              <Track key={Math.random()} track={track} />
            ))}
          </TrackList>
        )}
        <ReviewContainer>
          <ReviewHeader>Reviews:</ReviewHeader>
          {reviews.map((review) => {
            return (
              <ReleasePageReview
                key={Math.random()}
                props={review}
                render={render}
                setRender={setRender}
              />
            );
          })}
        </ReviewContainer>
        <CreateReview release={release} render={render} setRender={setRender} />
      </Wrapper>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoHeader = styled.p`
  font-size: 1.2em;
  margin-bottom: 2%;
  text-align: center;
  width: 90%;
`;

const ReleaseLabel = styled.p`
  margin-bottom: 2%;
`;

const CoverPhoto = styled.img`
  height: 200px;
  margin-bottom: 5%;
  width: 200px;
`;

const TrackList = styled.ul`
  margin-bottom: 5%;
  width: 80%;
`;

const ReviewHeader = styled.p`
  margin-bottom: 2%;
  padding-bottom: 2%;
`;

const ReviewContainer = styled.div`
  width: 90%;
`;

export default ReleasePage;
