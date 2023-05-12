const { Videogame, conn } = require('../../src/db.js')
const { expect } = require('chai')
const { vgTest } = require('../precarga/recordTest.js')


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
