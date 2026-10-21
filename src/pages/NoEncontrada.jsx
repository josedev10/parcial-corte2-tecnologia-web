import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <section className="inicio">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link className="boton" to="/">Volver al inicio</Link>
    </section>
  )
}
