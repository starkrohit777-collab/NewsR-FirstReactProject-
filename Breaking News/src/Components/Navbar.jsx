import React from "react";

export default function Navbar({ setCategory }) {
  const categories = [
    "General",
    "Technology",
    "Sports",
    "Business",
    "Entertainment",
    "Science",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <a className="navbar-brand fw-bold" href="/">
          📰 NewsR
        </a>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {categories.map((category) => (
              <li className="nav-item" key={category}>
                <button
                  className="nav-link btn btn-link text-capitalize"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}

          </ul>
        </div>

      </div>
    </nav>
  );
}

