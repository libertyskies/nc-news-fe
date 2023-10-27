import React, { useState, useEffect, useContext } from "react";
import * as api from "../api";
import VoteAdder from "./VoteAdder";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";

export default function UserDetails() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser.username);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   if (currentUser.username) {
  //     api
  //       .getUserByUsername(currentUser.username)
  //       .then((user) => {
  //         setIsLoggedIn(true);
  //         setIsLoading(false);
  //         setIsError(false);
  //       })
  //       .catch((err) => {
  //         setIsError(true);
  //         setIsLoggedIn(false);
  //         setIsLoading(false);
  //       });
  //   }
  // }, [currentUser]);
  // useEffect(() => {
  //   if (currentUser.username) {
  //     setIsLoading(false);
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoading(false);
  //     setIsLoggedIn(false);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    setIsLoading(false);
  }, [isLoggedIn]);

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
  };
  return isLoggedIn ? (
    <div>
      <main className="user-details">
        <button onClick={handleLogOut} className="log-out-button button">
          Log Out
        </button>
        <section>
          <h2>User information</h2>
          <p>name: {currentUser.name}</p>
          <p>username: {currentUser.username}</p>
        </section>
        <article>
          <h3>Your Activity</h3>
        </article>
      </main>
    </div>
  ) : (
    <main className="user-details">
      <h2>Log In</h2>
      <Login
        setIsError={setIsError}
        isError={isError}
        setIsLoggedIn={setIsLoggedIn}
      />
    </main>
  );
}
