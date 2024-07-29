import { useState, useEffect } from "react";
import pokemonServices from "../../services/pokemonServices";

const usePokemonDetails = (id) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await pokemonServices.getPokemonDetails(id);

        setPokemonDetails(response);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemonDetails, error };
};

export default usePokemonDetails;
