import React, { useState, useEffect } from "react";
import * as api from "../api";
import VoteAdder from "./VoteAdder";

export default function CommentCard({ comment }) {
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

  return (
    <div className="comment-container">
      <p className="comment-author">{comment.author}</p>
      <p className="comment-body">{comment.body}</p>
      <p>{commentDate}</p>
      <VoteAdder item={comment} />
    </div>
  );
}
