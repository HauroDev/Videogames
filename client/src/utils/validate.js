export const validateGame = ({
  name,
  description,
  platforms,
  image,
  released,
  genres
}) => {
  const error = { status: false }

  if (name.length <= 3 || name.length > 45) {
    error.name = 'El nombre debe tener entre 3 y 45 caracteres.'
  }
  if (!name.length) {
    error.name = 'El nombre no puede estar vacía.'
  }
  if (description.length === 0) {
    error.description = 'La descripción no puede estar vacía.'
  }
  if (description.length > 1000) {
    error.description = 'La descripción no debe exceder los 1000 caracteres.'
  }

  if (!platforms.length)
    error.platforms = 'Debe elegir al menos una plataforma.'

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(image))
    error.image =
      'Se debe ingresar una url hacia una imagen \n(proximamente podra subirlo directamente).'

  if (!released.length) error.released = 'Elija una fecha.'

  if (!genres.length) error.genres = 'Debe elegir al menos un genero.'

  if (Object.keys(error).length > 1) error.status = true

  return error
}
