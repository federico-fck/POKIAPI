export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  const getStat = (name) =>
    pokemon.stats.find(stat => stat.stat.name === name)?.base_stat;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 relative shadow-xl">
        <button
          className="absolute top-2 right-3 text-red-500 text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold capitalize text-center mb-4">
          {pokemon.name}
        </h2>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto mb-4"
        />

        <ul className="space-y-1">
          <li>❤️ HP: {getStat("hp")}</li>
          <li>⚔ Ataque: {getStat("attack")}</li>
          <li>🛡 Defensa: {getStat("defense")}</li>
          <li>⚡ Velocidad: {getStat("speed")}</li>
          <li>📏 Altura: {pokemon.height}</li>
          <li>⚖ Peso: {pokemon.weight}</li>
        </ul>
      </div>
    </div>
  );
}
