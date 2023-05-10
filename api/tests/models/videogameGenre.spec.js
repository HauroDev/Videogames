const { Genre, Videogame, VideogameGenre, conn } = require('../../src/db.js')
const { expect } = require('chai')
const { vgTest } = require('./videogame.spec.js')

const genreTests = [
  { id: 51, name: 'Indie' },
  { id: 15, name: 'Sports' },
  { id: 1, name: 'Racing' }
]

describe('VideogameGenre model', () => {
  before(async () => {
    try {
      await conn.authenticate()
      await Genre.bulkCreate(genreTests)
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })

  after(async () => {
    await VideogameGenre.truncate()
    await Videogame.truncate()
    await Genre.truncate()
  })

  describe('Relaciones', () => {
    it('deberia poder relacionarse la tabla de Genres con la de Videogames', async () => {
      try {
        const allGenres = await Genre.findAll({ where: { id: [1, 15, 51] } })
        const game = await Videogame.create(vgTest)

        await game.addGenre(allGenres)

        const relations = await game.hasGenres([1, 15, 51])

        expect(relations).to.equal(true)
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    it('solo deberia estar los campos de las claves foraneas', async () => {
      try {
        const atributos = Object.keys(await VideogameGenre.rawAttributes)

        expect(atributos).to.have.lengthOf(2)
      } catch (error) {
        throw error
      }
    })
  })
})
