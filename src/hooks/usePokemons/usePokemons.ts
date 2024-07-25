import { useEffect, useState } from "react";
import { PokemonStructure } from "../../types";
import pokemonServices from "../../services/pokemonServices";

interface usePokemonsStructure {
  pokemons: PokemonStructure[];
  error: string | null;
}

const usePokemons = (): usePokemonsStructure => {
  const [pokemons, setPokemons] = useState<PokemonStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const pokemonsData = await pokemonServices.getPokemons();

        setPokemons(pokemonsData);

        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, error };
};

export default usePokemons;
