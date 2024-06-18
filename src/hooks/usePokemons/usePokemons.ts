import { useEffect, useState } from "react";
import { ApiResponse, PokemonStructure } from "../../types";

interface usePokemonsStructure {
  pokemons: PokemonStructure[];
  error: string | null;
}

const usePokemons = (): usePokemonsStructure => {
  const [pokemons, setPokemons] = useState<PokemonStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        const { results } = data;

        const promisesResult = results.map((pokemon: ApiResponse) => {
          return fetch(pokemon.url).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            return response.json();
          });
        });

        const pokemonsData = await Promise.all(promisesResult);

        setPokemons(pokemonsData);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchPokemons();
  }, [apiUrl]);

  return { pokemons, error };
};

export default usePokemons;
