import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CommentAdder() {
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <form className="new-comment-form" onSubmit={handleSubmit}>
      <div className="user-avatar"></div>
      <label htmlFor="username" className="username-label">
        Username:
      </label>
      <input
        className="username-input"
        name="username"
        id="username"
        type="text"
      />
      <label htmlFor="comment" className="comment-label">
        New comment:
      </label>
      <input
        className="comment-input"
        name="comment"
        id="comment"
        type="text"
        onChange={handleCommentChange}
      />
      <button>Submit</button>
    </form>
  );
}
