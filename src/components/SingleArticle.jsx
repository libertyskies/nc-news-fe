import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import VoteAdder from "./VoteAdder";
import CommentList from "./CommentList";
import CommentAdder from "./CommentAdder";

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentsHidden, setCommentsHidden] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [commentsHidden]);

  const handleClick = () => {
    setCommentsHidden(!commentsHidden);
  };

  return isLoading ? (
    <p>Loading article...</p>
  ) : (
    <div className="article-page">
      <h2 className="single-article-title"> {article[0].title}</h2>
      <h3 className="single-article-author">{article[0].author}</h3>
      <img
        className="single-article-img"
        src={article[0].article_img_url}
        alt={`an image of ${article[0].title}`}
      />
      <p className="single-article-text">{article[0].body}</p>
      <VoteAdder item={article[0]} />
      <CommentAdder id={article[0].article_id} />
      {commentsHidden ? (
        <>
          <button
            onClick={handleClick}
            className="show-comments comments-button"
          >
            Show Comments +
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleClick}
            className="show-comments comments-button"
          >
            Hide Comments -
          </button>
          <CommentList id={article[0].article_id} />
        </>
      )}
    </div>
  );
}
