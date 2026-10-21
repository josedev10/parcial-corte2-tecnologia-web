import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { obtenerImagenAleatoria } from '../services/dogApi.js'

export default function Tarjeta({ nombre, subrazas, esFavorito, alternarFavorito }) {
  const [imagen, setImagen] = useState(null)
  const [fallo, setFallo] = useState(false)

  useEffect(() => {
    let activo = true
    async function cargar() {
      try {
        const url = await obtenerImagenAleatoria(nombre)
        if (activo) setImagen(url)
      } catch {
        if (activo) setFallo(true)
      }
    }
    cargar()
    return () => { activo = false }
  }, [nombre])

  return (
    <article className="tarjeta">
      <div className="tarjeta-imagen">
        {imagen && <img src={imagen} alt={`Perro de raza ${nombre}`} loading="lazy" />}
        {!imagen && <span>{fallo ? 'Sin imagen' : 'Cargando...'}</span>}
      </div>
      <div className="tarjeta-cuerpo">
        <h3>{nombre}</h3>
        {subrazas && <p>{subrazas.length > 0 ? `${subrazas.length} subrazas` : 'Sin subrazas'}</p>}
        <div className="acciones">
          <Link className="boton" to={`/detalle/${nombre}`}>Ver detalle</Link>
          <button
            className={`boton ${esFavorito ? 'boton-secundario' : 'boton-claro'}`}
            onClick={() => alternarFavorito(nombre)}
          >
            {esFavorito ? '★ Quitar' : '☆ Favorito'}
          </button>
        </div>
      </div>
    </article>
  )
}
