import axios from 'axios';
import type { PokemonDetail, PokemonListResponse } from '../types/pokemon';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonWithDetails = async (limit: number = 20) => {
  const response = await axios.get<PokemonListResponse>(`${API_URL}/pokemon?limit=${limit}`);
  
  const detailPromises = response.data.results.map(pokemon => 
    axios.get<PokemonDetail>(pokemon.url)
  );
  const detailsResponses = await Promise.all(detailPromises);
  
  return detailsResponses.map(res => res.data);
};

