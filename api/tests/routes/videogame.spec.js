/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, Genre, conn } = require('../../src/db.js')
const { vgTest, gTest } = require('../precarga/recordTest.js')
const agent = session(app)

const vgTestDB = {
  ...vgTest,
  id: '5a1a4b07-afa9-4289-a63a-3ab09672791f'
}

const vgTestWithGenres = {
  ...vgTest,
  genres: gTest
}

let game
let genres
let gameUpdate

describe('Videogame routes', () => {
  before(async () => {
    try {
      await conn.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })

  after(async () => {
    await conn.sync({ force: true })
  })

  describe('GET /videogames', () => {
    beforeEach(async () => {
      await conn.sync({ force: true })
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

    it('deberia poder traer juegos de la DB y la API', async () => {
      // Crea un registro con asociaciones y modifica el id a formato uuid
      game = await Videogame.create(vgTestDB)
      genres = await Genre.bulkCreate(gTest)
      await game.setGenres(genres)

      // Busca el registro creado agregando campo 'genres'
      gameUpdate = await Videogame.findByPk(game.id, {
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

    xit('¿deberia aceptar saltar paginas.?', async () => {
      console.log('falta confirmacion')
    })
  })

  describe('GET /videogames/:idVideogame', () => {
    describe('con id de la API', () => {
      it('deberia devolver status 200 si encontro el juego', async () => {
        const gameId = 3272
        const { status } = await agent.get(`/videogames/${gameId}`)
        expect(status).to.equal(200)
      })

      it('deberia devolver status 400 sino encontro el juego', async () => {
        const gameId = '3412a'
        const { status } = await agent.get(`/videogames/${gameId}`)
        expect(status).to.equal(404)
      })

      it('deberia devolver un objeto con la info del juego', async () => {
        const gameId = 3272
        const { body } = await agent.get(`/videogames/${gameId}`)

        expect(body).to.deep.include(vgTestWithGenres)
      })
      it('deberia devolver un mensaje de error con status 404', async () => {
        const gameId = '3412a'
        const { body } = await agent.get(`/videogames/${gameId}`)

        expect(body).to.have.property('message')
      })
    })

    describe('con id de la DB', () => {
      before(async () => {
        await conn.sync({ force: true })

        game = await Videogame.create(vgTestDB)
        genres = await Genre.bulkCreate(gTest)
        await game.setGenres(genres)

        gameUpdate = await Videogame.findByPk(game.id, {
          attributes: { exclude: ['description'] },
          include: {
            model: Genre,
            through: { attributes: [] }
          }
        })
      })

      after(async () => {
        await conn.sync({ force: true })
      })

      it('deberia devolver status 200 si encontro el juego', async () => {
        const gameId = gameUpdate.id
        const { status } = await agent.get(`/videogames/${gameId}`)
        expect(status).to.equal(200)
      })

      it('deberia devolver un objeto con la info del juego', async () => {
        const gameId = vgTestDB.id
        const { body } = await agent.get(`/videogames/${gameId}`)

        expect(body).to.deep.include({ ...vgTestDB, genres: gTest })
      })
    })
  })
})
