import React, { useState, useEffect, useContext } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Login from "./Login";

export default function CommentAdder(id) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [typingComment, setTypingComment] = useState("");
  const [username, setUsername] = useState("");
  const [hasPosted, setHasPosted] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [postingError, setPostingError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

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
    if (username === currentUser.username) {
      api
        .postComment(username, typingComment, id)
        .then(() => {
          setUsername("");
          setTypingComment("");
          setPostingError(null);
          setCurrentUser({ username: username });
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
    } else {
      setHasPosted(false);
      setIsCommentLoading(false);
      setIsPageLoading(false);
      setPostingError(`You do not have permission to post as user ${username}`);
    }
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
        <section>
          {currentUser.username ? (
            <p>Post as {currentUser.username}? </p>
          ) : (
            <Link to="/login">
              {" "}
              <p>Please Log in to post a comment</p>
            </Link>
          )}
          <form className="new-comment-form" onSubmit={handleSubmit}>
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
        </section>
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
