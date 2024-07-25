import { Outlet } from "react-router-dom";
import "./style.css";
import React from "react";

const App = (): React.ReactElement => {
  return (
    <>
      <main>
        <h1>Pokémon App</h1>
        <Outlet />
      </main>
    </>
  );
};

export default App;
