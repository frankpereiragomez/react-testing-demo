import { http, HttpResponse } from "msw";
import { pokemonsMock } from "./pokemonsMock";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}/`, () => {
    return HttpResponse.json({ results: pokemonsMock });
  }),

  http.get(`${apiUrl}/:id`, ({ params }) => {
    const { id } = params;

    const selectedPokemon = pokemonsMock.find(
      (pokemon) => pokemon.id.toString() === id
    );

    return HttpResponse.json(selectedPokemon);
  }),
];
