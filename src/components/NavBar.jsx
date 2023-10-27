import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

export default function NavBar() {
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    api.getTopics().then((topics) => {
      const newTopics = [];
      topics.forEach((topic) => {
        newTopics.push(topic.slug);
        topics;
      });
      setAllTopics(newTopics);
    });
  }, []);
  return (
    <nav className="navbar">
      {allTopics.map((topic, index) => {
        let navTopic = topic;
        if (index !== allTopics.length - 1) {
          navTopic += " | ";
        }
        return (
          <Link to={`/topic/${topic}`} key={`${topic}`} className="nav-item">
            {navTopic}
          </Link>
        );
      })}
    </nav>
  );
}
