import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { pokemonsMock } from "../../mocks/pokemonsMock";
import PokemonCard from "./PokemonCard";

describe("Given a PokemonCard component", () => {
  describe("When it's rendered", () => {
    test("Then it should show the pokemon's name and image", () => {
      const { id: pokemonId, name: pokemonName } = pokemonsMock[0];

      const { front_default: pokemonImage } =
        pokemonsMock[0].sprites.other["official-artwork"];

      render(
        <PokemonCard id={pokemonId} name={pokemonName} img={pokemonImage} />,
        { wrapper: BrowserRouter }
      );

      const expectedName = screen.getByRole("heading", {
        name: pokemonName,
        level: 2,
      });

      const expectedImage = screen.getByAltText(pokemonName);

      screen.debug();

      expect(expectedName).toBeInTheDocument();
      expect(expectedImage).toBeInTheDocument();
    });
  });
  describe("When its rendered and the user click on the pokemon image", () => {
    test("Then it should ");
  });
});
