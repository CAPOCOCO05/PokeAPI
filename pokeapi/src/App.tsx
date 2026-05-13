import { useEffect, useState } from 'react';
import { getPokemonList } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';

function App() {
  const [list, setList] = useState<Pokemon[]>([]);

  useEffect(() => {
    getPokemonList(20).then(setList);
  }, []);

  return (
    <div>
      <h1>Pokédex Clase 1</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {list.map((p) => (
          <div key={p.nombre} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p>{p.nombre.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;