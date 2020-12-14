import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./reducers/userReducer";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

const SignIn = () => {
  const { currentUser, dispatchCurrentUser, signOut } = useContext(
    CurrentUserContext
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  let history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0 && password.length > 0) {
      fetch("http://localhost:8000/auth/signin", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          dispatchCurrentUser({ type: "SIGN_IN", data: res.user });
          res.user && localStorage.setItem("accessToken", res.user.token);
          setUsername("");
          setPassword("");
          setMessage(res.message);
          history.push("/welcome");
        });
    }
  };

  if (currentUser.user) {
    return (
      <Wrapper>
        <SubmitButton onClick={signOut}>Sign Out</SubmitButton>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Header>Please sign in to continue.</Header>
        <SignUpContainer>
          <span>Not a user yet? Please </span>
          <SignUpLink to="/signup">sign up.</SignUpLink>
        </SignUpContainer>
        <Form onSubmit={handleFormSubmit}>
          <FormLabel>Username:</FormLabel>
          <UsernameContainer>
            <UsernameInput
              label="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></UsernameInput>
          </UsernameContainer>
          <FormLabel>Password:</FormLabel>
          <PasswordContainer>
            <PasswordInput
              label="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>
            <ShowPasswordButton
              onClick={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              {!showPassword ? (
                <AiOutlineEye size="1.5em" />
              ) : (
                <AiOutlineEyeInvisible size="1.5em" />
              )}
            </ShowPasswordButton>
          </PasswordContainer>
          <SubmitButtonContainer>
            <SubmitButton type="submit">Sign In</SubmitButton>
          </SubmitButtonContainer>
        </Form>
        {message && message.length > 1 && (
          <MessageContainer>
            <Message>{message}</Message>
          </MessageContainer>
        )}
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

const Header = styled.p`
  font-size: 1.2em;
  margin-bottom: 2%;
`;

const SignUpContainer = styled.div`
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  margin-bottom: 2%;
  width: 90%;
`;

const SignUpLink = styled(Link)`
  font-weight: bold;
  margin-left: 1%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2%;
  margin-top: 2%;
  width: 90%;
`;

const FormLabel = styled.label`
  margin-left: 7%;
`;

const UsernameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UsernameInput = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 2%;
  width: 82%;
`;

const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PasswordInput = styled.input`
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  margin-bottom: 2%;
  margin-top: 2%;
  padding: 2%;
  padding-right: 5%;
  width: 75%;
`;

const ShowPasswordButton = styled.button`
  align-items: center;
  background: white;
  color: black;
  border: none;
  border-radius: 5px;
  display: flex;
  height: auto;
  justify-content: center;
  margin-bottom: 2%;
  margin-left: -5%;
  margin-top: 2%;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background: #fca311;
  border: none;
  border-radius: 5%;
  color: white;
  font-size: 1.2em;
  letter-spacing: 1px;
  margin-top: 2%;
  padding: 5px;
  width: 26%;
`;

const MessageContainer = styled.div`
  width: 90%;
`;

const Message = styled.p`
  font-size: 1.2em;
  text-align: center;
`;

export default SignIn;
