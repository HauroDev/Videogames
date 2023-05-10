const { Videogame, conn } = require('../../src/db.js')
const { expect } = require('chai')

const vgTest = {
  name: 'Rocket League',
  description:
    '<p>Highly competitive soccer game with rocket-cars is the most comprehensive way to describe this game. Technically a sequel to Psyonix’ previous game - Supersonic Acrobatic Rocket-Powered Battle-Cars; Rocket League successfully became a standalone sensation, that can be enjoyed by anyone. Easy to learn, hard to master game mechanics are perfect for the tight controls. Players are invited to maneuver the different fields within several game modes, from arcade to ranked game either 1v1, or in 2v2 and 3v3 teams. Using boosters will not only speed up the car but will allow the car to propel itself into the air.<br />\nRocket League provides several levels of customization, where not only the color of your car can be adjusted, but the colors and form of the booster flame, different hats, and little flags. Or players can pick a completely different car. Collaboration with different franchises brought not only original transport but some famous cars, including Batmobile or Delorian from Back to the Future.</p>',
  released: new Date(2015, 06, 07), // el segundo parametro empieza de 0 a 11 por eso puse 6 ya que el juego fue lantado en el 7
  image:
    'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg',
  rating: 3.95,
  platforms: [
    { id: 7, name: 'Nintendo Switch' },
    { id: 6, name: 'Linux' },
    { id: 5, name: 'macOS' },
    { id: 1, name: 'Xbox One' },
    { id: 4, name: 'PC' },
    { id: 18, name: 'PlayStation 4' }
  ]
}

describe('Videogame model', () => {
  before(async () => {
    try {
      conn.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })

  after(async () => {
    await Videogame.truncate()
  })

  describe('Verificaciones Básicas', () => {
    beforeEach(() => Videogame.sync({ force: true }))

    it('deberia tener los atributos: id, name, description, platforms, image, released, rating', async () => {
      try {
        const atributos = Object.keys(await Videogame.rawAttributes)

        expect(atributos).to.have.members([
          'id',
          'name',
          'description',
          'platforms',
          'image',
          'released',
          'rating'
        ])
      } catch (error) {
        throw error
      }
    })

    it('deberia evitar crear registros con valores nulos', async () => {
      try {
        await Videogame.create({})
        throw new Error('No debia crear un registro')
      } catch (error) {
        expect(error.message).to.include('cannot be null')
      }
    })
  })

  describe('Verificaciones avanzadas', () => {
    beforeEach(() => Videogame.sync({ force: true }))
    it('deberia crear exitosamente un registro', async () => {
      try {
        await Videogame.create(vgTest)

        const registro = await Videogame.findOne({
          where: { name: 'Rocket League' }
        })

        expect(registro.name).to.equal('Rocket League')
      } catch (error) {
        throw error
      }
    })

    it('deberia crear correctamente la id con formato uuid', async () => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|aA|bB][0-9a-f]{3}-[0-9a-f]{12}$/i
      try {
        await Videogame.create(vgTest)

        const registro = await Videogame.findOne({
          where: { name: 'Rocket League' }
        })

        expect(registro.id).to.match(uuidRegex)
      } catch (error) {
        throw error
      }
    })

    it('deberia respetar el formato "YYYY-MM-DD" el atributo released', async () => {
      const regexFecha = /^\d{4}-\d{2}-\d{2}$/

      try {
        await Videogame.create(vgTest)

        const registro = await Videogame.findOne({
          where: { name: 'Rocket League' }
        })

        expect(registro.released).to.be.a('string')
        expect(registro.released).to.match(regexFecha)
      } catch (error) {
        throw error
      }
    })

    it('deberia crearse un array de objetos correctamente en el atributo plataforms\ny cada objeto debe tener las propiedades "id" y "name"', async () => {
      try {
        await Videogame.create(vgTest)

        const resgistro = await Videogame.findOne({
          where: { name: 'Rocket League' }
        })

        expect(resgistro.platforms).to.be.an('array').that.is.not.empty

        resgistro.platforms.forEach((platform) => {
          expect(platform).to.have.property('id')
          expect(platform).to.have.property('name')
        })
      } catch (error) {
        throw error
      }
    })
  })
})

module.exports = { vgTest }
