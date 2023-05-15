const { getGames } = require('../utils/getGames.js')

module.exports = async (req, res) => {
  try {
    const { name } = req.query
    const results = await getGames(name || '')

    res.status(200).json({ results })
  } catch (error) {
    const { status, message } = error
    res.status(status || 500).json({ message })
  }
}
