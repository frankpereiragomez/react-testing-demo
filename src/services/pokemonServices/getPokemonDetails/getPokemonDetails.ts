import { ClientError, ServerError, SystemError } from "../../../errors";
import { PokemonStructure } from "../../../types";

const apiUrl = import.meta.env.VITE_API_URL;

const getPokemonDetails = async (id: string): Promise<PokemonStructure> => {
  let response;

  try {
    response = await fetch(`${apiUrl}/${id}`);
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

  try {
    const data = (await response.json()) as PokemonStructure;

    return data;
  } catch (error) {
    throw new SystemError((error as Error).message);
  }
};

export default getPokemonDetails;
