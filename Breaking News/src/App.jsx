import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/home";

function App() {
  const [category, setCategory] = useState("general");

  return (
    <>
      <Navbar setCategory={setCategory} />
      <Home category={category} />
    </>
  );
}

export default App;

