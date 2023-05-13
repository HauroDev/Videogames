const getGames = require('../utils/getGames.js')

module.exports = async (req, res) => {
  try {
    const { name } = req.query
    const results = await getGames(name || '')

    res.status(200).json({ results })
  } catch (error) {
    const { message } = error

    console.log(error)

    res.status(500).json({ message })
  }
}
