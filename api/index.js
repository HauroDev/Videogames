const server = require('./src/app.js')
const { conn } = require('./src/db.js')

require('dotenv').config()
const { PORT } = process.env


console.log('starting...')
conn
  .sync({ force: false }) // luego quitar el true para que no borre la base de datos Xd
  .then(() => {
    server.listen(PORT, () => {
      setTimeout(() => {
        process.stdout.write('\u001b[1A\u001b[2K') //decoracion profesional o eso quiero creer u-u
        console.log(`successful start: listening in port: ${PORT}`)
      }, 300)
    })
  })
  .catch((error) => console.log(`Error: ${error.message}`))
