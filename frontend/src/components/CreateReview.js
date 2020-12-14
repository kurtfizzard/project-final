import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import { format } from "date-fns";
import StarRatingBar from "./StarRatingBar";

const CreateReview = ({ release, render, setRender }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [textEntry, setTextEntry] = useState("");
  const { artists, id, images, name, release_date } = release;
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const date = format(new Date(), "PPP");

    if (currentUser && textEntry.length >= 10) {
      fetch("/reviews/add", {
        method: "POST",
        body: JSON.stringify({
          date: date,
          uid: currentUser.user._id,
          username: currentUser.user.username,
          review: textEntry,
          artists: artists,
          likeCount: 0,
          likes: [],
          rating: rating,
          releaseId: id,
          images,
          name: name,
          release_date: release_date,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setRender(!render);
        });
      setTextEntry("");
    } else {
      return;
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <TextBox
          placeholder="Enter your review."
          value={textEntry}
          onChange={(e) => {
            setTextEntry(e.target.value);
          }}
        ></TextBox>
        <StarRatingBar rating={rating} setRating={setRating} />
        <Submit type="submit">Submit</Submit>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  width: 80%;
`;

const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextBox = styled.textarea`
  border: none;
  resize: none;
  margin-bottom: 2%;
  height: 5em;
  width: 100%;
`;

const Submit = styled.button`
  align-items: center;
  background: #fca311;
  border: none;
  border-radius: 5%;
  color: white;
  display: flex;
  font-size: 1.2em;
  height: auto;
  justify-content: center;
  margin-top: 2%;
  letter-spacing: 1px;
  padding: 2%;
  width: 25%;
`;

export default CreateReview;
