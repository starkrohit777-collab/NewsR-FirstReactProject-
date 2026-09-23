import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../NewsCard";

export default function Home() {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔎 Search
  const [search, setSearch] = useState("");

  const fetchNews = async (searchQuery = "") => {
    try {
      setLoading(true);
      setError("");

      const API_KEY = import.meta.env.VITE_CURRENTS_API_KEY;

      if (!API_KEY) {
        throw new Error("API key not found");
      }

      let url;

      // 🔎 SEARCH API
      if (searchQuery.trim()) {
        url = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(
          searchQuery
        )}&language=en`;
      }

      // 📰 NORMAL LATEST NEWS API
      else {
        url = category
          ? `https://api.currentsapi.services/v1/latest-news?language=en&category=${encodeURIComponent(
              category
            )}`
          : `https://api.currentsapi.services/v1/latest-news?language=en`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Data:", data);

      if (Array.isArray(data.news)) {
        setNews(data.news);
      } else {
        setNews([]);
      }
    } catch (err) {
      console.error("News fetch error:", err);

      setNews([]);
      setError(
        "News load nahi ho paayi. Please thodi der baad try karo."
      );
    } finally {
      setLoading(false);
    }
  };

  // Category change hone par latest news fetch
  useEffect(() => {
    setSearch("");
    fetchNews();
  }, [category]);

  // 🔎 Search submit
  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      fetchNews(search.trim());
    } else {
      fetchNews();
    }
  };

  // ❌ Search clear
  const handleClearSearch = () => {
    setSearch("");
    fetchNews();
  };

  return (
    <>
      <main className="container my-4">

        {/* Heading + Search */}
        <div className="news-heading-row">

          <h2 className="text-center mb-4">
            {search
              ? `Search Results for "${search}"`
              : `Latest ${category || "General"} News`}
          </h2>

          <form
            className="search-box"
            onSubmit={handleSearch}
          >

            <input
              type="text"
              className="search-input"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Clear Button */}
            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={handleClearSearch}
              >
                ✕
              </button>
            )}

            {/* Search Button */}
            <button
              className="search-button"
              type="submit"
            >
              🔍
            </button>

          </form>

        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-box text-center">

            <div className="spinner-border" role="status">
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p>Loading news...</p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-danger text-center">

            <p className="mb-3">
              {error}
            </p>

            <button
              className="btn btn-primary"
              onClick={() =>
                search ? fetchNews(search) : fetchNews()
              }
            >
              Try Again
            </button>

          </div>
        )}

        {/* News */}
        {!loading && !error && (
          <div className="news-grid">

            {news.length > 0 ? (

              news.map((article, index) => (

                <NewsCard
                  key={article.id || article.url || index}
                  article={article}
                />

              ))

            ) : (

              <p className="no-news">
                {search
                  ? `No news found for "${search}".`
                  : "No news found."}
              </p>

            )}

          </div>
        )}

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="news-footer">

        <div className="footer-content">

          <div className="footer-brand">

            <h3>NewsR</h3>

            <p>
              Stay informed. Stay ahead.
            </p>

          </div>

          <div className="footer-line"></div>

          <div className="footer-bottom">

            <p>
              © 2026 NewsR. All Rights Reserved.
            </p>

            <p>
              Powered by <span>Currents API</span>
            </p>

          </div>

        </div>

      </footer>

    </>
  );
}