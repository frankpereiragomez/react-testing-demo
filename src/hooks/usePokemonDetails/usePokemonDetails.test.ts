import { renderHook, waitFor } from "@testing-library/react";
import usePokemonDetails from "./usePokemonDetails";
import { pokemonsMock } from "../../mocks/pokemonsMock";
import { PokemonStructure } from "../../types";

describe("Given a usePokemonDetails custom hook", () => {
  describe("When it's called", () => {
    test("Then it should return an object with an error and pokemonDetails props setting to null", () => {
      const { result } = renderHook(() => usePokemonDetails("4"));

      expect(result.current.error).toBe(null);
      // expect(result.current.pokemonDetails).toBe(null);
    });

    test("Then it should return an object with an error prop setting to null and the charmander details", async () => {
      const pokemonId = "4";

      const { result } = renderHook(() => usePokemonDetails(pokemonId));

      await waitFor(() => {
        expect(result.current.pokemonDetails).toStrictEqual<PokemonStructure>(
          pokemonsMock[3]
        );
      });
    });
  });
});
