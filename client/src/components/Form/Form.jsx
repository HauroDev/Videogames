import { getCurrentDate } from '../../utils/date'
import styles from './Form.module.css'
import useGameForm from './hooks/useGameForm'

const Form = () => {
  const {
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
  } = useGameForm()
  return (
    <div className={styles.contenedor}>
      <div>
        <h1>Formulario</h1>
        <p>Carga información sobre tu videojuego</p>

        <div className={`${styles.error} ${!error.status && styles.hidden}`}>
          {Object.values(error).map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>

        {response && (
          <p className={gamePost?.status === 201 ? styles.good : styles.error}>
            {gamePost?.message}
          </p>
        )}
      </div>

      <div>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.registro}>
            <input
              name='name'
              placeholder='Nombre del juego'
              type='text'
              onChange={handleChange}
              value={gameInfo.name}
            />
          </div>

          <div className={styles.registro}>
            <textarea
              name='description'
              placeholder='Descripcion del juego...'
              onChange={handleChange}
              value={gameInfo.description}
            />
          </div>

          <div className={styles.registro}>
            <input
              ref={inputRef}
              placeholder='Plataformas agrege 1 por 1'
              type='text'
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addPlatform(event.target.value)
                }
              }}
            />
            <button onClick={() => addPlatform(inputRef.current.value)}>
              +
            </button>
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
            <input
              name='image'
              placeholder='ingrese URL de la imagen'
              type='text'
              onChange={handleChange}
              value={gameInfo.image}
            />
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
          </div>

          <div className={styles.registro}>
            <label className={styles.label} htmlFor='rating'>
              Rating:{' '}
              <input
                name='rating'
                type='number'
                min='0'
                max='5'
                step='0.01'
                onChange={handleChange}
                value={gameInfo.rating}
              />
            </label>
          </div>

          <div className={styles.registro}>
            <label className={styles.label} htmlFor='genres'>
              Géneros:{' '}
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
            </label>
            <section className={styles.registro}>
              {gameInfo.genres.map((gen) => (
                <article key={gen.id}>
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
