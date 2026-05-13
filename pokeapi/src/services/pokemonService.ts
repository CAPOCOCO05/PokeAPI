import axios from 'axios';
import type { PokemonResponse } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit: number = 20) => {
  const response = await axios.get<PokemonResponse>(`${API_URL}/pokemon?limit=${limit}`);
  return response.data.resultado;
};