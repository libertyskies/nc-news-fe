import React, { useState, useEffect } from "react";
import * as api from "../api";

export default function ArticleCard({ article_id }) {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);

  return isLoading ? (
    <p>Loading article...</p>
  ) : (
    <div className="article-card">
      <h3 className="article-title"> {article[0].title}</h3>
      <h4 className="article-author">{article[0].author}</h4>
      <img
        className="article-img"
        src={article[0].article_img_url}
        alt={`an image of ${article[0].title}`}
      />
    </div>
  );
}

//       <p className="article-topic">{article[0].topic}</p>
