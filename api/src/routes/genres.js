const { default: axios } = require('axios')
const { Router } = require('express')

const { Genre } = require('../db')
const { customError } = require('../utils/customError')

require('dotenv').config()
const { API_KEY } = process.env

const router = Router()

router.get('/', async (_, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )

    const {
      data: { results }
    } = response

    const genres = results?.map(({ id, name }) => ({ id, name }))

    const genresFind = await Genre.findAll({
      where: { id: genres.map((gen) => gen.id) }
    })

    if (genres.length === genresFind.length)
      throw customError(409, 'Ya se cargaron estos generos en la base de datos')

    await Genre.bulkCreate(genres)

    res.status(200).json({ genres })
  } catch (error) {
    const { message, status } = error
    res.status(status || 500).json({ message })
  }
})

module.exports = router
