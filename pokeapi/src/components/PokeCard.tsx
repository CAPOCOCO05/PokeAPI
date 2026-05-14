import { Link } from "react-router-dom";
import type { PokemonDetail } from "../types/pokemon";

export default function PokeCard({ list }: { list: PokemonDetail[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
      {list.map((pokemon) => (
        <div key={pokemon.id} style={{ backgroundColor: '#fdf0fd', border: '2px solid #f5b1ef', borderRadius: '10px', textAlign: 'center', padding: '10px' }}>
          <p>#{pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <Link to={`/pokemon/${pokemon.id}`}>
            <button style={{ backgroundColor: '#ffb8f3d2' }}>Detalles</button>
          </Link>
        </div>
      ))}
    </div>
  );
}