import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { pokemonsMock } from "../../mocks/pokemonsMock";
import PokemonCard from "./PokemonCard";

import wrapWithRouter from "../../utils/testUtils";
import PokemonDetails from "../../pages/PokemonDetailsPage/PokemonDetails";

describe("Given a PokemonCard component", () => {
  const { id: pokemonId, name: pokemonName } = pokemonsMock[0];

  const { front_default: pokemonImage } =
    pokemonsMock[0].sprites.other["official-artwork"];

  describe("When it's rendered", () => {
    test("Then it should show the pokemon's name and image", () => {
      render(
        <PokemonCard id={pokemonId} name={pokemonName} image={pokemonImage} />,
        { wrapper: MemoryRouter }
      );

      const expectedName = screen.getByRole("heading", {
        name: pokemonName,
        level: 2,
      });

      const expectedImage = screen.getByAltText(pokemonName);

      expect(expectedName).toBeInTheDocument();
      expect(expectedImage).toBeInTheDocument();
    });
  });

  describe("When its rendered and the user clicks on the pokemon image", () => {
    test("Then it should navigate to the pokemon details page and show the pokemon name to upper case", async () => {
      const detailPokemonName = pokemonName.toUpperCase();

      const routes = [
        {
          path: "/",
          element: (
            <PokemonCard
              id={pokemonId}
              image={pokemonImage}
              name={pokemonName}
            />
          ),
        },
        { path: "/pokemon/:id", element: <PokemonDetails /> },
      ];

      const { router, element } = wrapWithRouter(routes);

      render(element);

      const pokemonImageElement = screen.getByAltText(pokemonName);

      await userEvent.click(pokemonImageElement);

      const expectedPokemonName = screen.getByRole("heading", {
        name: detailPokemonName,
        level: 2,
      });

      expect(router.state.location.pathname).toBe(`/pokemon/${pokemonId}`);
      expect(expectedPokemonName).toBeInTheDocument();
    });
  });
});
