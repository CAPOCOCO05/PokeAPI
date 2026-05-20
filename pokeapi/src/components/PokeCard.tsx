import { Link } from "react-router-dom";
import type { PokemonInterface } from "../types/poke";
import { useEffect, useState } from "react";

export default function PokeCard({ list }: { list: PokemonInterface[] }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('pokedex_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (id: number) => {
    let updatedFavorites: number[];

    if (favorites.includes(id)) {
      // quitar favorito
      updatedFavorites = favorites.filter(favId => favId !== id);
    } else {
      // agregar favorito
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('pokedex_favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
      {list.map((pokemon) => (
        <div key={pokemon.id} style={{ backgroundColor: '#fdf0fd', border: '2px solid #f5b1ef', borderRadius: '10px', textAlign: 'center', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => toggleFavorite(pokemon.id)}   style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px'}}>
              {favorites.includes(pokemon.id) ? '🩷' : '🤍'}
            </button>
          </div>
          
          <p>#{pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <Link to={`/pokemon/${pokemon.id}`}>
            <button style={{ backgroundColor: '#ffb8f3d2', borderRadius: '4px' }}>Detalles</button>
          </Link>
        </div>
      ))}
    </div>
  );
}