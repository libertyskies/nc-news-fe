import React, { useState, useEffect, useContext } from "react";
import * as api from "../api";
import VoteAdder from "./VoteAdder";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function CommentCard({ comment }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [isUserAuthor, setIsUserAuthor] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  let commentDate = new Date(comment.created_at).toLocaleDateString(
    undefined,
    options
  );

  useEffect(() => {
    if (currentUser.username === comment.author) {
      setIsUserAuthor(true);
    }
  }, []);

  const handleDelete = () => {
    api
      .deleteComment(comment.comment_id)
      .then(() => {
        setDeleteSuccess(true);
      })
      .catch((err) => {
        setDeleteError(true);
      });
  };

  return (
    <>
      {deleteSuccess ? (
        <p>successfully deleted</p>
      ) : deleteError ? (
        <p>Error deleting</p>
      ) : (
        ""
      )}
      <div className="comment-container">
        <p className="comment-author">{comment.author}</p>
        <p className="comment-body">{comment.body}</p>
        <p>{commentDate}</p>
        <VoteAdder item={comment} />

        {isUserAuthor ? (
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
