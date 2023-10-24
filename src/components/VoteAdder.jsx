import React, { useState, useEffect } from "react";
import * as api from "../api";

export default function VoteAdder({ item }) {
  const [itemVotes, setItemVotes] = useState(item.votes);
  const [userVotes, setUserVotes] = useState(0);

  useEffect(() => {
    let newVotes = itemVotes + userVotes;
    setItemVotes(newVotes);
    setUserVotes(0);
  }, []);

  const updateVotes = (num) => {
    setUserVotes(userVotes + num);
  };
  return (
    <div className={item.comment_id ? "comment-votes" : "article-votes"}>
      <p>Votes: {itemVotes + userVotes}</p>
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
    </div>
  );
}
