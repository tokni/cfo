import React, { useContext } from "react";
import Context from "../../Context/Context";

const Home = () => {
  const [state, dispatch] = useContext(Context);

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
