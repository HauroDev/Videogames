import { useEffect, useState } from 'react'
import { getCurrentDate } from '../../utils/date'
import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { cleanGenres, getGenres } from '../../redux/actions'

const initialGame = {
  name: '',
  description: '',
  platforms: [],
  image: '',
  released: '',
  rating: 0,
  genres: []
}

const optionsPlatforms = [
  { id: 4, name: 'PC' },
  { id: 187, name: 'PlayStation 5' },
  { id: 18, name: 'PlayStation 4' },
  { id: 1, name: 'Xbox One' },
  { id: 7, name: 'Nintendo Switch' },
  { id: 21, name: 'Android' }
]

const Form = () => {
  const [gameInfo, setGameInfo] = useState(initialGame)

  const { genres: gens } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
    return () => dispatch(cleanGenres())
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    // tiene que evitar repetir valores de los arrays genres y platforms (id's y name's)

    let flag = Array.isArray(gameInfo[name]) ? 1 : 0

    setGameInfo({
      ...gameInfo,
      [name]: flag ? [...gameInfo[name], value] : value
    })
  }

  const handlerSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <h1>Formulario</h1>
      <p>Carga informacion sobre tu videojuego</p>
      <form className={styles.formulario} onSubmit={handlerSubmit}>
        <div className={styles.registro}>
          <label className={styles.label} htmlFor='name'>
            Nombre del Juego:{' '}
          </label>
          <input
            name='name'
            type='text'
            onChange={handleChange}
            value={gameInfo.name}
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='description'>
            Descripcion:{' '}
          </label>
          <textarea
            name='description'
            onChange={handleChange}
            value={gameInfo.description}
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='platforms'>
            Plataformas:{' '}
          </label>

          <select
            name='platforms'
            defaultValue='Select Platform'
            // onChange={handleChange}
          >
            {optionsPlatforms.map((optPlat) => {
              return (
                <option key={optPlat.id} value={optPlat}>
                  {optPlat.name}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='image'>
            Poster/Imagen:{' '}
          </label>
          <input name='image' type='text' />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='released'>
            Fecha de lanzamiento:{' '}
          </label>
          <input
            name='released'
            type='date'
            max={getCurrentDate()}
            onChange={handleChange}
            value={gameInfo.released}
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='rating'>
            Rating:{' '}
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
            Generos:{' '}
          </label>
          <select name='genres'>
            {gens.map((gen) => {
              return (
                <option key={gen.id} value={gen}>
                  {gen.name}
                </option>
              )
            })}
          </select>
        </div>

        <button>Enviar</button>
      </form>
    </>
  )
}

export default Form
