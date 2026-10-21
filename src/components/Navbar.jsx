import { NavLink } from 'react-router-dom'

export default function Navbar({ totalFavoritos, totalUsuarios }) {
  return (
    <header className="navbar">
      <NavLink to="/" className="logo">🐶 Dog Explorer</NavLink>
      <nav className="enlaces">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/lista">Lista</NavLink>
        <NavLink to="/favoritos">Favoritos ({totalFavoritos})</NavLink>
        <NavLink to="/registro">Registro ({totalUsuarios})</NavLink>
      </nav>
    </header>
  )
}
