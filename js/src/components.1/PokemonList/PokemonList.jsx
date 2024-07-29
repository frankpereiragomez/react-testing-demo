import { useEffect, useState } from "react";
import "./style.css";

import PokemonCard from "../PokemonCard/PokemonCard";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        return response.json();
      })
      .then((data) => {
        const { results } = data;
        const promisesResult = results.map((pokemon) => {
          return fetch(pokemon.url)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              return response.json();
            })
            .catch((error) => {
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
        setError(error.message);
      });
  }, [apiUrl]);

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
