require('dotenv').config()
const { Videogame, Genre } = require('../db')
const axios = require('axios').default

const { URL_API_BASE, API_KEY } = process.env

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
    axios.get(`${URL_API_BASE}/games?key=${API_KEY}`)
  ])

  const resultsAPIReformed = resultsAPI.map(
    ({
      id,
      name,
      background_image: image,
      released,
      rating,
      platforms,
      genres
    }) => ({
      id,
      name,
      released,
      rating,
      genres: genres.map(({ id, name }) => ({ id, name })),
      platforms: platforms.map(({ platform: { id, name } }) => ({ id, name })),
      image
    })
  )

  const results = [...resultsAPIReformed, ...resultsDB]

  return results
}
