import type { Ability } from "./poke";

export interface PokemonBase {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  results: PokemonBase[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
      
    };
  }[];
  weight: number;
  abilities: Ability[];
  height: number;
  base_experience: number;
}

