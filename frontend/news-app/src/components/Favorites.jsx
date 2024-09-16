import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

function Favorites() {
  const { user, setUser, loading } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        "http://localhost:5001/api/articles/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.articles);
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      getFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 place-items-stretch">
            {favorites.articles &&
              favorites.articles.map((article, index) => (
                <>
                  <div>
                    <ArticleCard
                      key={article._id}
                      id={index}
                      author={article.author}
                      category={article.category}
                      title={article.title}
                      description={article.description}
                      url={article.url}
                      country={article.country}
                      image={article.image}
                      language={article.language}
                      source={article.source}
                      publishedAt={article.published_at}
                    />
                    <div className="">
                      <button>
                        <DeleteIcon
                          onClick={() => removeFavorite(article._id)}
                          fontSize="large"
                        />
                      </button>
                    </div>
                  </div>
                </>
              ))}

            {!favorites.articles && (
              <div className="text-2xl">No favorite articles yet</div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-2xl">
              Please sign in to view your favorites
            </div>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
            <Link to="/home">
              <button>Home</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
