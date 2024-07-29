import { ClientError, ServerError, SystemError } from "../../../errors";

const apiUrl = import.meta.env.VITE_API_URL;

const getPokemons = async () => {
  let response;

  try {
    response = await fetch(apiUrl);
  } catch (error) {
    throw new SystemError("A system error occurred: " + error.message);
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
    data = await response.json();
  } catch (error) {
    throw new SystemError(error.message);
  }

  const { results } = data;

  const promisesResult = results.map(async (pokemon) => {
    let response;

    try {
      response = await fetch(pokemon.url);
    } catch (error) {
      throw new SystemError(`A system error occurred: ${error.message}`);
    }

    if (!response.ok) {
      if (response.status < 500) {
        throw new ClientError("Client error occurred while fetching");
      } else {
        throw new ServerError("Server error ocurred while fetching");
      }
    }

    try {
      const data = await response.json();

      return data;
    } catch (error) {
      throw new SystemError(
        `A system error occurred while parsing the response for ${pokemon.name}: ${error.message}`
      );
    }
  });

  try {
    const pokemonsData = await Promise.all(promisesResult);

    return pokemonsData;
  } catch (error) {
    throw new SystemError(
      `A system error occurred while fetching all Pokemons ${error.message}`
    );
  }
};

export default getPokemons;
