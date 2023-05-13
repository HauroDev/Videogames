const { Router } = require('express')
const videogamesRoutes = require('./videogames')
const genresRoutes = require('./genres')
const router = Router()

router.use('/videogames', videogamesRoutes)
router.use('/genres', genresRoutes)
router.use('*', (_, res) => {
  res.status(404).json({ message: 'ruta no existente' })
})
module.exports = router
