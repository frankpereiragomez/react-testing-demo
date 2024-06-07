interface Ability {
  name: string;
  url: string;
}

interface Move {
  name: string;
  url: string;
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
  moves: [
    {
      move: Move;
    }
  ];
  weight: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: OfficialArtwork;
    };
  };
}
