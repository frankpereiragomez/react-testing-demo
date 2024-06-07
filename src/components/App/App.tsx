import { Routes, Route } from "react-router-dom";
import "./style.css";
import PokemonList from "../PokemonList/PokemonList";
import PokemonDetails from "../../pages/PokemonDetails";

function App() {
  return (
    <>
      <main>
        <h1>Pokémon App</h1>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
