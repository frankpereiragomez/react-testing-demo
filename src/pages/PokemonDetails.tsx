import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { PokemonStructure } from "../types";

const PokemonDetails = (): React.ReactElement => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonStructure>();
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fail fetching the data from the api");
        }

        return response.json();
      })
      .then((details) => {
        setError(null);
        setPokemonDetails(details);
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  }, [apiUrl, id]);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <article>
          <img
            src={
              pokemonDetails?.sprites.other["official-artwork"].front_default
            }
            alt={pokemonDetails?.name}
          />
          <h2>{pokemonDetails?.name.toUpperCase()}</h2>
          <div>
            <p>{`weight: ${pokemonDetails?.weight}`}</p>
            <p>{`height: ${pokemonDetails?.height}`}</p>
          </div>
          <ul>
            {pokemonDetails?.moves.slice(0, 4).map((setOfMoves) => (
              <li key={setOfMoves.move.name}>{setOfMoves.move.name}</li>
            ))}
          </ul>
        </article>
      )}
    </>
  );
};

export default PokemonDetails;
