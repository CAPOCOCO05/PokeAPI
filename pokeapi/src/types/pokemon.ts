export interface Pokemon {
  nombre: string;
  url: string;
}

export interface PokemonResponse {
  resultado: Pokemon[];
}

export interface PokemonSimpleDetails {
  id: number;
  nombre: string;
  imagen: string;
  types: string[];
}