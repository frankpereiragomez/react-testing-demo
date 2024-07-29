import { useEffect, useState } from "react";
import pokemonServices from "../../services/pokemonServices";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonsData = await pokemonServices.getPokemons();

        setPokemons(pokemonsData);

        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, error };
};

export default usePokemons;
