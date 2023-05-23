const { Genre } = require('../../db')
const { customError } = require('../../utils/customError')

module.exports = async (req, res) => {
  try {
    const { idGenre } = req.params

    const genre = await Genre.findByPk(idGenre)

    if (!genre)
      throw customError(404, 'el genero no existe o ya fue eliminado.')

    await genre.destroy()

    res.status(200).json({ message: 'el genero fue eliminado exitosamente.' })
  } catch (error) {
    const { message, status } = error

    res.status(status || 500).json({ message })
  }
}