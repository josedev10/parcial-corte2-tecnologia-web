import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { obtenerImagenes, obtenerRazas } from '../services/dogApi.js'
import Cargando from '../components/Cargando.jsx'
import Mensaje from '../components/Mensaje.jsx'

const POR_PAGINA = 6

export default function Detalle({ favoritos, alternarFavorito }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [raza, setRaza] = useState(null)
  const [imagenes, setImagenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [visibles, setVisibles] = useState(POR_PAGINA)

  useEffect(() => {
    let activo = true
    async function cargar() {
      setCargando(true)
      setError(null)
      setVisibles(POR_PAGINA)
      try {
        const [razas, fotos] = await Promise.all([obtenerRazas(), obtenerImagenes(id)])
        if (!activo) return
        setRaza(razas.find((r) => r.nombre === id))
        setImagenes(fotos)
      } catch (e) {
        if (activo) setError(e.message)
      } finally {
        if (activo) setCargando(false)
      }
    }
    cargar()
    return () => { activo = false }
  }, [id])

  if (cargando) return <Cargando texto="Cargando detalle..." />
  if (error) {
    return (
      <>
        <Mensaje tipo="error">No se encontró la raza «{id}» ({error})</Mensaje>
        <Link className="boton" to="/lista">Volver al listado</Link>
      </>
    )
  }

  const esFavorito = favoritos.includes(id)
  const subrazas = raza ? raza.subrazas : []
  const galeria = imagenes.slice(1)

  return (
    <section className="detalle">
      <img className="detalle-imagen" src={imagenes[0]} alt={`Perro de raza ${id}`} />
      <div className="detalle-info">
        <h1>{id}</h1>
        <ul className="datos">
          <li><strong>Raza:</strong> {id}</li>
          <li><strong>Total de imágenes:</strong> {imagenes.length}</li>
          <li><strong>Número de subrazas:</strong> {subrazas.length}</li>
          <li><strong>Subrazas:</strong> {subrazas.length > 0 ? subrazas.join(', ') : 'Ninguna'}</li>
          <li><strong>Tipo:</strong> {subrazas.length > 0 ? 'Raza con subrazas' : 'Raza única'}</li>
        </ul>
        <div className="acciones">
          <button
            className={`boton ${esFavorito ? 'boton-secundario' : ''}`}
            onClick={() => alternarFavorito(id)}
          >
            {esFavorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
          </button>
          <button className="boton boton-claro" onClick={() => navigate('/lista')}>
            Volver al listado
          </button>
        </div>
      </div>
      <div className="galeria">
        {galeria.slice(0, visibles).map((url) => (
          <img key={url} src={url} alt={`Otra foto de ${id}`} loading="lazy" />
        ))}
      </div>
      <div className="galeria-pie">
        <p className="total">Mostrando {Math.min(visibles, galeria.length)} de {galeria.length} imágenes</p>
        {visibles < galeria.length && (
          <button className="boton" onClick={() => setVisibles(visibles + POR_PAGINA)}>
            Cargar más
          </button>
        )}
      </div>
    </section>
  )
}
