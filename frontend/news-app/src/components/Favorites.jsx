import React, { Suspense, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import FavoriteArticleCard from "./FavoriteArticleCard";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import Logo from "../assets/articleLogo.png";

function Favorites() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    try {
      const token = localStorage.getItem("accessToken"); //get token from local storage

      //send request to get favorite articles with the token in the header
      const response = await axios.get(
        "http://localhost:5001/api/articles/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      //log the response data for debugging
      //console.log(response.data.articles);
      setFavorites(response.data); //set favorite articles to state
    } catch (error) {
      console.log(error);
    }
  };

  //get favorite articles when the component mounts
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      {/* check if user is logged in then display favorite functionality */}
      {user ? (
        <>
          <Navbar />
          <Suspense
            fallback={
              <div className="flex items-center justify-center text-2xl h-screen w-full">
                Loading...
              </div>
            }
          >
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
          </Suspense>
        </>
      ) : (
        <>
          {/* if user is not logged remove favorite functionality */}
          <div className="flex flex-col items-center justify-center h-screen space-y-10">
            <img src={Logo} alt="logo" width={300} />
            <div className="text-2xl">
              Please sign in to view your favorite articles
            </div>
            <div className="flex items-center justify-center space-x-5">
              <Link to="/home">
                <button className="border-2 border-cyan-500 text-cyan-500 px-8 py-2 rounded-md text-2xl hover:text-white hover:bg-cyan-500 ease-in-out transition-all duration-300">
                  Home
                </button>
              </Link>
              <Link to="/login">
                <button className="border-2 border-cyan-500 bg-cyan-500 px-8 py-2 rounded-md text-white text-2xl hover:opacity-90 hover:bg-white hover:text-cyan-500 ease-in-out transition-all duration-300">
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
