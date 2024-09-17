import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";

function FullArticle() {
  const location = useLocation();

  //get the article details from the location state
  const {
    id,
    author,
    category,
    title,
    description,
    url,
    country,
    image,
    language,
    source,
    publishedAt,
  } = location.state || {};

  //format the date to a long date format
  const formatLongDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-start justify-center w-full space-y-4 my-10 px-60">
        <div className="text-4xl font-bold">{title}</div>
        <div className="flex items-center justify-start w-full font-bold space-x-3">
          <div className="text-xs">Author: {author || "Unkown"} |</div>
          <div className="text-xs">Source: {source || "Unknown"} |</div>
          <div className="text-xs">
            Published: {formatLongDate(publishedAt)} |
          </div>
          <div className="text-blue-700 underline text-sm">
            <a href={url} target="_blank">
              View Full Article
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <img
            src={
              image ||
              "https://via.placeholder.com/1000x700?text=Image+Unavailable"
            }
            alt="article_img"
            width={700}
            className=""
          />
          <div className="text-start px-10">{description}</div>
        </div>
      </div>
    </div>
  );
}

export default FullArticle;
