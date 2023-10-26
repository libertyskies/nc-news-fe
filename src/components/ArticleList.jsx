import React, { useState, useEffect } from "react";
import * as api from "../api";
import { useParams, useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "date");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    setSearchParams({ sort_by: sortBy, order: order });
    api
      .getAllArticles(topic, sortBy, order)
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

  const handleSelect = (e) => {
    const params = e.target.value.split(" ");
    if (params.length === 2) {
      setOrder(params[1]);
      setSortBy(params[0]);
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>{isError}</p>
  ) : (
    <main>
      <select name="selector" id="selector" onChange={handleSelect}>
        <option default>
          Sort by {sortBy}
          {"  ("}
          {order}
          {")"}
        </option>
        <option value="date desc">Date (newest first)</option>
        <option value="date asc">Date (oldest first)</option>
        <option value="votes desc">Votes (descending)</option>
        <option value="votes asc">Votes (ascending)</option>
      </select>
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
