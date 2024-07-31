import React from "react";
import SearchBar from "./components/SearchBar";
const Home = () => {
  return (
    <div>
      <header>
        <title>Tutti Gelatto Inventory</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </header>
      <SearchBar />
    </div>
  );
};

export default Home;
