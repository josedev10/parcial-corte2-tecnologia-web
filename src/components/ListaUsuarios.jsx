export default function ListaUsuarios({ usuarios, onEditar, onEliminar }) {
  return (
    <section>
      <h2>Usuarios registrados: {usuarios.length}</h2>
      {usuarios.length === 0 ? (
        <p className="vacio">Aún no hay usuarios registrados</p>
      ) : (
        <ul className="usuarios">
          {usuarios.map((u) => (
            <li key={u.identificacion} className="usuario">
              <div>
                <strong>{u.nombre}</strong>
                <span>ID: {u.identificacion}</span>
                <span>{u.correo}</span>
              </div>
              <div className="acciones">
                <button className="boton" onClick={() => onEditar(u)}>Editar</button>
                <button className="boton boton-peligro" onClick={() => onEliminar(u)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
