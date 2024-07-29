import usePokemonDetails from "../../hooks/usePokemonDetails/usePokemonDetails";
import "../style.css";

import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const { pokemonDetails, error } = usePokemonDetails(id);

  return (
    <>
      {error ? (
        <p>{error.message}</p>
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
