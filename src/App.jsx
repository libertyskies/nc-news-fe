import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import SingleArticle from "./components/SingleArticle";
import AllComments from "./components/AllComments";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/articles/:article_id/comments"
          element={<AllComments />}
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
