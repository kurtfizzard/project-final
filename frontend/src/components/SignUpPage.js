import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setMessage("The password must be at least 8 characters.");
    } else if (password !== confirmPassword) {
      setMessage(
        "The password and confirmation do not match. Please try again."
      );
    } else {
      e.preventDefault();
      fetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setMessage(res.message);
        });
    }
  };

  return (
    <Wrapper>
      <Header>Please sign up to continue.</Header>
      <SignInContainer>
        <span>Already a user? Please </span>
        <SignInLink to="/signin">sign in.</SignInLink>
      </SignInContainer>
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
        <FormLabel>Confirm Password:</FormLabel>
        <PasswordContainer>
          <PasswordInput
            label="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></PasswordInput>
          <ShowPasswordButton
            onClick={(e) => {
              e.preventDefault();
              setShowConfirmPassword(!showConfirmPassword);
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {!showConfirmPassword ? (
              <AiOutlineEye size="1.5em" />
            ) : (
              <AiOutlineEyeInvisible size="1.5em" />
            )}
          </ShowPasswordButton>
        </PasswordContainer>
        <SubmitButtonContainer>
          <SubmitButton type="submit">Sign Up</SubmitButton>
        </SubmitButtonContainer>
      </Form>
      {message.length > 1 && (
        <MessageContainer>
          <Message>{message}</Message>
        </MessageContainer>
      )}
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

const Header = styled.p`
  font-size: 1.2em;
  margin-bottom: 2%;
`;

const SignInContainer = styled.div`
  display: flex;
  font-size: 1.2em;
  justify-content: center;
  margin-bottom: 2%;
  width: 90%;
`;

const SignInLink = styled(Link)`
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
  border: none;
  border-radius: 5px;
  color: black;
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

export default SignUpPage;
