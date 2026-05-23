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
    <div>
      <Link replace={false} to="/">Volver</Link>
      <hr />
      <h1 style={{ textAlign: 'center' }}> DETALLES POKEMON</h1>
      <h2 style={{ color: '#fff0fa', backgroundColor: '#ae3b8b', textAlign: 'center' }}> {pokemon.name.toUpperCase()} </h2>

      <div style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', padding: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ae3b8b', borderBottom: '1px solid #e0b3e6', paddingBottom: '5px' }}>Poke Imagen</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '250px', height: '250px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '-20px' }}>
            {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} style={{ width: '100px' }} alt="espalda" />}
            {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} style={{ width: '100px' }} alt="shiny" />}
          </div>
        </div>

        <div style={{ width: '280px', textAlign: 'left', padding: '20px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: '#fff0fa' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ae3b8b', borderBottom: '1px solid #e0b3e6', paddingBottom: '5px' }}>Poke Datos</h3>
          <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Experiencia Base:</strong> {pokemon.base_experience}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability?.name.replace('-', ' ')).join(', ')}</p>
          <p><strong>Forma estandar?:</strong> {pokemon.is_default ? "Original" : "Variante regional"}</p>
          <p><strong>Especie Base:</strong> {pokemon.forms.map(f => f.name).join(', ')}</p>
        </div>

        <div style={{ width: '300px', textAlign: 'left', padding: '20px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: '#fff0fa' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ae3b8b', borderBottom: '1px solid #e0b3e6', paddingBottom: '5px' }}>Poke Estadisticas de Combate</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pokemon.stats.map((s, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', textTransform: 'capitalize' }}>
                  <strong>{s.stat.name.replace('-', ' ')}:</strong>
                  <span>{s.base_stat}</span>
                </div>
                <div style={{ background: '#fae1f7', height: '6px', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                  <div style={{ background: '#ae3b8b', height: '100%', width: `${Math.min((s.base_stat / 150) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: '320px', textAlign: 'left', padding: '20px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: '#fff0fa' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#ae3b8b', borderBottom: '1px solid #e0b3e6', paddingBottom: '5px' }}>Poke Movimientos</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '15px' }}>
            {pokemon.moves.slice(0, 6).map((m, index) => (
              <span key={index} style={{ background: '#ae3b8b', color: '#fff', fontSize: '0.75em', padding: '6px 8px', borderRadius: '7px', textTransform: 'capitalize' }}>
                {m.move.name.replace('-', ' ')}
              </span>
            ))}
          </div>

          <h3 style={{ margin: '0 0 5px 0', color: '#ae3b8b', fontSize: '1em' }}>Debuts en Videojuegos</h3>
          <p style={{ fontSize: '0.85em', margin: '0 0 5px 0'}}>Aparece indexado en las versiones:</p>
          <div style={{ fontSize: '0.8em',  maxHeight: '50px', background: '#fff', padding: '5px', borderRadius: '4px' }}>
            {pokemon.game_indices.length > 0
              ? pokemon.game_indices.map(g => g.version.name).join(', ')
              : 'Ninguno registrado'}
          </div>

          <h3 style={{ margin: '10px 0 5px 0', color: '#ae3b8b', fontSize: '1em' }}>Objetos Salvajes Equipados</h3>
          <p style={{ fontSize: '0.85em', margin: '0' }}>
            {pokemon.held_items.length > 0
              ? pokemon.held_items.map(h => h.item.name.replace('-', ' ')).join(', ')
              : 'No suele llevar objetos encima.'}
          </p>
        </div>

      </div>
    </div>
  );
}