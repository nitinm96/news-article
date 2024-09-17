import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

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
  handler = { getFavorites },
}) {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const removeFavorite = async (articleId) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `http://localhost:5001/api/articles/favorites/${articleId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data.message);
      handler();
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewArticle = () => {
    navigate(`/article/${id}`, {
      state: {
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
      },
    });
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
        <p className="p-5 text-md text-start border-b-4 border-cyan-400">{`${description.substring(
          0,
          150
        )}...`}</p>

        <div className="flex flex-row items-center justify-between mt-2 w-full">
          <div>
            <div className="font-bold text-sm">Source: {source}</div>
            <div className="font-bold text-sm">
              {`${formatLongDate(publishedAt)}`}
            </div>
            <div
              onClick={handleViewArticle}
              className="cursor-pointer underline text-blue-800"
            >
              View Article
            </div>
          </div>
          <div>
            {user && (
              <button>
                <RemoveCircleOutlineOutlinedIcon
                  onClick={() => removeFavorite(id)}
                  fontSize="large"
                  htmlColor="#f24b3f"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
