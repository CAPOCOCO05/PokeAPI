
import { useEffect, useState } from 'react';
import type { PokemonInterface } from '../types/poke';
import { Link } from 'react-router-dom';
import { TiposDePokemones } from '../services/pokemonService';

interface ComparadorProps {
    list: PokemonInterface[];
}

export default function PokeComparador({ list }: ComparadorProps) {
    const [poke1, setPoke1] = useState<PokemonInterface | null>(null);
    const [poke2, setPoke2] = useState<PokemonInterface | null>(null);
    const [types, setTypes] = useState<{ name: string; url: string }[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [filteredNames, setFilteredNames] = useState<PokemonInterface[]>([]);

    useEffect(() => {
        TiposDePokemones()
            .then(data => setTypes(data))
            .catch(err => console.error("Error cargando tipos:", err));
    }, []);

    // pokemon segun tipo seleccionado
    useEffect(() => {
        if (selectedType === '') {
            setFilteredNames([]);
        } else {
            const result = list.filter(pokemon => 
                pokemon.types.some(t => t.type.name === selectedType)
            );
            setFilteredNames(result);
        }
    }, [selectedType, list]);

    const manejarSeleccionPokemon = (name: string) => {
        if (!name) return;
        const pokemonSeleccionado = list.find(p => p.name === name);
        if (!pokemonSeleccionado) return;

        if (!poke1) {
            localStorage.setItem('poke_comparar_1', JSON.stringify(pokemonSeleccionado));
            setPoke1(pokemonSeleccionado);
        } else if (!poke2 && poke1.id !== pokemonSeleccionado.id) {
            localStorage.setItem('poke_comparar_2', JSON.stringify(pokemonSeleccionado));
            setPoke2(pokemonSeleccionado);
        }
    };

    const limpiarComparacion = () => {
        filteredNames.length = 0;
        setSelectedType('');
        localStorage.removeItem('poke_comparar_1');
        localStorage.removeItem('poke_comparar_2');
        setPoke1(null);
        setPoke2(null);
    }

    return (
        <div>
            <Link to="/">Volver</Link>
            <hr />
            <h1 style={{ textAlign: 'center', color: '#333' }}>COMPARADOR POKEMON</h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px' }}>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '200px' }} >
                    <option value="">Selecciona un Tipo</option>
                    {types.map(t => ( <option key={t.name} value={t.name}>{t.name}</option> ))}
                </select>

                <select onChange={(e) => { manejarSeleccionPokemon(e.target.value); e.target.value = ""; }} 
                    disabled={selectedType === ''} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '200px' }}>
                    <option value="">{selectedType === '' ? 'Elige primero un tipo' : 'Selecciona el Pokemon'}</option>
                    {filteredNames.map(p => (<option key={p.id} value={p.name}>{p.name.toUpperCase()}</option >))}
                </select>
                
                <button onClick={limpiarComparacion} style={{ background: '#c265b2', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px' }}>
                        Limpiar
                </button>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start'}}>

                <div style={{ flex: 1, textAlign: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: poke1 ? '#fff0fa' : '#fafafa' }}>
                    {poke1 ? (
                        <>
                            <h2 style={{ textTransform: 'uppercase', color: '#f057d6d2' }}>{poke1.name}</h2>
                            <img src={poke1.sprites.front_default} alt={poke1.name} style={{ width: '150px' }} />
                            <p><strong>Tipos:</strong> {poke1.types.map(t => t.type.name).join(', ')}</p>
                            <p><strong>Peso:</strong> {poke1.weight}</p>
                            <p><strong>Altura:</strong> {poke1.height}</p>
                            <p><strong>Experiencia Base:</strong> {poke1.base_experience}</p>
                            <p><strong>Habilidades:</strong> {poke1.abilities.map(a => a.ability?.name).join(', ')}</p>
                        </>
                    ) : (
                        <p style={{ color: '#aaa'}}>Elije a tu <strong>primer</strong> Pokemon</p>
                    )}
                </div>

                <div style={{ alignSelf: 'center', textAlign: 'center', minWidth: '120px' }}>
                    <span style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#b93f9d' }}>VS</span>
                </div>

                <div style={{ flex: 1, textAlign: 'center', padding: '20px', border: '1px solid #eee', borderRadius: '10px', backgroundColor: poke2 ? '#fff0fa' : '#fafafa' }}>
                    {poke2 ? (
                        <>
                            <h2 style={{ textTransform: 'uppercase', color: '#f057d6d2' }}>{poke2.name}</h2>
                            <img src={poke2.sprites.front_default} alt={poke2.name} style={{ width: '150px' }} />
                            <p><strong>Tipos:</strong> {poke2.types.map(t => t.type.name).join(', ')}</p>
                            <p><strong>Peso:</strong> {poke2.weight}</p>
                            <p><strong>Altura:</strong> {poke2.height}</p>
                            <p><strong>Experiencia Base:</strong> {poke2.base_experience}</p>
                            <p><strong>Habilidades:</strong> {poke2.abilities.map(a => a.ability?.name).join(', ')}</p>
                        </>
                    ) : (
                        <p style={{ color: '#aaa'}}>Elije a tu <strong>segundo</strong> Pokemon</p>
                    )}
                </div>

            </div>
        </div>
    );
}