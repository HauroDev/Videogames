const { Genre } = require('../../db')
const { customError } = require('../../utils/customError')

module.exports = async (req, res) => {
  try {
    const { idGenre } = req.params
    const modifications = { ...req.body }

    const genre = await Genre.findByPk(idGenre)

    if (!genre) throw customError(404, 'el genero no fue encontrado')

    for (let prop in modifications)
      if (genre[prop]) genre[prop] = modifications[prop]

    await genre.save()

    res
      .status(200)
      .json({ message: 'El genero fue modificado con exito', genre: genre.toJSON() })
  } catch (error) {
    const { message, status } = error
    res.status(status || 500).json({ message })
  }
}