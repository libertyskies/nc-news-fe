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
    if (params.length === 1) {
      setSortBy(params[0]);
    }
  };
  const handleOrder = (e) => {
    const params = e.target.value.split(" ");
    if (params.length === 1) {
      setOrder(params[0]);
    }
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>{isError}</p>
  ) : (
    <main>
      <div className="select-container">
        <select
          name="selector"
          id="selector"
          className="selector"
          onChange={handleSelect}
        >
          <option default>Sort by {sortBy}</option>
          <option value="date">Date</option>
          <option value="votes">Votes</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="id">ID</option>
        </select>
        <select
          name="order-selector"
          className="selector"
          id="order-selector"
          onChange={handleOrder}
        >
          <option default>Order by {order}</option>
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
      </div>
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
