import React from "react";

export default function NewsCard({ article }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="news-card">

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

      <div className="news-card-body">

        <span className="news-category">
          {article.category || "News"}
        </span>

        <h3 className="news-title">
          {article.title || "No title available"}
        </h3>

        <p className="news-description">
          {article.description ||
            "No description available."}
        </p>

        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read More →
          </a>
        )}

      </div>

    </article>
  );
}

