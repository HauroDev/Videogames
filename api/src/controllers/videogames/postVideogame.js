const { postGame } = require('../../utils/postGame')

module.exports = async (req, res) => {
  try {
    const game = await postGame(req.body)

    res
      .status(201)
      .json({ game, message: 'Juego cargado correctamente', status: 201 })
  } catch (error) {
    const { message, status } = error

    res.status(status || 500).json({ message })
  }
}
