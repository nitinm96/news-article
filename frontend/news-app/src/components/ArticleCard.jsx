import React from "react";

function ArticleCard({
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
}) {
  return (
    <div className="border-2 border-gray-300 p-4 m-4 w-4/5">
      <div className="flex flex-col justify-center items-start">
        <div className="font-bold text-xl px-5">{title}</div>
        <p className="p-5 text-md">{`${description.substring(0, 200)}...`}</p>
        <div className="flex items-center justify-between w-full px-5">
          <div className="text-sm">Source: {source}</div>
          <div className="text-sm">{`Published Date: ${publishedAt.substring(
            0,
            10
          )}`}</div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
