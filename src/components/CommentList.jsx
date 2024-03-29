import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";

export default function CommentList({ id }) {
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getCommentsByArticleId(id).then((comments) => {
      let sortedComments = comments.sort((c1, c2) =>
        c1.created_At < c2.created_At
          ? 1
          : c1.created_At > c2.created_At
          ? -1
          : 0
      );
      setAllComments(sortedComments);
      setIsLoading(false);
    });
  });
  return isLoading ? (
    <p>Loading comments...</p>
  ) : (
    <div className="comment-list">
      {allComments.map((comment, index) => {
        if (index < 4) {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        }
      })}
      {allComments.length > 4 ? (
        <Link to={`comments`}>
          <button className="more-comments comments-button">
            Show more comments
          </button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}
