import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { PokemonInterface } from './types/poke';

import { PokemonConDetalles } from './services/pokemonService';
import { PokeList } from './pages/PokeList';
import PokeDetalles from './components/PokeDetalles';

export default function App() {
  const [list, setList] = useState<PokemonInterface[]>([]);

  useEffect(() => {
    PokemonConDetalles(50) // cant pokemon a cargar
      .then(data => setList(data))
      .catch(err => console.error("Error al cargar los pokemones:", err))
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#ffe8fe', padding: '20px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<PokeList list={list} />} />
          <Route path="/pokemon/:id" element={<PokeDetalles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}