import { renderHook, waitFor } from "@testing-library/react";
import { describe, test, expect } from "vitest";

import usePokemons from "./usePokemons";
import { pokemonsMock } from "../../mocks/pokemonsMock";

describe("Given a usePokemons custom hook", () => {
  describe("When it's called", () => {
    test("Then it should return an object with an error prop setting to null and an empty array", () => {
      const { result } = renderHook(() => usePokemons());

      expect(result.current.error).toBe(null);
      expect(result.current.pokemons).toStrictEqual([]);
    });

    test("Then it should return an object with an error prop setting to null and array with 6 pokemons", async () => {
      const { result } = renderHook(() => usePokemons());

      await waitFor(() => {
        expect(result.current.pokemons).toHaveLength(6);
        expect(result.current.pokemons).toStrictEqual(pokemonsMock);
      });
    });
  });
});
