export default function TeamPanel({ team, removeFromTeam }) {
  const totalHP = team.reduce((acc, p) => acc + p.stats.find(s=>s.stat.name==="hp").base_stat, 0);
  const avgAttack = team.length
    ? Math.round(team.reduce((acc, p) =>
        acc + p.stats.find(s=>s.stat.name==="attack").base_stat, 0) / team.length)
    : 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <h2 className="font-bold text-lg mb-3">
        Equipo ({team.length}/6)
      </h2>

      {team.length === 0 && (
        <p className="text-gray-500">No hay Pokémon en el equipo</p>
      )}

      {team.map(p => (
        <div key={p.name} className="flex justify-between items-center border-b py-2">
          <span className="capitalize">{p.name}</span>
          <button
            className="text-red-500 font-semibold"
            onClick={() => removeFromTeam(p.name)}
          >
            Quitar
          </button>
        </div>
      ))}

      {team.length > 0 && (
        <div className="mt-3 text-sm">
          <p>❤️ HP total: {totalHP}</p>
          <p>⚔ Ataque promedio: {avgAttack}</p>
        </div>
      )}
    </div>
  );
}
