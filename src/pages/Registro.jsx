import { useState } from 'react'
import FormularioUsuario from '../components/FormularioUsuario.jsx'
import ListaUsuarios from '../components/ListaUsuarios.jsx'
import Mensaje from '../components/Mensaje.jsx'

const VACIO = { identificacion: '', nombre: '', correo: '' }

export default function Registro({ usuarios, setUsuarios }) {
  const [valores, setValores] = useState(VACIO)
  const [editando, setEditando] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const cambiar = (e) => setValores({ ...valores, [e.target.name]: e.target.value })

  const reiniciar = () => {
    setValores(VACIO)
    setEditando(null)
  }

  const validar = (datos) => {
    if (!datos.identificacion || !datos.nombre || !datos.correo) return 'Todos los campos son obligatorios'
    if (!/^\d+$/.test(datos.identificacion)) return 'La identificación debe contener solo números'
    if (!datos.correo.includes('@')) return 'El correo debe incluir «@»'
    const repetido = usuarios.some(
      (u) => u.identificacion === datos.identificacion && u.identificacion !== editando
    )
    if (repetido) return `Ya existe un usuario con la identificación ${datos.identificacion}`
    return null
  }

  const enviar = (e) => {
    e.preventDefault()
    const datos = {
      identificacion: valores.identificacion.trim(),
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim(),
    }
    const error = validar(datos)
    if (error) {
      setMensaje({ tipo: 'error', texto: error })
      return
    }
    if (editando) {
      setUsuarios(usuarios.map((u) => (u.identificacion === editando ? datos : u)))
      setMensaje({ tipo: 'exito', texto: `Usuario ${datos.nombre} actualizado correctamente` })
    } else {
      setUsuarios([...usuarios, datos])
      setMensaje({ tipo: 'exito', texto: `Usuario ${datos.nombre} registrado correctamente` })
    }
    reiniciar()
  }

  const iniciarEdicion = (usuario) => {
    setValores(usuario)
    setEditando(usuario.identificacion)
    setMensaje(null)
  }

  const cancelar = () => {
    reiniciar()
    setMensaje(null)
  }

  const eliminar = (usuario) => {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre}?`)) return
    setUsuarios(usuarios.filter((u) => u.identificacion !== usuario.identificacion))
    if (editando === usuario.identificacion) reiniciar()
    setMensaje({ tipo: 'exito', texto: `Usuario ${usuario.nombre} eliminado correctamente` })
  }

  return (
    <section className="registro">
      <h1>Registro de usuarios</h1>
      {mensaje && <Mensaje tipo={mensaje.tipo}>{mensaje.texto}</Mensaje>}
      <FormularioUsuario
        valores={valores}
        onCambio={cambiar}
        onEnviar={enviar}
        editando={editando !== null}
        onCancelar={cancelar}
      />
      <ListaUsuarios usuarios={usuarios} onEditar={iniciarEdicion} onEliminar={eliminar} />
    </section>
  )
}
