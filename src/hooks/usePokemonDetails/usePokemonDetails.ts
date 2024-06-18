import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonStructure } from "../../types";

interface usePokemonDetailsStructure {
  pokemonDetails: PokemonStructure | null;
  error: string | null;
}

const usePokemonDetails = (): usePokemonDetailsStructure => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonStructure | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();

        setPokemonDetails(data);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchPokemonDetails();
  }, [apiUrl, id]);

  return { pokemonDetails, error };
};

export default usePokemonDetails;
