const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')

/*
  Hay que refactorizar
*/


module.exports = async (req, res) => {
  const { genres, name } = req.body

  let game
  try {
    if (Object.keys(req.body).length < 6) {
      const err = new Error(
        'Incomplete request, please provide all required information'
      )
      err.status = 400
      throw err
    }

    game = await Videogame.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } }
    })

    if (game) {
      const err = new Error('El juego ya fue creado')
      err.status = 400
      throw err
    }

    game = await Videogame.create({ ...req.body, rating: 0.0 })
    // agregar a futuro una funcion para agregar nuevos generos que no traiga conflicto con los id de los otros generos
    await game.setGenres(genres.map((g) => g.id)) // esto funcionara siempre se se ejecute la ruta getGenres sino traera problemas

    game = await Videogame.findByPk(game.id, {
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    })

    res.status(201).json(game)
  } catch (error) {
    const { message, status } = error

    res.status(status || 500).json({ message })
  }
}
