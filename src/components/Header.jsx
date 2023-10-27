import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";

export default function Header() {
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {}, [currentUser]);
  return (
    <header>
      <h1>
        <Link to="/">NC News</Link>
      </h1>
      <Link to={`/users/${currentUser.username}`}>
        <img
          className="avatar_url"
          src={
            currentUser.avatar_url ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }
          alt={"login"}
        />
      </Link>
      <NavBar />
    </header>
  );
}
