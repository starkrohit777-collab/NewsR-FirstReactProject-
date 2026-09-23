import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ article }) {

  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";

  const articleId = article.id || encodeURIComponent(article.url);

  const handleArticleClick = () => {

    sessionStorage.setItem(
      `news-${articleId}`,
      JSON.stringify(article)
    );

  };

  return (
    <article className="news-card">

      {/* Image */}
      <div className="news-image-container">

        <img
          src={article.image || fallbackImage}
          alt={article.title || "News"}
          className="news-image"

          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />

      </div>

      {/* Body */}
      <div className="news-card-body">

        <span className="news-category">
          {article.category || "News"}
        </span>

        <h3 className="news-title">
          {article.title || "No title available"}
        </h3>

        <p className="news-description">
          {article.description || "No description available."}
        </p>

        <Link
          to={`/article/${articleId}`}
          state={{ article }}
          onClick={handleArticleClick}
          className="read-more"
        >
          Read Full Story →
        </Link>

      </div>

    </article>
  );
}