import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-l5et.onrender.com/api",
});

export const getTopics = () => {
  return request.get("topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const getAllArticles = () => {
  return request.get("articles").then(({ data: { articles } }) => {
    return articles;
  });
};

export const getArticleById = (article_id) => {
  return request.get(`articles/${article_id}`).then(({ data: { article } }) => {
    return article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return request
    .get(`articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const patchArticleVotes = (article_id, votes) => {
  const article = {
    inc_votes: votes,
  };
  return request
    .patch(`articles/${article_id}`, article)
    .then(({ data: { article } }) => {
      return article[0].votes;
    });
};

export const patchCommentVotes = (comment_id, votes) => {
  const comment = {
    inc_votes: votes,
  };
  return request
    .patch(`comments/${comment_id}`, comment)
    .then(({ data: { comment } }) => {
      return comment[0].votes;
    });
};

export const postComment = (username, comment, article_id) => {
  const newComment = {
    username: username,
    body: comment,
  };
  const id = article_id.id;

  return request
    .post(`articles/${id}/comments`, newComment)
    .then(({ data: { comment } }) => {
      return comment[0];
    });
};

export const getArticlesByTopic = (topic) => {
  return request
    .get(`articles?topic=${topic}`)
    .then(({ data: { articles } }) => {
      return articles;
    });
};
