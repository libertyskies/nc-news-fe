import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

export default function ArticleCard({ article_id, currentArticle }) {
  return (
    <Link to={`/articles/${article_id}`}>
      <div className="article-card">
        <h3 className="article-title"> {currentArticle.title}</h3>
        <img
          className="article-img"
          src={currentArticle.article_img_url}
          alt={`an image of ${currentArticle.title}`}
        />
        <div className="article-card-stats">
          <p className="article-card-votes">Likes: {currentArticle.votes}</p>
          <p className="article-card-comment-count">
            Comments: {currentArticle.comment_count}
          </p>
        </div>
      </div>
    </Link>
  );
}
