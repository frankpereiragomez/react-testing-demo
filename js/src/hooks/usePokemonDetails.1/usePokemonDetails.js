import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pokemonServices from "../../services/pokemonServices";

const usePokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

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
