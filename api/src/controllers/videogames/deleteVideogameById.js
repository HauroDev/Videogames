const { Videogame } = require('../../db')
const { customError } = require('../../utils/customError.js')

module.exports = async (req, res) => {
  try {
    const { idVideogame } = req.params

    const game = await Videogame.findByPk(idVideogame)

    if (!game)
      throw customError(404, 'el juego que busca no existe o ya fue eliminado.')

    await game.destroy()

    res.status(200).json({ message: 'Juego eliminado exitosamente' })
  } catch (error) {
    const { message, status } = error
    res.status(status || 500).json({ message })
  }
}
