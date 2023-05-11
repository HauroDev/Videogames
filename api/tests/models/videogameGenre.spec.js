const { Genre, Videogame, VideogameGenre, conn } = require('../../src/db.js')
const { expect } = require('chai')
const { vgTest } = require('./videogame.spec.js')

const genreTests = [  { id: 51, name: 'Indie' },  { id: 15, name: 'Sports' },  { id: 1, name: 'Racing' }]

describe('VideogameGenre model', () => {
  before(async () => {
    await conn.authenticate()
    await Genre.bulkCreate(genreTests)
  })

  beforeEach(async () => {
    await VideogameGenre.truncate()
    await Videogame.truncate()
  })

  after(async () => {
    await Genre.truncate()
    await VideogameGenre.truncate()
    await Videogame.truncate()
  })

  describe('Asociaciones', () => {
    it('deberia poder asociar los registros de Genres con los de Videogames', async () => {
      const allGenres = await Genre.findAll({ where: { id: [1, 15, 51] } })
      const game = await Videogame.create(vgTest)

      await game.setGenres(allGenres)

      const relations = await game.hasGenres([1, 15, 51])

      expect(relations).to.equal(true)
    })

    it('solo deberia estar los campos de las claves foraneas', async () => {
      const atributos = Object.keys(await VideogameGenre.rawAttributes)

      expect(atributos).to.have.lengthOf(2)
    })
  })
})

module.exports = { gTest: genreTests }