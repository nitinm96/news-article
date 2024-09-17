import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "./navbar";

function FullArticle() {
  const location = useLocation();
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
      <div className="flex flex-col items-center justify-center w-full space-y-4 my-10 px-72">
        <div className="text-4xl font-bold px-10">{title}</div>
        <div className="flex items-center justify-start w-full space-x-3 px-10">
          <div className="text-sm">Author: {author} |</div>
          <div className="text-sm">Source: {source} |</div>
          <div className="text-sm">
            Published: {formatLongDate(publishedAt)} |
          </div>
          <div className="text-blue-700 underline">
            <a href={url} target="_blank">
              View Full Article
            </a>
          </div>
        </div>
        <img
          src={
            image ||
            "https://via.placeholder.com/1000x700?text=Image+Unavailable"
          }
          alt="article_img"
          width={700}
          className=""
        />
        <div className="px-10 p-5">{description}</div>
      </div>
    </div>
  );
}

export default FullArticle;
