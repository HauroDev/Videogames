import { getCurrentDate } from '../../utils/date'
import styles from './Form.module.css'
import useGameForm from './hooks/useGameForm'

const Form = () => {
  const {
    gameInfo,
    gamePost,
    error,
    response,
    inputRef,
    gens,
    addGenre,
    removeGenre,
    addPlatform,
    removePlatform,
    handleChange,
    handleSubmit
  } = useGameForm()
  return (
    <div className={styles.display} >
      <div>
        <h1>Formulario</h1>
        <p>Carga información sobre tu videojuego</p>
      </div>

      {response && (
        <p className={gamePost.status === 201 ? styles.done : styles.error}>
          {gamePost?.message}
        </p>
      )}

      <div className={styles.contenedor}>

        <div className={`${error.status ? styles.reject : styles.hidden}`}>
          {Object.values(error).map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>

        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.data}>
            <label htmlFor='name'>Titulo del juego: </label>

            <input
              className={styles.input}
              name='name'
              placeholder='Nombre del juego'
              type='text'
              onChange={handleChange}
              value={gameInfo.name}
            />
          </div>

          <div className={styles.data}>
            <label htmlFor='description'>Descripcion: </label>

            <textarea
              name='description'
              placeholder='Descripcion del juego...'
              onChange={handleChange}
              value={gameInfo.description}
            />
          </div>

          <div className={styles.data}>
            <label htmlFor='platforms'>Plataformas: </label>
            <input
              className={styles.data}
              ref={inputRef}
              name='platforms'
              placeholder='Para agregar oprima "Enter" '
              type='text'
              onClick={(event) => addPlatform(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addPlatform(event.target.value)
                }
              }}
            />
            <button
              type='button'
              onClick={() => addPlatform(inputRef.current.value)}
            >
              +
            </button>
          </div>
          <section className={styles.tags}>
            {gameInfo.platforms?.map((plat) => (
              <article
                className={styles['tag-item']}
                key={plat}
                onClick={() => removePlatform(plat)}
              >
                {plat}
              </article>
            ))}
          </section>

          <div className={styles.data}>
            <label htmlFor='image'>Carga una imagen del juego: </label>

            <input
              name='image'
              placeholder='ingrese URL de la imagen'
              type='text'
              onChange={handleChange}
              value={gameInfo.image}
            />
          </div>

          <div className={styles.data}>
            <label htmlFor='released'>Fecha de lanzamiento: </label>
            <input
              name='released'
              type='date'
              max={getCurrentDate()}
              onChange={handleChange}
              value={gameInfo.released}
            />
          </div>

          <div>
            <label htmlFor='rating'>Rating: </label>
            <input
              name='rating'
              type='number'
              min='0'
              max='5'
              step='0.01'
              onChange={handleChange}
              value={gameInfo.rating}
            />
          </div>

          <div>
            <label htmlFor='genres'>Géneros: </label>
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

            <section className={styles.tags}>
              {gameInfo.genres.map((gen) => (
                <article className={styles['tag-item']} key={gen.id}>
                  {gen.name}
                  <button onClick={() => removeGenre(gen.id)}>x</button>
                </article>
              ))}
            </section>
          </div>

          <button type='submit' disabled={error.status}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
