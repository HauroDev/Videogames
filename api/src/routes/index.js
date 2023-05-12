const { Router } = require('express');
const routerVideogames = require('./videogames')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',routerVideogames)


module.exports = router;
