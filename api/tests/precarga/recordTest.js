const { Sequelize } = require('sequelize')
const { Videogame, Genre, VideogameGenre } = require('../../src/db')
const { vgTest, gTest } = require('./mocks')
require('dotenv').config()

const { DB_HOST, DB_PASSWORD, DB_USER } = process.env

const sequelize = new Sequelize('videogames', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres'
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

Videogame.belongsToMany(Genre, { through: VideogameGenre })
Genre.belongsToMany(Videogame, { through: VideogameGenre })

const gamePromise = Videogame.create(vgTest)
const genresPromise = Genre.bulkCreate(gTest)

Promise.all([gamePromise, genresPromise])
  .then(([game, genres]) => {
    return game.addGenres(genres)
  })
  .then(() => {
    console.log('La relación ha sido establecida')
  })
  .catch((error) => {
    console.error('Ocurrió un error:', error)
  })
  .finally(() => {
    sequelize.close()
  })
