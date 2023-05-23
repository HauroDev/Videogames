const { Genre } = require('../../db')
const { customError } = require('../../utils/customError')

module.exports = async (req, res) => {
  try {
    const genre = { ...req.body }

    let gen = await Genre.findByPk(genre.id)

    console.log(gen)

    if (gen) throw customError(409, 'este genero ya existe.')

    gen = await Genre.create(genre)

    res.status(201).json({
      message: 'El genero se agrego correctamente',
      genre: gen.toJSON()
    })
  } catch (error) {
    const { message, status } = error
    res.status(status || 500).json({ message })
  }
}
