const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const { customError } = require('../utils/customError')

const postGame = async (data) => {
  const { genres, name } = data

  if (Object.keys(data).length < 6) {
    throw customError(400, 'al juego le faltan propiedades')
  }

  let game = await Videogame.findOne({
    where: { name: { [Op.iLike]: `%${name}%` } }
  })

  if (game)
    throw customError(400, `El juego ya fue creado, su id es ${game.id}`)

  const genresIds = genres.map((g) => g.id)
  const genresFind = await Genre.findAll({ where: { id: genresIds } })

  if (genresFind.length !== genresIds.length)
    throw customError(400, 'uno o mas generos no existen en la db')

  game = await Videogame.create({ ...data, rating: 0.0 })

  await game.setGenres(genresIds)

  game = await Videogame.findByPk(game.id, {
    include: {
      model: Genre,
      through: { attributes: [] }
    }
  })

  return game
}

module.exports = { postGame }
