const BASE_URL = 'https://dog.ceo/api'

async function pedir(ruta) {
  const respuesta = await fetch(`${BASE_URL}${ruta}`)
  if (!respuesta.ok) throw new Error(`Error ${respuesta.status} al consultar la API`)
  const datos = await respuesta.json()
  if (datos.status !== 'success') throw new Error(datos.message)
  return datos.message
}

export async function obtenerRazas() {
  const razas = await pedir('/breeds/list/all')
  return Object.entries(razas).map(([nombre, subrazas]) => ({ nombre, subrazas }))
}

export const obtenerImagenes = (raza) => pedir(`/breed/${raza}/images`)

export const obtenerImagenAleatoria = (raza) => pedir(`/breed/${raza}/images/random`)
