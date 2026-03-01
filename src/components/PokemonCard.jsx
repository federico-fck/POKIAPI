export default function PokemonCard({ pokemon, onAdd, onDetail }) {
  const id = pokemon.url.split("/")[6];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center hover:scale-105 transition">
      <img src={image} alt={pokemon.name} className="mx-auto" />
      <h2 className="capitalize font-bold mt-2">{pokemon.name}</h2>

      <div className="flex justify-center gap-2 mt-3">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onDetail(pokemon.name)}
        >
          Ver
        </button>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => onAdd(pokemon.name)}
        >
          + Equipo
        </button>
      </div>
    </div>
  );
}
