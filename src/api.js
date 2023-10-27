import axios from "axios";

const request = axios.create({
  baseURL: "https://nc-news-l5et.onrender.com/api",
});

export const getTopics = () => {
  return request.get("topics").then(({ data: { topics } }) => {
    return topics;
  });
};

export const getAllArticles = (topic, sortby, order) => {
  return request
    .get("articles", { params: { topic, sortby, order } })
    .then(({ data: { articles } }) => {
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
  const id = article_id;

  return request
    .post(`articles/${id}/comments`, newComment)
    .then(({ data: { comment } }) => {
      return comment[0];
    });
};

export const deleteComment = (comment_id) => {
  return request.delete(`comments/${comment_id}`).then(() => {
    return "success";
  });
};

export const getAllUser = () => {
  return request.get("users").then(({ data: { users } }) => {
    return users;
  });
};

export const getUserByUsername = (username) => {
  return request.get(`users/${username}`).then(({ data: { user } }) => {
    return user[0];
  });
};
