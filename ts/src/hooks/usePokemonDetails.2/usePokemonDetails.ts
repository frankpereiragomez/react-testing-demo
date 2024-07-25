import { useState, useEffect } from "react";
import { PokemonStructure } from "../../types";
import pokemonServices from "../../services/pokemonServices";

interface usePokemonDetailsStructure {
  pokemonDetails: PokemonStructure | null;
  error: string | null;
}

const usePokemonDetails = (id: string): usePokemonDetailsStructure => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonStructure | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await pokemonServices.getPokemonDetails(id as string);

        setPokemonDetails(response);
        setError(null);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemonDetails, error };
};

export default usePokemonDetails;
