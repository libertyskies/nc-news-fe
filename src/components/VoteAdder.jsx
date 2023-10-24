import React, { useState, useEffect } from "react";
import * as api from "../api";

export default function VoteAdder({ item }) {
  const [itemVotes, setItemVotes] = useState(item.votes);
  const [userVotes, setUserVotes] = useState(0);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let newVotes = itemVotes + userVotes;
    setItemVotes(newVotes);
  }, []);

  const updateVotes = (num) => {
    setUserVotes(userVotes + num);

    item.comment_id
      ? api
          .patchCommentVotes(item.comment_id, num)
          .then((votes) => {
            setItemVotes(votes);
          })
          .catch((err) => {
            setItemVotes(itemVotes - num);
          })
      : api
          .patchArticleVotes(item.article_id, num)
          .then((votes) => {
            setItemVotes(votes);
          })
          .catch((err) => {
            setItemVotes(itemVotes - num);
            setIsError(true);
          });
  };
  return (
    <div className={item.comment_id ? "comment-votes" : "article-votes"}>
      <p>Votes: {itemVotes}</p>
      <button
        disabled={userVotes === 1}
        onClick={() => {
          updateVotes(1);
        }}
        aria-label="like"
      >
        +
      </button>
      <button
        disabled={userVotes === -1}
        onClick={() => {
          updateVotes(-1);
        }}
        aria-label="dislike"
      >
        -
      </button>
      <p className="error-sentence">
        {isError
          ? "Oops... There is an error with your vote. Try again later"
          : ""}
      </p>
    </div>
  );
}
