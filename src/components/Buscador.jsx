export default function Buscador({ busqueda, onBusqueda, filtro, onFiltro }) {
  return (
    <div className="buscador">
      <input
        type="search"
        placeholder="Buscar raza..."
        value={busqueda}
        onChange={(e) => onBusqueda(e.target.value)}
      />
      <select value={filtro} onChange={(e) => onFiltro(e.target.value)}>
        <option value="todas">Todas las razas</option>
        <option value="con">Con subrazas</option>
        <option value="sin">Sin subrazas</option>
      </select>
    </div>
  )
}
