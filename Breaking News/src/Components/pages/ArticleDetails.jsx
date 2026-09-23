import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ArticleDetails() {

  const { id } = useParams();
  const location = useLocation();

  const storedArticle = sessionStorage.getItem(`news-${id}`);

  const article =
    location.state?.article ||
    (storedArticle ? JSON.parse(storedArticle) : null);

  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";

  if (!article) {
    return (
      <main className="article-page">

        <div className="article-container">

          <h1>Article Not Found</h1>

          <p>
            This article is no longer available.
          </p>

          <Link
            to="/"
            className="article-back"
          >
            ← Back to News
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="article-page">

      <div className="article-container">

        {/* Back */}
        <Link
          to="/"
          className="article-back"
        >
          ← Back to News
        </Link>

        {/* Category */}
        <span className="article-category">
          {article.category || "News"}
        </span>

        {/* Title */}
        <h1 className="article-title">
          {article.title || "No title available"}
        </h1>

        {/* Image */}
        <img
          src={article.image || fallbackImage}
          alt={article.title || "News"}
          className="article-main-image"
        />

        {/* Description */}
        <p className="article-description">
          {article.description || "No description available."}
        </p>

        {/* Source Article */}
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="article-source"
          >
            Read Original Source →
          </a>
        )}

      </div>

    </main>
  );
}