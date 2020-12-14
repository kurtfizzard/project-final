import React, { useContext, useState } from "react";
import styled from "styled-components";
import SearchResult from "./SearchResult";
import { FaSearch } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { SpotifyAuthContext } from "./reducers/auth-context";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResponse, setSearchResponse] = useState("");
  const { token } = useContext(SpotifyAuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length > 2) {
      fetch(`http://localhost:8000/spotify/search`, {
        method: "POST",
        body: JSON.stringify({ token: token.token, value: value }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.results.artists);
          if (res.results.artists.length === 0) {
            setSearchResponse("Your search yielded no results.");
          } else if (res.results.artists.length === 1) {
            setSearchResponse(`1 result shown for "${value}".`);
          } else {
            setSearchResponse(
              `${res.results.artists.length} results shown for "${value}".`
            );
          }
          setValue("");
        });
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <SearchBar
          type="text"
          placeholder="Search by Artist"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        ></SearchBar>
        <Submit type="submit">
          <AiOutlineSearch color="black" size="1.5em" />
        </Submit>
      </Form>
      <p>{searchResponse}</p>
      <SearchResults>
        {searchResults &&
          searchResults.map((result) => {
            return <SearchResult key={Math.random()} result={result} />;
          })}
      </SearchResults>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
  width: 90%;
`;

const SearchBar = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  padding: 2%;
  padding-right: 5%;
  width: 75%;
`;

const Submit = styled.button`
  align-items: center;
  background: white;
  border: none;
  border-radius: 5px;
  display: flex;
  height: auto;
  justify-content: center;
  margin-left: -5%;
`;

const SearchResults = styled.ul`
  margin-top: 5%;
  width: 90%;
`;

export default Search;
