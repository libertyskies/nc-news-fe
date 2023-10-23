import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">NC News</Link>
      </h1>

      <NavBar />
    </header>
  );
}
