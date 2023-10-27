import React, { useState, useEffect } from "react";
import * as api from "../api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import CommentAdder from "./CommentAdder";

export default function AllComments() {
  const { article_id } = useParams();
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articleTitle, setArticleTitle] = useState("");

  useEffect(() => {
    setIsLoading(true);
    api.getCommentsByArticleId(article_id).then((comments) => {
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
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.getArticleById(article_id).then((article) => {
      setArticleTitle(article[0].title);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <p>Loading comments...</p>
  ) : (
    <>
      <Link to={`/articles/${article_id}`}>
        <h3 className="single-article-title">... {articleTitle}</h3>
      </Link>
      <h4 className="comments-title">All Comments</h4>
      <CommentAdder />
      <div className="comment-list">
        {allComments.map((comment, index) => {
          return <CommentCard comment={comment} key={comment.comment_id} />;
        })}
      </div>
    </>
  );
}
