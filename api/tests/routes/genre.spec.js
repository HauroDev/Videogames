const { expect } = require('chai')
const session = require('supertest-session')
const { Genre, conn } = require('../../src/db')
const app = require('../../src/app.js')

const agent = session(app)

let response

describe('Genre routes', () => {
  beforeEach(async () => {
    await conn.sync({ force: true })
  })
  after(async () => {
    await conn.sync({ force: true })
  })

  it('deberia devolver un objeto con la propiedad "genres", este contiene un array', async () => {
    response = await agent.get('/genres')

    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('genres')
    expect(response.body.genres).to.be.an('array').that.is.not.empty
  })

  it('deberia guardarlos en la base de datos', async () => {
    response = await agent.get('/genres')
    let genres = await Genre.findAll()
    genres = genres.map((gen) => gen.toJSON())

    expect(genres).to.be.an('array').that.is.not.empty

    const result = genres.every(
      (gen) => gen.hasOwnProperty('id') && gen.hasOwnProperty('name')
    )
    expect(result).to.be.true
  })
})
