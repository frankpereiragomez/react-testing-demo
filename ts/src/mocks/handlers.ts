import { http, HttpResponse } from "msw";
import { pokemonsMock } from "./pokemonsMock";

const apiUrl = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${apiUrl}`, () => {
    const results = pokemonsMock.map((pokemon) => ({
      name: pokemon.name,
      url: `${apiUrl}/${pokemon.id}`,
    }));

    return HttpResponse.json({
      results,
    });
  }),

  http.get(`${apiUrl}/:id`, ({ params }) => {
    const { id } = params;

    const selectedPokemon = pokemonsMock.find(
      (pokemon) => pokemon.id.toString() === id
    );

    return HttpResponse.json(selectedPokemon);
  }),
];

export const errorHandlers = [
  http.get(apiUrl, () => {
    return HttpResponse.error();
  }),

  http.get(`${apiUrl}/:id`, ({ params }) => {
    const { id } = params;

    const selectedPokemon = pokemonsMock.find(
      (pokemon) => pokemon.id.toString() === id
    );

    if (!selectedPokemon) {
      return HttpResponse.error();
    }
  }),
];
