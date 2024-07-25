import { PokemonStructure } from "../../../types";

const apiUrl = import.meta.env.VITE_API_URL;

const getPokemonDetails = async (id: string) => {
  const response = await fetch(`${apiUrl}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data: PokemonStructure = await response.json();

  return data;
};

export default getPokemonDetails;
