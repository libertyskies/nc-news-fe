import React, { useState, useEffect } from "react";
import * as api from "../api";
import ArticleCard from "./ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getAllArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <main>
      <section className="articles-container">
        {articles.map((article) => {
          return (
            <ArticleCard
              article_id={article.article_id}
              currentArticle={article}
              key={`${article.article_id}`}
            />
          );
        })}
      </section>
    </main>
  );
}
