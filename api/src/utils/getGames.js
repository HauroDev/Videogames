require('dotenv').config()
const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const filterGameProperties = require('./filterGameProperties')
const { default: axios } = require('axios')

const { API_KEY } = process.env

/* 
  se encarga de buscar en la base de datos y en la api los juegos,
  identifica si necesita es buscar por nombre o no.
*/

const getGamesForAPIWithLimit = async (limit, name) => {
  //queria usar un nombre como 'ignorar' pero investigue y es mejor usar un _
  const promises = Array.from({ length: limit }, (_, i) => {
    return axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name || ''}&page=${
        i + 1
      }`
    )
  })

  const res = await Promise.all(promises)
  const result = res?.map(({ data }) => data.results).flat()
  return result
}

module.exports = async (name) => {
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

  const result = [...resDB, ...resAPI]

  return result
}
