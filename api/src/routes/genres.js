const { Router } = require('express')
const getGenresApi = require('../controllers/genres/getGenresApi')
const getGenreById = require('../controllers/genres/getGenreById')
const postGenre = require('../controllers/genres/postGenre')
const deleteGenreById = require('../controllers/genres/deleteGenreById')
const modificationGenreById = require('../controllers/genres/modificationGenreById')

const router = Router()

router.get('/', getGenresApi)
router.get('/:idGenre', getGenreById)
router.post('/', postGenre)
router.delete('/:idGenre', deleteGenreById)
router.put('/:idGenre', modificationGenreById)

module.exports = router
