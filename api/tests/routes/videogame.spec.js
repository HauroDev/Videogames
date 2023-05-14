const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')

const { Videogame, Genre, conn } = require('../../src/db.js')
const { vgTest, gTest } = require('../precarga/mocks.js')

const agent = session(app)

/* 
  refactorizar tests: para una mejor lectura
*/

const vgTestDB = {
  ...vgTest,
  id: '5a1a4b07-afa9-4289-a63a-3ab09672791f'
}

const vgTestWithGenres = {
  ...vgTest,
  genres: gTest
}

let game, response, genres, gameSend

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

  describe('GET /videogames\n', () => {
    beforeEach(async () => {
      await conn.sync({ force: true })
    })

    it('deberia devolver status 200 si se accede', async () => {
      response = await agent.get('/videogames')
      expect(response.status).to.equal(200)
    })

    it('deberia obtener un objeto con un array "results" con objetos no vacios', async () => {
      response = await agent.get('/videogames')
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
      response = await agent.get('/videogames')
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
      response = await agent.get('/videogames')
      const {
        body: { results }
      } = response

      expect(results).to.deep.include(gameUpdate.toJSON())
    })
  })

  describe('GET /videogames?name="..."\n', () => {
    before(async () => {
      await conn.sync({ force: true })
    })

    it('debe devolver un objeto con la propiedad "results", esta tiene ', async () => {
      response = await agent.get('/videogames?name=rocket')
      const { body, status } = response

      expect(status).to.equal(200)
      expect(body).to.be.an('object')
      expect(body.results).to.be.an('array').that.is.not.empty
    })
    it('debe poder buscar en la db y en la api', async () => {
      game = await Videogame.create(vgTestDB)
      await Genre.bulkCreate(gTest)
      await game.setGenres(genres)

      game = await Videogame.findByPk(game.id, {
        attributes: { exclude: ['description'] },
        include: {
          model: Genre,
          through: { attributes: [] }
        }
      })

      response = await agent.get('/videogames?name=rocket')
      const { body, status } = response

      expect(status).to.equal(200)
      expect(body.results).to.deep.include(game.toJSON())
    })
  })

  describe('GET /videogames/:idVideogame\n', () => {
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
        const { status, body } = await agent.get(`/videogames/${gameId}`)

        expect(status).to.equal(404)
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

  describe('POST /videogames\n', () => {
    before(async () => {
      await Genre.bulkCreate(gTest)
      gameSend = { ...vgTestWithGenres }
      delete gameSend.rating
    })

    afterEach(async () => {
      await Videogame.sync({ force: true })
    })

    after(async () => {
      await conn.sync({ force: true })
    })

    it('deberia devolver status 201', async () => {
      response = await agent.post('/videogames').send(gameSend)

      expect(response.status).to.equal(201)
    })

    it('deberia enviar recibir un objeto con las propiedades requeridas y devolverlo para confirmar la solicitud; un juego nuevo no lleva rating', async () => {
      response = await agent.post('/videogames').send(gameSend)

      expect(response.body).to.be.an('object')
      expect(response.body).to.deep.include(gameSend)
    })

    it('deberia guardarlo en la base de datos', async () => {
      response = await agent.post('/videogames').send(gameSend)

      game = await Videogame.findByPk(response.body.id, {
        include: {
          model: Genre,
          through: { attributes: [] }
        }
      })

      expect(response.body).to.be.an('object')
      expect(response.body).to.deep.include(game.toJSON())
    })

    it('deberia evitar crear juegos que ya esten en la base de datos', async () => {
      response = await agent.post('/videogames').send(gameSend)
      response = await agent.post('/videogames').send(gameSend)

      expect(response.status).to.equal(400)
    })
  })
})
