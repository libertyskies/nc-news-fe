import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";

export default function SingleArticle() {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, []);

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
    </div>
  );
}
