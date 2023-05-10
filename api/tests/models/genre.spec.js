const { Genre, conn } = require('../../src/db.js')
const { expect } = require('chai')

describe('Genre model', () => {
  before(async () => {
    try {
      conn.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  })

  after(async () => {
    await Genre.sync({ force: true })
  })

  describe('Verificaciones Básicas', () => {
    beforeEach(() => Genre.sync({ force: true }))
    it('deberia tener los atributos: id, name', async () => {
      try {
        const atributos = Object.keys(await Genre.rawAttributes)

        expect(atributos).to.have.members(['id', 'name'])
      } catch (error) {
        throw error
      }
    })

    it('deberia evitar crear registros con valores nulos', async () => {
      try {
        await Genre.create({})
        throw new Error('No debia crear un registro')
      } catch (error) {
        expect(error.message).to.include('cannot be null')
      }
    })

    it('deberia crear un registro exitosamente', async () => {
      try {
        await Genre.create({ id: 102, name: 'MMO' })
      } catch (error) {
        throw error
      }
    })
  })
})
