const { default: axios } = require('axios')
const getGames = require('../utils/getGames.js')

require('dotenv').config()
const { API_KEY } = process.env

module.exports = async (req, res) => {
  const { name } = req.query
  let results
  try {
    if (!name) results = await getGames()
    else {
      const response = await axios.get(
        `https://api.rawg.io/api/games/?key=${API_KEY}&search=${name}`
      )
      const { data } = response
      results = data
    }

    res.status(200).json({ results })
  } catch (error) {
    const { message } = error
    res.status(500).json({ message })
  }
}
