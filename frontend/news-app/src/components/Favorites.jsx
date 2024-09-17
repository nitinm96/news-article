import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import FavoriteArticleCard from "./FavoriteArticleCard";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Logo from "../assets/articleLogo.png";

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
                    <FavoriteArticleCard
                      key={article._id}
                      id={article._id}
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
                      handler={getFavorites}
                    />
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
          <div className="flex flex-col items-center justify-center h-screen space-y-10">
            <img src={Logo} alt="logo" width={300} />
            <div className="text-4xl">
              Please sign in to view your favorite articles
            </div>
            <div className="flex items-center justify-center space-x-5">
              <Link to="/home">
                <button className="border-2 border-cyan-500 text-cyan-500 px-8 rounded-md text-2xl hover:text-white hover:bg-cyan-500 ease-in-out transition-all duration-300">
                  Home
                </button>
              </Link>
              <Link to="/login">
                <button className="border-2 border-cyan-500 bg-cyan-500 px-8 rounded-md text-white text-2xl hover:opacity-90 hover:bg-white hover:text-cyan-500 ease-in-out transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
