import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import type { PokemonInterface } from '../types/poke';

export default function PokeDetalles() {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState<PokemonInterface | null>(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => setPokemon(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!pokemon) return <p>Carganding...</p>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Link replace={false} to="/">Volver</Link>
      <hr />
      <h1 style={{color: '#f057d6d2'}}> {pokemon.name.toUpperCase()} </h1>

      <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{  width: '200px' }} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> {pokemon.weight} </p>
        <p><strong>Altura:</strong> {pokemon.height}</p>
        <p><strong>Estadistica Base:</strong> {pokemon.base_experience}</p>
      </div>

      <h3>Habilidades</h3>
      <ul style={{textAlign: 'center', display: 'inline-block'}}>
        {pokemon.abilities.map((a, i) => <li key={i}>{a.ability?.name}</li>)}
      </ul>

    </div>
  );
}