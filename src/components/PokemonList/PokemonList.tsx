import { useEffect, useState } from "react";
import "./style.css";
import { ApiResponse, PokemonStructure } from "../../types";
import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonList = (): React.ReactElement => {
  const [pokemons, setPokemons] = useState<PokemonStructure[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fail fetching the data");
        }

        return response.json();
      })
      .then((data) => {
        const { results } = data;
        const promisesResult = results.map((pokemon: ApiResponse) => {
          return fetch(pokemon.url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              return response.json();
            })
            .catch((error) => {
              console.error(error);
              throw error;
            });
        });

        return Promise.all(promisesResult);
      })
      .then((pokemonsData) => {
        setPokemons(pokemonsData);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch Pokémon data. Please try again later.");
      });
  }, []);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul className="pokemon-list">
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <PokemonCard
                img={pokemon.sprites.other["official-artwork"].front_default}
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
