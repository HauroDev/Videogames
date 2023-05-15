const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames.js')
const getVideogameById = require('../controllers/getVideogameById.js')
const postVideogame = require('../controllers/postVideogame.js')
const router = Router()

router.get('/', getVideogames)
router.get('/:idVideogame', getVideogameById)
router.post('/', postVideogame)

module.exports = router
