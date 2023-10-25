import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CommentAdder(id) {
  const [isLoading, setIsLoading] = useState(true);
  const [typingComment, setTypingComment] = useState("");
  const [finalComment, setFinalComment] = useState("");
  const [username, setUsername] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [postingError, setPostingError] = useState(null);
  useEffect(() => {
    setIsLoading(false);
    setHasPosted(false);
    setPostingError(false);
  }, []);

  useEffect(() => {}, [hasPosted]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFinalComment(typingComment);

    api
      .postComment(username, finalComment, id)
      .then(() => {
        setPostingError(null);
        setHasPosted(true);
      })
      .catch((err) => {
        setPostingError(err.response.data.msg);
        setHasPosted(false);
      });
  };
  const handleCommentChange = (e) => {
    setTypingComment(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="new-comment-form" onSubmit={handleSubmit}>
          <div className="user-avatar"></div>
          <label htmlFor="username" className="new-comment username-label">
            Username:
          </label>
          <input
            className="username-input input"
            name="username"
            id="username"
            type="text"
            required
            onChange={handleUsername}
          />
          <label htmlFor="comment" className="new-comment new-comment-label">
            Comment:
          </label>
          <input
            className="comment-input input"
            name="comment"
            id="comment"
            type="text"
            onChange={handleCommentChange}
            required
          />
          <button>Submit</button>
        </form>
      )}
      {hasPosted ? <p>Comment posted</p> : <p></p>}
      {postingError ? (
        <p className="posting-error-msg error-msg">{postingError}</p>
      ) : (
        <p></p>
      )}
    </>
  );
}
