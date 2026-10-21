import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Lista from './pages/Lista.jsx'
import Detalle from './pages/Detalle.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Registro from './pages/Registro.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

const CLAVE_FAVORITOS = 'favoritos-razas'

function leerFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_FAVORITOS)) || []
  } catch {
    return []
  }
}

export default function App() {
  const [favoritos, setFavoritos] = useState(leerFavoritos)
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos))
  }, [favoritos])

  const alternarFavorito = (raza) => {
    setFavoritos((actuales) =>
      actuales.includes(raza) ? actuales.filter((f) => f !== raza) : [...actuales, raza]
    )
  }

  return (
    <div className="app">
      <Navbar totalFavoritos={favoritos.length} totalUsuarios={usuarios.length} />
      <main className="contenido">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/lista"
            element={<Lista favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/detalle/:id"
            element={<Detalle favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/favoritos"
            element={<Favoritos favoritos={favoritos} alternarFavorito={alternarFavorito} />}
          />
          <Route
            path="/registro"
            element={<Registro usuarios={usuarios} setUsuarios={setUsuarios} />}
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
