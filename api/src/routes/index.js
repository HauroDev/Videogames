const { Router } = require('express');
const getVideogames = require('./routesVg')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',getVideogames)


module.exports = router;
