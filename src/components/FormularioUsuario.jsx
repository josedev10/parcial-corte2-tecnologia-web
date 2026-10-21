export default function FormularioUsuario({ valores, onCambio, onEnviar, editando, onCancelar }) {
  return (
    <form className="formulario" onSubmit={onEnviar}>
      <label>
        Identificación
        <input name="identificacion" value={valores.identificacion} onChange={onCambio} />
      </label>
      <label>
        Nombre
        <input name="nombre" value={valores.nombre} onChange={onCambio} />
      </label>
      <label>
        Correo
        <input name="correo" value={valores.correo} onChange={onCambio} />
      </label>
      <div className="acciones">
        <button type="submit" className="boton">
          {editando ? 'Guardar cambios' : 'Registrar'}
        </button>
        {editando && (
          <button type="button" className="boton boton-claro" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
