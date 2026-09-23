import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Home";
import ArticleDetails from "./Components/pages/ArticleDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Category Routes */}
        <Route
          path="/category/:category"
          element={<Home />}
        />

        {/* Dynamic Article Route */}
        <Route
          path="/article/:id"
          element={<ArticleDetails />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;