import React, { useState, useEffect } from "react";
import * as api from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ homeExists }) {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  //const [topicExists, setTopicExists] = useState(true);
  const [isError, setIsError] = useState(null);
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    setSearchParams({ sort_by: sortBy, order: order });
    api
      .getAllArticles(topic, sortBy)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        setIsError(null);
      })
      .catch((err) => {
        setIsError(err.response.data.msg);
        setIsLoading(false);
      });
  }, [topic, order, sortBy]);

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>{isError}</p>
  ) : (
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
