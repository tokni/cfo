import React from "react";

const Home = () => {
  return (
    <header>
      <div>
        <h1>
          Hello mr.{" "}
          {localStorage.getItem("accessToken")
            ? localStorage.getItem("accessToken")
            : "tú"}
        </h1>
        <p>Bergur & Kristmund</p>
      </div>
    </header>
  );
};

export default Home;
