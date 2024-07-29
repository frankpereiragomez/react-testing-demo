import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import wrapWithRouter from "../utils/testUtils";
import PokemonDetails from "./PokemonDetails";
import { pokemonsMock } from "../mocks/pokemonsMock";
import { server } from "../mocks/node";
import { errorHandlers } from "../mocks/handlers";

describe("Given a PokemonDetails component", () => {
  const route = [
    {
      path: "/pokemon/:id",
      element: <PokemonDetails />,
    },
  ];

  describe("When it's rendered", () => {
    test("Then it should show the pokemon details", async () => {
      const { name: pokemonName } = pokemonsMock[0];
      const pokemonWeight = pokemonsMock[0].weight;
      const pokemonHeight = pokemonsMock[0].height;

      const { element } = wrapWithRouter(route, ["/pokemon/1"]);

      render(element);

      const heading = await waitFor(() =>
        screen.getByRole("heading", {
          name: pokemonName.toUpperCase(),
          level: 2,
        })
      );

      const expectedImage = screen.getByAltText(pokemonName);
      const expectedWeight = screen.getByText(`weight: ${pokemonWeight}`);
      const expectedHeight = screen.getByText(`height: ${pokemonHeight}`);

      expect(heading).toBeInTheDocument();
      expect(expectedImage).toBeInTheDocument();
      expect(expectedWeight).toBeInTheDocument();
      expect(expectedHeight).toBeInTheDocument();
    });
  });

  describe("When it's rendered with an id that does not exist", () => {
    test("Then it should show the a client error occurred: 'Client error occurred while fetching' error message", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedErrorMessage = "Client error occurred while fetching";

      const { element } = wrapWithRouter(route, ["/pokemon/12"]);

      render(element);

      const errorMessage = await waitFor(() =>
        screen.getByText(expectedErrorMessage)
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("When it's rendered and a system error ocurred", () => {
    test("Then it should show the a 'A system error occurred: Failed to fetch' error message", async () => {
      server.resetHandlers(...errorHandlers);

      const expectedErrorMessage = "A system error occurred: Failed to fetch";

      const { element } = wrapWithRouter(route, ["/pokemon/1"]);

      render(element);

      const errorMessage = await waitFor(() =>
        screen.getByText(expectedErrorMessage)
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
