import usePokemonDetails from "../hooks/usePokemonDetails.1/usePokemonDetails";
import "./style.css";

const PokemonDetails = () => {
  const { pokemonDetails, error } = usePokemonDetails();

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
