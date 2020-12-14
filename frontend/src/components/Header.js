import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineRollback,
  AiOutlineLogin,
  AiOutlineLogout,
} from "react-icons/ai";
import { CurrentUserContext } from "./reducers/userReducer";

const Header = () => {
  const { currentUser, signOut } = useContext(CurrentUserContext);

  let history = useHistory();

  return (
    <Wrapper>
      <HeaderLink onClick={() => history.goBack()}>
        <AiOutlineRollback color="FCA311" size="2em" />
        {/* <ButtonText>Back</ButtonText> */}
      </HeaderLink>
      <HeaderLink to="/">
        <AiOutlineHome color="FCA311" size="2em" />
        {/* <ButtonText>Home</ButtonText> */}
      </HeaderLink>
      <HeaderLink to="/search">
        <AiOutlineSearch color="FCA311" size="2em" />
        {/* <ButtonText>Search</ButtonText> */}
      </HeaderLink>
      {/* <HeaderLink to="/profile"> */}
      <HeaderLink
        onClick={() =>
          currentUser.user && history.push(`/profile/${currentUser.user._id}`)
        }
      >
        <AiOutlineUser color="FCA311" size="2em" />
        {/* <ButtonText>Profile</ButtonText> */}
      </HeaderLink>
      {currentUser.user ? (
        <HeaderLink onClick={signOut}>
          <AiOutlineLogout color="FCA311" size="2em" />
          {/* <ButtonText>Sign Out</ButtonText> */}
        </HeaderLink>
      ) : (
        <HeaderLink to="/signin">
          <AiOutlineLogin color="FCA311" size="2em" />
          {/* <ButtonText>Sign In</ButtonText> */}
        </HeaderLink>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: center;
  background: white;
  display: flex;
  height: 10%;
  justify-content: space-between;
  margin-bottom: 5%;
  padding: 2%;
`;

const HeaderLink = styled(Link)`
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonText = styled.p`
  font-size: 75%;
`;

export default Header;
