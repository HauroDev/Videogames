import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanGenres, getGenres, postGame } from '../../../redux/actions'
import { validateGame } from '../../../utils/validate'

const useGameForm = () => {
  const initGame = {
    name: '',
    description: '',
    platforms: [],
    image: '',
    released: '',
    rating: 0,
    genres: []
  }

  const initError = {
    status: false,
    name: '',
    description: '',
    platforms: '',
    image: '',
    released: '',
    rating: '',
    genres: ''
  }

  const [gameInfo, setGameInfo] = useState(initGame)
  const [error, setError] = useState(initError)
  const [submitted, setSubmitted] = useState(false)
  const [response, setResponse] = useState(false)
  const inputRef = useRef(null)

  const { genres: gens, gamePost } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
    return () => dispatch(cleanGenres())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setResponse(false)
    }, 5000)
    return () => setResponse(true)
  }, [gamePost])

  useEffect(() => {
    setError(validateGame({ ...gameInfo }))
  }, [gameInfo])

  const addGenre = (event) => {
    const { value } = event.target

    if (gameInfo.genres.some((gen) => gen.id === +value)) return

    const genre = gens.find((gen) => gen.id === +value)
    setGameInfo({ ...gameInfo, genres: [...gameInfo.genres, genre] })
  }

  const removeGenre = (id) => {
    setGameInfo({
      ...gameInfo,
      genres: gameInfo.genres.filter((gen) => gen.id !== +id)
    })
  }

  const addPlatform = (value) => {
    const isFound = gameInfo.platforms.some(
      (plat) => plat.toLowerCase() === value.toLowerCase().trim()
    );
  
    if (!isFound && value !== '') {
      setGameInfo({
        ...gameInfo,
        platforms: [...gameInfo.platforms, value.trim()],
      });
      inputRef.current.value = '';
    }
  };

  const removePlatform = (name) => {
    setGameInfo({
      ...gameInfo,
      platforms: gameInfo.platforms.filter((plat) => plat !== name)
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setGameInfo({ ...gameInfo, [name]: value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setSubmitted(true)

    if (!error.status) {
      dispatch(postGame(gameInfo))
      setGameInfo(initGame)
      setError(initError)
      setSubmitted(false)
    }
  }

  return {
    gameInfo,
    gamePost,
    error,
    submitted,
    response,
    inputRef,
    gens,
    addGenre,
    removeGenre,
    addPlatform,
    removePlatform,
    handleChange,
    handleSubmit
  }
}

export default useGameForm
