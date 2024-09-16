import React, { useContext, useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function ArticleCard({
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
}) {
  const { user, setUser, loading } = useContext(UserContext);

  const addToFavourites = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const userId = user._id;

      const response = await axios.post(
        "http://localhost:5001/api/articles/favorites",
        {
          userId: userId,
          author: author || "Unknown",
          title: title || "Unknown",
          description: description || "Unknown",
          url: url || "Unknown",
          source: source || "",
          image: image || "Unknown",
          category: category || "Unknown",
          language: language || "Unknown",
          country: country || "Unknown",
          published_at: publishedAt || "Unknown",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request header
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const formatLongDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      id={id}
      className="border-2 border-gray-200 my-10 p-4 w-11/12 hover:bg-gray-100 ease-in-out transition-all duration-150"
    >
      <div className="flex flex-col justify-center items-start">
        <div className="font-bold text-2xl px-5">{title}</div>
        <p className="p-5 text-md text-start border-b-4 border-indigo-500">{`${description.substring(
          0,
          150
        )}...`}</p>

        <div className="flex flex-row items-center justify-between mt-2 w-full">
          <div>
            <div className="font-bold text-sm">Source: {source}</div>
            <div className="font-bold text-sm">
              {`${formatLongDate(publishedAt)}`}
            </div>
            <div className="cursor-pointer underline text-blue-800">
              View Article
            </div>
          </div>
          <div>
            {user && (
              <button onClick={addToFavourites}>
                <StarIcon fontSize="large" htmlColor="#ffea00" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
