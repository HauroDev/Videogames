const { postGame } = require('../utils/postGame')

module.exports = async (req, res) => {
  try {
    const game = await postGame(req.body)

    res.status(201).json(game)
  } catch (error) {
    const { message, status } = error

    res.status(status || 500).json({ message })
  }
}
