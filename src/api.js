import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-l5et.onrender.com/api",
});

export const getTopics = () => {
  return request
    .get("topics")
    .then(({ data: { topics } }) => {
      return topics;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllArticles = () => {
  return request
    .get("articles")
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticleById = (article_id) => {
  return request
    .get(`articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      return err;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return request
    .get(`articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    })
    .catch((err) => {
      return err;
    });
};
