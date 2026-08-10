import React, { useEffect, useState } from "react";
import NewsCard from "../NewsCard";

export default function Home({ category = "" }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const API_KEY = import.meta.env.VITE_CURRENTS_API_KEY;

      if (!API_KEY) {
        throw new Error("API key not found");
      }

      const url = category
        ? `https://api.currentsapi.services/v1/latest-news?language=en&category=${encodeURIComponent(
            category
          )}`
        : `https://api.currentsapi.services/v1/latest-news?language=en`;

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

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <main className="container my-4">

      <h2 className="text-center mb-4">
        Latest {category || "General"} News
      </h2>

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
          <p className="mb-3">{error}</p>

          <button
            className="btn btn-primary"
            onClick={fetchNews}
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
              No news found.
            </p>
          )}
        </div>
      )}

    </main>
  );
}

