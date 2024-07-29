import "./style.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import usePokemons from "../../hooks/usePokemons/usePokemons";

const PokemonList = () => {
  const { pokemons, error } = usePokemons();

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="pokemon-list">
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <PokemonCard
                image={pokemon.sprites.other["official-artwork"].front_default}
                name={pokemon.name}
                id={pokemon.id}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PokemonList;
