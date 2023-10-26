import React, { useState, useEffect } from "react";
import * as api from "../api";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ homeExists }) {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [topicExists, setTopicExists] = useState(true);

  useEffect(() => {
    if (topic) {
      api.getTopics().then((topics) => {
        let topicInTopics = topics.filter((item) => {
          if (item.slug === topic) {
            return item.slug;
          }
        });
        if (topicInTopics.length === 1) {
          setTopicExists(true);
        } else {
          setTopicExists(false);
        }
      });
    }
  }, [topic]);

  useEffect(() => {
    setIsLoading(true);
    if (homeExists) {
      api.getAllArticles().then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      });
    } else if (topicExists) {
      api.getArticlesByTopic(topic).then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      });
    }
  }, [topic, topicExists, homeExists]);

  return isLoading ? (
    <p>Loading...</p>
  ) : topicExists || homeExists ? (
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
  ) : (
    <p>Oops... Topic not found</p>
  );
}
