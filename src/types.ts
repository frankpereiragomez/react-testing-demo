interface Ability {
  name: string;
  url: string;
}

interface Move {
  name: string;
  url: string;
}

interface MoveStructure {
  move: Move;
}

interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface ApiResponse {
  name: string;
  url: string;
}

export interface PokemonStructure {
  abilities: Ability[];
  height: number;
  id: number;
  moves: MoveStructure[];
  weight: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: OfficialArtwork;
    };
  };
}
