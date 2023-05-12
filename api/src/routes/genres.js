const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
  try {
    res.status(200)
  } catch (error) {
    const { message } = error
    res.status(500).json({ message })
  }
})

module.exports = router
