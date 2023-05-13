const { default: axios } = require('axios')
const { Router } = require('express')

const { Genre } = require('../db')

require('dotenv').config()
const { API_KEY } = process.env

const router = Router()

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )

    const {
      data: { results }
    } = response

    const genres = results?.map(({ id, name }) => ({ id, name }))

    await Genre.bulkCreate(genres)
    
    res.status(200).json({ genres })
  } catch (error) {
    const { message } = error
    res.status(500).json({ message })
  }
})

module.exports = router
