import { useEffect, useState } from 'react'
import { obtenerRazas } from '../services/dogApi.js'
import Tarjeta from '../components/Tarjeta.jsx'
import Buscador from '../components/Buscador.jsx'
import Cargando from '../components/Cargando.jsx'
import Mensaje from '../components/Mensaje.jsx'

const POR_PAGINA = 12

export default function Lista({ favoritos, alternarFavorito }) {
  const [razas, setRazas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('todas')
  const [visibles, setVisibles] = useState(POR_PAGINA)

  useEffect(() => {
    async function cargar() {
      try {
        setRazas(await obtenerRazas())
      } catch (e) {
        setError(e.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor)
    setVisibles(POR_PAGINA)
  }

  const cambiarFiltro = (valor) => {
    setFiltro(valor)
    setVisibles(POR_PAGINA)
  }

  const filtradas = razas.filter((r) => {
    const coincide = r.nombre.includes(busqueda.trim().toLowerCase())
    const tipo =
      filtro === 'todas' || (filtro === 'con' ? r.subrazas.length > 0 : r.subrazas.length === 0)
    return coincide && tipo
  })

  if (cargando) return <Cargando texto="Cargando razas..." />
  if (error) return <Mensaje tipo="error">No se pudo cargar el listado: {error}</Mensaje>

  return (
    <section>
      <h1>Razas de perros</h1>
      <Buscador
        busqueda={busqueda}
        onBusqueda={cambiarBusqueda}
        filtro={filtro}
        onFiltro={cambiarFiltro}
      />
      {filtradas.length === 0 ? (
        <p className="vacio">No se encontraron razas con esos criterios</p>
      ) : (
        <>
          <p className="total">Mostrando {Math.min(visibles, filtradas.length)} de {filtradas.length}</p>
          <div className="grilla">
            {filtradas.slice(0, visibles).map((r) => (
              <Tarjeta
                key={r.nombre}
                nombre={r.nombre}
                subrazas={r.subrazas}
                esFavorito={favoritos.includes(r.nombre)}
                alternarFavorito={alternarFavorito}
              />
            ))}
          </div>
          {visibles < filtradas.length && (
            <div className="centrado">
              <button className="boton" onClick={() => setVisibles(visibles + POR_PAGINA)}>
                Cargar más
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
