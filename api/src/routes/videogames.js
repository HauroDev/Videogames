const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames.js')
const getVideogameById = require('../controllers/getVideogameById.js')

require('dotenv').config()
const router = Router()

router.get('/', getVideogames)
router.get('/:idVideogame',getVideogameById)

module.exports = router
