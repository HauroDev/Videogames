const { default: axios } = require('axios')
const { Videogame, Genre } = require('../db.js')
const { API_KEY } = process.env
const filterGameProperties = require('../utils/filterGameProperties.js')

/*
  Hay que refactorizar
*/

module.exports = async (req, res) => {
  const { idVideogame } = req.params
  const regexUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[4|5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  let response, game
  try {
    if (regexUUID.test(idVideogame)) {
      response = await Videogame.findByPk(idVideogame, {
        include: {
          model: Genre,
          through: { attributes: [] }
        }
      })

      if (!response) {
        const err = new Error('No se encontro el juego con id ' + idVideogame)
        err.response = { status: 404 }
        throw err
      }

      game = response.toJSON()
    } else {
      response = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      )

      game = filterGameProperties(response.data)
    }

    res.status(200).json(game)
  } catch (error) {
    if (error.response?.status)
      return res
        .status(error.response.status)
        .json({ message: 'No se encontro el juego con id ' + idVideogame })

    const { message } = await error
    res.status(500).json({ message })
  }
}
