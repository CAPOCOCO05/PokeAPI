import { useEffect, useState } from 'react';
import { getPokemonWithDetails } from './services/pokemonService';
import type { PokemonDetail } from './types/pokemon';

function App() {
  const [list, setList] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    getPokemonWithDetails(20)
      .then(data => setList(data))
      .catch(err => console.error("Error:", err))
  }, []);


  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>POKEMONES</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
        {list.map((pokemon) => (
          <div key={pokemon.id} style={{ border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', padding: '10px' }}>
            <p>#{pokemon.id}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <div>
              {pokemon.types.map(t => (
                <span key={t.type.name} style={{ margin: '0 5px', fontSize: '0.8em' }}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;