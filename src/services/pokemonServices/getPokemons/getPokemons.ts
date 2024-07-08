import { ClientError, ServerError, SystemError } from "../../../errors";
import { ApiMainResponse, ApiResponse, PokemonStructure } from "../../../types";

const apiUrl = import.meta.env.VITE_API_URL;

const getPokemons = async (): Promise<PokemonStructure[]> => {
  let response;

  try {
    response = await fetch(apiUrl);
  } catch (error) {
    throw new SystemError(
      "A system error occurred: " + (error as Error).message
    );
  }

  if (!response.ok) {
    if (response.status < 500) {
      throw new ClientError("Client error occurred while fetching");
    } else {
      throw new ServerError("Server error ocurred while fetching");
    }
  }

  let data;

  try {
    data = (await response.json()) as ApiMainResponse;
  } catch (error) {
    throw new SystemError((error as Error).message);
  }

  const { results } = data;

  const promisesResult = results.map((pokemon: ApiResponse) => {
    return fetch(pokemon.url)
      .then((response) => {
        if (!response.ok) {
          if (response.status < 500) {
            throw new ClientError("Client error occurred while fetching");
          } else {
            throw new ServerError("Server error ocurred while fetching");
          }
        }
        //TODO
        // error handling in case of parse failure
        return response.json() as Promise<PokemonStructure>;
      })
      .catch((error) => {
        throw new SystemError(
          "A system error occurred: " + (error as Error).message
        );
      });
  });

  try {
    const pokemonsData = await Promise.all(promisesResult);

    return pokemonsData;
  } catch (error) {
    throw new SystemError(
      `A system error occurred while fetching all Pokemons ${
        (error as Error).message
      }`
    );
  }
};

export default getPokemons;
