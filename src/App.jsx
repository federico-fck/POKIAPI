import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import TeamPanel from "./components/TeamPanel";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [team, setTeam] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const addToTeam = async (name) => {
    if (team.length >= 6) {
      alert("Máximo 6 Pokémon permitidos");
      return;
    }

    if (team.find(p => p.name === name)) {
      alert("Este Pokémon ya está en el equipo");
      return;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setTeam([...team, data]);
  };

  const removeFromTeam = (name) => {
    setTeam(team.filter(p => p.name !== name));
  };

  const openModal = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    setSelected(data);
  };

  const filtered = pokemons.filter(p =>
    p.name.includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        ⚔ Battle Team Builder ⚔
      </h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="border p-3 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TeamPanel team={team} removeFromTeam={removeFromTeam} />

      {loading ? (
        <p className="text-center mt-6">Cargando Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {filtered.map(p => (
            <PokemonCard
              key={p.name}
              pokemon={p}
              onAdd={addToTeam}
              onDetail={openModal}
            />
          ))}
        </div>
      )}

      <PokemonModal pokemon={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
