import { useState, useEffect } from 'react';
import PokeCard from '../components/PokeCard';
import type { PokemonInterface } from '../types/poke';
import { TiposDePokemones } from '../services/pokemonService';

interface PokemonListProps {
  list: PokemonInterface[];
}

export const PokeList = ({ list }: PokemonListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayedPokemon, setDisplayedPokemon] = useState<PokemonInterface[]>(list);
  const [types, setTypes] = useState<{ name: string; url: string }[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    TiposDePokemones()
      .then(data => setTypes(data))
      .catch(err => console.error("Error cargando tipos:", err));
  }, []);

  useEffect(() => {
    let filtered = [...list];

    // filtro por tipo
    if (selectedType !== '') {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(t => t.type.name === selectedType)
      );
    }

    // segun el tipo se filtra por nombre
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayedPokemon(filtered);
  }, [searchTerm, selectedType, list]);

  return (
    <div>
        <h1 style={{ textAlign: 'center' }}>POKEMONES</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: '10px', width: '150px', borderRadius: '8px', border: '1px solid #ccc', margin: '0 10px' }} >

          <option value="">Filtrado por tipo</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <input 
          placeholder="Buscar Pokemon por nombre..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      {displayedPokemon.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666' }}>No se encontro al pokemon</p>
      )}
        
        <PokeCard list={displayedPokemon} />
      
    </div>
  );
};