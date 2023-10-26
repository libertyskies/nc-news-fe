import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CommentAdder(id) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [typingComment, setTypingComment] = useState("");
  const [username, setUsername] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [postingError, setPostingError] = useState(null);

  useEffect(() => {
    setIsPageLoading(false);
    setHasPosted(false);
    setPostingError(false);
    setIsCommentLoading(false);
  }, []);

  useEffect(() => {
    setPostingError(null);
    setIsCommentLoading(false);
  }, [typingComment, username]);

  const handleSubmit = (e) => {
    setIsCommentLoading(true);
    e.preventDefault();
    api
      .postComment(username, typingComment, id)
      .then(() => {
        setUsername("");
        setTypingComment("");
        setPostingError(null);
        setHasPosted(true);
        setIsCommentLoading(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          setPostingError(err.message);
        } else {
          setPostingError(err.response.data.msg);
        }
        setHasPosted(false);
        setIsCommentLoading(false);
        setIsPageLoading(false);
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
      {isPageLoading ? (
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
            value={username}
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
            value={typingComment}
            onChange={handleCommentChange}
            required
          />
          <button disabled={isCommentLoading}>Submit</button>
        </form>
      )}
      {postingError ? (
        <p className="posting-error-msg error-msg">
          Comment post failed: {postingError}
        </p>
      ) : (
        <p></p>
      )}
      {isCommentLoading ? <p>Posting Comment...</p> : ""}
      {hasPosted ? <p>Comment posted</p> : ""}
    </>
  );
}
