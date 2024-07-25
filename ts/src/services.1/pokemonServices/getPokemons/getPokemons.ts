import { ApiMainResponse, ApiResponse, PokemonStructure } from "../../../types";

const apiUrl = import.meta.env.VITE_API_URL;

const getPokemons = async (): Promise<PokemonStructure[]> => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data: ApiMainResponse = await response.json();

  const { results } = data;

  const promisesResult = results.map((pokemon: ApiResponse) => {
    return fetch(pokemon.url).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json() as Promise<PokemonStructure>;
    });
  });

  const pokemonsData = await Promise.all(promisesResult);

  return pokemonsData;
};

export default getPokemons;
