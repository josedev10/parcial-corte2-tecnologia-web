import { Link } from 'react-router-dom'
import Tarjeta from '../components/Tarjeta.jsx'

export default function Favoritos({ favoritos, alternarFavorito }) {
  return (
    <section>
      <h1>Mis favoritos</h1>
      {favoritos.length === 0 ? (
        <>
          <p className="vacio">Todavía no has guardado razas favoritas</p>
          <Link className="boton" to="/lista">Explorar razas</Link>
        </>
      ) : (
        <div className="grilla">
          {favoritos.map((nombre) => (
            <Tarjeta key={nombre} nombre={nombre} esFavorito alternarFavorito={alternarFavorito} />
          ))}
        </div>
      )}
    </section>
  )
}
