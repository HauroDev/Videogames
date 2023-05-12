require('dotenv').config()
const { Videogame, Genre } = require('../db')
const filterGameProperties = require('./filterGameProperties')
const { default: axios } = require('axios')

const { API_KEY } = process.env

module.exports = async () => {
  const [
    resultsDB,
    {
      data: { results: resultsAPI }
    }
  ] = await Promise.all([
    Videogame.findAll({
      attributes: { exclude: ['description'] },
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    }),
    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
  ])

  // const resultsDBReformed = resultsDB.map((game) => game.toJSON())

  const resultsAPIReformed = resultsAPI.map(filterGameProperties)

  return [...resultsAPIReformed, ...resultsDB]
}
