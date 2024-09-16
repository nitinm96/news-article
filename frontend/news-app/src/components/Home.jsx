import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import testData from "../data/testData.json";
import Navbar from "./navbar";
import ArticleCard from "./ArticleCard";
function Home() {
  const { user, setUser, loading } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1); // For pagination
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     if (isLoading) return; // Avoid multiple requests
  //     setIsLoading(true);

  //     try {
  //       const response = await axios.get("http://localhost:5001/api/articles");
  //       const fetchedArticles = response.data.data;

  //       console.log(fetchedArticles);
  //       setArticles((prevArticles) => [...prevArticles, ...uniqueArticles]);
  //       setHasMore(fetchedArticles.length > 0); // Stop fetching if no more articles
  //       setIsLoading(false);
  //       console.log(response.data);
  //     } catch (err) {
  //       console.error("Error fetching articles", err);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchArticles();
  // }, [page]);

  // Handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    if (hasMore) setPage((prevPage) => prevPage + 1); // Increase page number
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles, isLoading, hasMore]);

  return (
    <div className="">
      <Navbar />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 place-items-stretch">
        {testData.data.map((article, index) => (
          <ArticleCard
            key={index}
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
        ))}
      </div>
    </div>
  );
}

export default Home;
