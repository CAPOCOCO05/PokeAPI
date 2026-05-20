import axios from 'axios';
import type { PokemonListResponse } from '../types/pokemon';
import type { PokemonInterface } from '../types/poke';

const API_URL = 'https://pokeapi.co/api/v2';

export const PokemonConDetalles = async (limit: number = 20) => {
  const response = await axios.get<PokemonListResponse>(`${API_URL}/pokemon?limit=${limit}`);
  
  const detailPromises = response.data.results.map(pokemon => 
    axios.get<PokemonInterface>(pokemon.url)
  );
  const detailsResponses = await Promise.all(detailPromises);
  
  return detailsResponses.map(res => res.data);
};

export const TiposDePokemones = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type');
  return response.data.results; 
};


