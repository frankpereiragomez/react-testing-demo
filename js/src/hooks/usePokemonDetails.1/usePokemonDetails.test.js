import { renderHook, waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";

import usePokemonDetails from "./usePokemonDetails";
import { pokemonsMock } from "../../mocks/pokemonsMock";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(useParams).mockReturnValue({ id: "4" });
});

describe("Given a usePokemonDetails custom hook", () => {
  describe("When it's called", () => {
    test("Then it should return an object with an error and pokemonDetails props setting to null", () => {
      const { result } = renderHook(() => usePokemonDetails());

      expect(result.current.error).toBe(null);
      expect(result.current.pokemonDetails).toBe(null);
    });

    test("Then it should return an object with an error prop setting to null and the charmander details", async () => {
      const { result } = renderHook(() => usePokemonDetails());

      await waitFor(() => {
        expect(result.current.pokemonDetails).toStrictEqual;
        pokemonsMock[3];
      });
    });
  });
});
