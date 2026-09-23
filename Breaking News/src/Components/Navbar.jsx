import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const categories = [
    "Technology",
    "Sports",
    "Business",
    "Entertainment",
    "Science",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          📰 NewsR
        </Link>

        {/* Mobile Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            {/* General */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
              >
                General
              </Link>
            </li>

            {/* Categories */}
            {categories.map((category) => (

              <li
                className="nav-item"
                key={category}
              >

                <Link
                  className="nav-link"
                  to={`/category/${category.toLowerCase()}`}
                >
                  {category}
                </Link>

              </li>

            ))}

          </ul>

        </div>

      </div>

    </nav>
  );
}