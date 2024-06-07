import { http, HttpResponse } from "msw";
import { pokemonsMock } from "./pokemonsMock";

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon/", () => {
    return HttpResponse.json({ results: pokemonsMock });
  }),

  http.get("https://pokeapi.co/api/v2/pokemon/:id", ({ params }) => {
    const { id } = params;

    const selectedPockemon = pokemonsMock.find(
      (pokemon) => id === pokemon.id.toString()
    );

    return HttpResponse.json(selectedPockemon);
  }),
];
