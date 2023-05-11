/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, Genre, VideogameGenre, conn } = require('../../src/db.js')
const { vgTest } = require('../models/videogame.spec.js')
const { gTest } = require('../models/videogameGenre.spec.js')

const agent = session(app)

describe('Videogame routes', () => {
  before(async () => {
    try {
      await conn.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })

  describe('GET /videogames - API', () => {
    beforeEach(async () => {
      await Videogame.sync({ force: true })
      await VideogameGenre.sync({ force: true })
    })
    it('deberia devolver status 200 si se accede', async () => {
      const response = await agent.get('/videogames')
      expect(response.status).to.equal(200)
    })
    it('deberia obtener un objeto con un array "results" con objetos no vacios', async () => {
      const response = await agent.get('/videogames')
      const {
        body,
        body: { results }
      } = response
      expect(body).to.be.an('object')
      expect(body).to.have.property('results')
      expect(results).to.be.an('array').that.is.not.empty
      expect(results[0]).to.be.an('object').that.is.not.empty
    })
    it('deberian tener cada objeto del array "results" las siguientes propiedades: id, name, platforms, image, released, rating y genres', async () => {
      const response = await agent.get('/videogames')
      const {
        body: { results }
      } = response
      const propiedades = [
        'id',
        'name',
        'platforms',
        'image',
        'released',
        'rating',
        'genres'
      ]
      expect(results[0]).to.have.all.keys(...propiedades)
    })
  })

  describe('GET /videogames - avanzado', () => {
    beforeEach(async () => {
      await Videogame.sync({ force: true })
      await Genre.sync({ force: true })
    })
    it('deberia poder traer juegos de la DB y la API', async () => {
      // Crea un registro con asociaciones y modifica el id a formato uuid
      const game = await Videogame.create({
        ...vgTest,
        id: '5a1a4b07-afa9-4289-a63a-3ab09672791f'
      })
      const genres = await Genre.bulkCreate(gTest)
      await game.setGenres(genres)

      // Busca el registro creado agregando campo 'genres'
      const gameUpdate = await Videogame.findByPk(game.id, {
        attributes: { exclude: ['description'] },
        include: {
          model: Genre,
          through: { attributes: [] }
        }
      })

      // pide informacion a la ruta /videogames y luego comprueba que tenga el registro en su respuesta
      const response = await agent.get('/videogames')
      const {
        body: { results }
      } = response

      expect(results).to.deep.include(gameUpdate.toJSON())
    })

    it('deberia aceptar saltar paginas.')
  })
})
