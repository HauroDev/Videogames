export const validateGame = ({
  name,
  description,
  platforms,
  image,
  released,
  rating,
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

    if(description.split(' ').length < 5)
    error.description = 'La descripción debe tener al menos 5 palabras'

  if (description.length > 1000) {
    error.description = 'La descripción no debe exceder los 1000 caracteres.'
  }

  if (!platforms.length)
    error.platforms = 'Debe elegir al menos una plataforma.'

  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(image))
    error.image =
      'Se debe ingresar una url hacia una imagen.'

  if (!released.length) error.released = 'Elija una fecha.'

  if (!/^\d+(\.\d{1,2})?$|^\d+\.?$/.test(rating))
    error.rating = 'El rating puede tener hasta 2 decimales.'
  if (rating < 0 || rating > 5)
    error.rating = 'El rating tiene que estar entre 0 y 5.'

  if (!genres.length) error.genres = 'Debe elegir al menos un genero.'

  if (Object.keys(error).length > 1) error.status = true

  return error
}
