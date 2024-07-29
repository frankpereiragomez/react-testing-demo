import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";

import PokemonList from "./PokemonList";
import { pokemonsMock } from "../../mocks/pokemonsMock";
import { server } from "../../mocks/node";
import { errorHandlers } from "../../mocks/handlers";

describe("Given a PokemonList component", () => {
  describe("When it's rendered", () => {
    test("Then it should show a list of six pokemons card", async () => {
      render(<PokemonList />, { wrapper: MemoryRouter });

      const pokemonCards = await waitFor(() => screen.getAllByRole("listitem"));

      pokemonsMock.forEach((pokemon) => {
        const pokemonName = screen.getByRole("heading", {
          name: pokemon.name,
          level: 2,
        });

        expect(pokemonName).toBeInTheDocument();
      });

      expect(pokemonCards).toHaveLength(6);
    });
  });

  describe("When it's rendered and fail getting the pokemon data with a system error", () => {
    test("Then it should show the 'A system error occurred: Failed to fetch' error message", async () => {
      server.use(...errorHandlers);

      const expectedErrorMessage = "A system error occurred: Failed to fetch";

      render(<PokemonList />, { wrapper: MemoryRouter });

      const errorMessage = await waitFor(() =>
        screen.getByText(expectedErrorMessage)
      );

      expect(errorMessage).toBeInTheDocument();
    });
  });
});
