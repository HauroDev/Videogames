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
    <>
      <h1>Formulario</h1>
      <p>Carga información sobre tu videojuego</p>
      <form className={styles.formulario} onSubmit={handleSubmit}>
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
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='description'>
            Descripción:
          </label>
          <textarea
            name='description'
            onChange={handleChange}
            value={gameInfo.description}
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='platforms'>
            Plataformas:
          </label>
          <input
            ref={inputRef}
            type='text'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addPlatform(event.target.value)
              }
            }}
          />
          <button onClick={() => addPlatform(inputRef.current.value)}>+</button>
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
            Géneros:
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
        </div>

        <button type='submit' disabled={error.status && submitted}>
          Enviar
        </button>
      </form>

      <div className={styles.error} hidden={!submitted || !error.status}>
        {Object.values(error).map((err, index) => (
          <p key={index}>{err}</p>
        ))}
      </div>

      {response && (
        <div className={gamePost?.status === 201 ? styles.good : styles.error}>
          {gamePost?.message}
        </div>
      )}
    </>
  )
}

export default Form
