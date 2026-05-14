import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPokemonWithDetails } from './services/pokemonService';
import type { PokemonDetail } from './types/pokemon';
import PokemonDetailView from './components/pokedetails';
import PokeCard from './components/PokeCard';

export default function App() {
  const [list, setList] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    getPokemonWithDetails(25)
      .then(data => setList(data))
      .catch(err => console.error("Error:", err))
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#ffe8fe', padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>POKEMONES</h1>
        <Routes>
          <Route path="/" element={<PokeCard list={list} />} />
          <Route path="/pokemon/:id" element={<PokemonDetailView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}