import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonStructure } from "../../types";
import pokemonServices from "../../services/pokemonServices";

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
