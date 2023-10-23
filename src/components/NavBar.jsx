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
    <nav>
      {allTopics.map((topic, index) => {
        if (index === allTopics.length - 1) {
          return (
            <Link to={`/${topic}`} key={`${topic}`} className="nav-item">
              {topic}
            </Link>
          );
        }
        return (
          <Link to={`/${topic}`} key={`${topic}`} className="nav-item">
            {topic} | {"   "}
          </Link>
        );
      })}
    </nav>
  );
}
