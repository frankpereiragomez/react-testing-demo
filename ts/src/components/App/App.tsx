import { Outlet } from "react-router-dom";
import "./style.css";

function App() {
  return (
    <>
      <main>
        <h1>Pokémon App</h1>
        <Outlet />
      </main>
    </>
  );
}

export default App;
