require('dotenv').config()
const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const filterGameProperties = require('./filterGameProperties')
const { default: axios } = require('axios')
const customError = require('./customError')

const { API_KEY } = process.env

const getGamesForAPIWithLimit = async (limit, name) => {
  const promises = Array.from({ length: limit }, (_, i) => {
    return axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}page=${
        i + 1
      }`
    )
  })

  const res = await Promise.all(promises)
  const result = res?.map(({ data }) => data.results).flat()
  return result
}

const getGames = async (name) => {
  let [resDB, resAPI] = await Promise.all([
    Videogame.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      },
      attributes: { exclude: ['description'] },
      include: { model: Genre, through: { attributes: [] } }
    }),
    getGamesForAPIWithLimit(5, name)
  ])
  resDB = resDB?.map((g) => g.toJSON())
  resAPI = resAPI?.map(filterGameProperties)

  const games = [...resDB, ...resAPI]

  if (!games.length)
    throw customError(404, `No se encontraron juego con el nombre ${name}`)
  else return games
}

module.exports = { getGames }
