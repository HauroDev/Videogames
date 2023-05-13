const { getGameForId } = require('../utils/getGameForId')

module.exports = async (req, res) => {
  const { idVideogame } = req.params
  try {
    const game = await getGameForId(idVideogame)

    res.status(200).json(game)
  } catch (error) {
    const { message, status } = error
    res.status(status || 500).json({ message })
  }
}
