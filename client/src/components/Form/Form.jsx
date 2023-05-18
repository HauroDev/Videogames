import { useEffect, useRef, useState } from 'react'
import { getCurrentDate } from '../../utils/date'
import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cleanGenres, getGenres, postGame } from '../../redux/actions'
import { validateGame } from '../../utils/validate'

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

const Form = () => {
  const [gameInfo, setGameInfo] = useState(initGame)
  const [error, setError] = useState(initError)

  const inputRef = useRef(null)

  const { genres: gens } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
    return () => dispatch(cleanGenres())
  }, [])

  useEffect(() => {
    console.log(gameInfo)
    console.log(error)
  }, [gameInfo, error])

  const addGenre = (event) => {
    const { value } = event.target
    const gen = gens.find((gen) => gen.id === +value)
    setGameInfo({ ...gameInfo, genres: [...gameInfo.genres, gen] })
    setError(validateGame({ ...gameInfo }))
  }

  const removeGenre = (id) => {
    const updateGenres = gameInfo.genres.filter((gen) => gen.id !== +id)
    setGameInfo({ ...gameInfo, genres: updateGenres })
  }

  const addPlatform = (event) => {
    const {
      key,
      target: { value }
    } = event
    const isFound = gameInfo.platforms.some(
      (plat) => plat.toLowerCase() === value.toLowerCase()
    )

    if (key === 'Enter' || value.slice(-2) === '  ') {
      event.preventDefault()
      if (!isFound && value !== '') {
        setGameInfo({
          ...gameInfo,
          platforms: [...gameInfo.platforms, value.trim()]
        })
        setError(validateGame({ ...gameInfo }))
        inputRef.current.value = ''
      }
    }
  }

  const removePlatform = (name) => {
    const updatePlatforms = gameInfo.platforms.filter((plat) => plat !== name)
    setGameInfo({ ...gameInfo, platforms: updatePlatforms })
  }

  const handleChange = (event) => {
    let { name, value } = event.target

    setGameInfo({ ...gameInfo, [name]: value })
    setError(validateGame({ ...gameInfo, [name]: value }))
  }

  const handlerSubmit = (event) => {
    event.preventDefault()
    console.log(error.status)
    if (!error.status) {
      dispatch(postGame(gameInfo))
      setGameInfo(initGame)
      setError(initError)
    }
  }

  return (
    <>
      <h1>Formulario</h1>
      <p>Carga informacion sobre tu videojuego</p>
      <form className={styles.formulario} onSubmit={handlerSubmit}>
        <div className={styles.registro}>
          <label className={styles.label} htmlFor='name'>
            Nombre del Juego:
          </label>
          <input
            name='name'
            type='text'
            onChange={handleChange}
            value={gameInfo.name}
          />
          {error.name && <p>{error.name}</p>}
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='description'>
            Descripcion:
          </label>
          <textarea
            name='description'
            onChange={handleChange}
            value={gameInfo.description}
          />
          {error.description && <p>{error.description}</p>}
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='platforms'>
            Plataformas:
          </label>
          <input
            ref={inputRef /* es que no queria crear un estado de mas */}
            type='text'
            onKeyDown={addPlatform}
          />
          {error.platforms && <p>{error.platforms}</p>}
        </div>
        <section className={styles.registro}>
          {gameInfo.platforms?.map((plat) => (
            <article key={plat}>
              {plat}
              <button onClick={() => removePlatform(plat)}>x</button>
            </article>
          ))}
        </section>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='image'>
            Poster/Imagen:
          </label>
          <input
            name='image'
            type='text'
            onChange={handleChange}
            value={gameInfo.image}
          />
          {error.image && <p>{error.image}</p>}
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='released'>
            Fecha de lanzamiento:
          </label>
          <input
            name='released'
            type='date'
            max={getCurrentDate()}
            onChange={handleChange}
            value={gameInfo.released}
          />
          {error.released && <p>{error.released}</p>}
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='rating'>
            Rating:
          </label>
          <input
            name='rating'
            type='number'
            min='0'
            max='5'
            step='0.1'
            onChange={handleChange}
            value={gameInfo.rating}
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='genres'>
            Generos:
          </label>
          <select name='genres' defaultValue='0' onChange={addGenre}>
            <option value='0' disabled hidden>
              Selecciona una opción
            </option>
            {gens?.map((obj) => (
              <option key={obj.id} value={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
          <section className={styles.registro}>
            {gameInfo.genres.map((gen) => (
              <article key={gen.id}>
                {gen.name}
                <button onClick={() => removeGenre(gen.id)}>x</button>
              </article>
            ))}
          </section>
          {error.genres && <p>{error.genres}</p>}
        </div>

        <button type='submit' disabled={error.status}>
          Enviar
        </button>
      </form>
    </>
  )
}

export default Form
