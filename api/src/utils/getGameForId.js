const { default: axios } = require('axios')
const { Videogame, Genre } = require('../db.js')
const { customError } = require('../utils/customError.js')

const { API_KEY } = process.env
const filterGameProperties = require('../utils/filterGameProperties.js')

const getGameForId = async (id) => {
  const regexUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4|5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  let game

  if (regexUUID.test(id)) {
    game = await Videogame.findByPk(id, {
      include: { model: Genre, through: { attributes: [] } }
    })

    if (!game)
      throw customError(404, `el juego con el id ${id} no fue encontrado`)

    game = game.toJSON()
  } else {
    try {
      game = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      )
    } catch (error) {
      throw customError(404, `el juego con el id ${id} no fue encontrado`)
    }
    game = filterGameProperties(game.data)
  }

  return game
}

module.exports = { getGameForId }
