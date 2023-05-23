const { Videogame, Genre } = require('../../db')
const { customError } = require('../../utils/customError.js')

module.exports = async (req, res) => {
  try {
    const { idVideogame } = req.params
    const modifications = { ...req.body }

    let game = await Videogame.findByPk(idVideogame)

    if (!game)
      throw customError(404, 'El juego que quiere modificar no fue encontrado.')

    const gens = modifications.genres.map((g) => g.id)
    delete modifications.genres

    const genres = await Genre.findAll({
      where: { id: gens }
    })

    for (let prop in modifications) {
      if (game[prop]) {
        game[prop] = modifications[prop]
      }
    }

    await game.save()
    await game.addGenres(genres)

    res.status(200).json({ ...game.toJSON(), genres })
  } catch (error) {
    const { message, status } = error
    console.log(error)
    res.status(status || 500).json({ message })
  }
}
