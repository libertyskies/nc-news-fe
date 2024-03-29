import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./components/SingleArticle";
import AllComments from "./components/AllComments";
import ArticleList from "./components/ArticleList";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/home" element={<ArticleList />} />
        <Route
          path="/articles/:article_id/comments"
          element={<AllComments />}
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/topic/:topic" element={<ArticleList />} />
        <Route path="/login" element={<UserDetails />} />
        <Route path="/users/:user" element={<UserDetails />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
