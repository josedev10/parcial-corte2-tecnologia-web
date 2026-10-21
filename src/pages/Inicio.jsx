import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <section className="inicio">
      <h1>Dog Explorer 🐕</h1>
      <p>
        Explora las razas de perros, busca y filtra el listado, mira el detalle de cada una con su
        galería y guarda tus favoritas. También puedes gestionar un registro de usuarios.
      </p>
      <p>
        Los datos vienen de la API pública <strong>Dog CEO</strong>, que entrega el listado de razas,
        sus subrazas e imágenes.
      </p>
      <Link className="boton" to="/lista">Ver listado de razas</Link>
    </section>
  )
}
