import React, { useState, useEffect, useContext } from "react";
import * as api from "../api";
import VoteAdder from "./VoteAdder";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Login({ setIsLoggedIn, setIsError, isError }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [typingUsername, setTypingUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .getUserByUsername(typingUsername)
      .then((user) => {
        setIsError(false);
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsError(true);
        if (err.message === "Network Error") {
          setErrorMessage(err.message);
        } else {
          setErrorMessage(err.response.data.msg);
        }
      });
  };
  const handleUsername = (e) => {
    setTypingUsername(e.target.value);
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input name="username" onChange={handleUsername} required></input>
        <button>Submit</button>
        {isError ? (
          <p className="error-msg"> Oops... {errorMessage}</p>
        ) : (
          <p></p>
        )}
      </form>
    </section>
  );
}
