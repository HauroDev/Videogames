const { Router } = require('express')
const getVideogames = require('../controllers/videogames/getVideogames.js')
const deleteVideogameById = require('../controllers/videogames/deleteVideogameById.js')
const getVideogameById = require('../controllers/videogames/getVideogameById.js')
const postVideogame = require('../controllers/videogames/postVideogame.js')
const modificationVideogameById = require('../controllers/videogames/modificationVideogameById.js')

const router = Router()


router.get('/', getVideogames)
router.get('/:idVideogame', getVideogameById)
router.delete('/:idVideogame', deleteVideogameById)
router.post('/', postVideogame)
router.put('/:idVideogame', modificationVideogameById)

module.exports = router
