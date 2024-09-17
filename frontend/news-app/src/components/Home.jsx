import React, { Suspense, useEffect, useState } from "react";
import testData from "../data/testData.json";
import Navbar from "./navbar";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Home() {
  const [articles, setArticles] = useState([]); // Store all articles
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const [selectedCategory, setSelectedCategory] = useState("general"); // Default category

  // Function to fetch articles from api
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     try {
  //       // Fetch articles by category
  //       const response = await axios.get("http://localhost:5001/api/articles", {
  //         params: {
  //           category: selectedCategory,
  //         },
  //       });
  //       // console.log("pull articles by category:", selectedCategory); //confirm category selected
  //       const fetchedArticles = response.data.data;
  //       setArticles(fetchedArticles); // Store all articles
  //       setCurrentPage(1); // Reset current page to 1
  //     } catch (err) {
  //       console.error("Error fetching articles: ", err);
  //     }
  //   };

  //   fetchArticles(); // Fetch articles when component mounts or category changes
  // }, [selectedCategory]);

  // Function to fetch articles FROM TEST DATA FOR TESTING************
  useEffect(() => {
  const fetchArticlesTestData = async () => {
    try {
      setArticles(testData.data);
      setCurrentPage(1); // Reset current page to 1
    } catch (err) {
      console.error("Error fetching articles", err);
    }
  };
    fetchArticlesTestData();
  }, [selectedCategory]);

  // Get current articles
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Change page
  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(articles.length / articlesPerPage)
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category.toLowerCase());
  };

  // Data for categories
  const categoriesData = {
    categories: [
      "General",
      "Business",
      "Entertainment",
      "Health",
      "Science",
      "Sports",
      "Technology",
    ],
  };

  return (
    <div className="">
      <Navbar />
      {/* Display categories */}
      <div className="sticky top-28 z-30 flex justify-center items-center w-full bg-cyan-400 h-12 shadow-md">
        {categoriesData.categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`text-white text-sm mx-5 cursor-pointer hover:underline ${
            selectedCategory === category.toLowerCase() ? 'underline' : ''
      }`}          >
            {category}
          </div>
        ))}
      </div>

      {/* Display fetched articles */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center text-2xl h-screen w-full">
            Loading...
          </div>
        }
      >
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-20 mt-2 place-items-stretch">
          {currentArticles.map((article, index) => (
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
      </Suspense>
      {/* Pagination buttons*/}
      {currentArticles.length && (
        <div className="flex items-center justify-center mb-14 space-x-14">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="px-2 py-2 bg-cyan-500 text-white rounded-full "
          >
            <ChevronLeftIcon />
          </button>
          <div className="text-2xl font-bold">{currentPage}</div>
          <button
            onClick={() => handlePageChange("next")}
            disabled={
              currentPage >= Math.ceil(articles.length / articlesPerPage)
            }
            className="px-2 py-2 bg-cyan-500 text-white rounded-full "
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
