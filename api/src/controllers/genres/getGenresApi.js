const axios = require('axios')
const { Genre } = require('../../db')
require('dotenv').config()
const { API_KEY } = process.env

module.exports = async (_, res) => {
  try {
    const existingGenres = await Genre.findAll()

    if (!existingGenres.length) {
      const response = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      )
      const {
        data: { results }
      } = response

      const genres = results.map(({ id, name }) => ({ id, name }))

      await Genre.bulkCreate(genres)
    }

    const genresJSON = existingGenres.map((genre) => genre.toJSON()).reverse()

    res.status(200).json({ genres: genresJSON })
  } catch (error) {
    const { message } = error
    res.status(500).json({ message })
  }
}
