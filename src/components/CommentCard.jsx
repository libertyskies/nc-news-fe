import React, { useState, useEffect } from "react";
import * as api from "../api";
import VoteAdder from "./VoteAdder";

export default function CommentCard({ comment }) {
  return (
    <div>
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <p>{comment.created_at}</p>
      <VoteAdder item={comment} />
    </div>
  );
}
