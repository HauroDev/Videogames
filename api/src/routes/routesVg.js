const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames.js')
const router = Router()

router.get('/', async (req, res) => {
  try {
    // aqui hay un array con los juegos
    const results = await getVideogames()

    res.status(200).json({ results })
  } catch (error) {
    const { message } = error
    res.status(500).json({ message })
  }
})

module.exports = router
