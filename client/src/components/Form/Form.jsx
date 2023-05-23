import { useEffect } from 'react'
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
    <div className={styles.display}>
      <div>
        <h1>Formulario</h1>
      </div>

      {response && (
        <div className={styles['popup-overlay']}>
          <p className={gamePost.status === 201 ? styles.done : styles.reject}>
            {gamePost?.message}
          </p>
        </div>
      )}

      <div className={styles.contenedor}>
        <form className={styles.formulario} onSubmit={handleSubmit}>
          <div className={styles.data}>
            <label htmlFor='name'>Titulo del juego: </label>

            <input
              name='name'
              placeholder='Nombre del juego'
              type='text'
              onChange={handleChange}
              value={gameInfo.name}
              autoComplete='off'
            />
            {error.name && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.name}
              </p>
            )}
          </div>

          <div className={styles.data}>
            <label htmlFor='description'>Descripcion: </label>
            <textarea
              name='description'
              placeholder='Descripcion del juego...'
              onChange={handleChange}
              value={gameInfo.description}
            />
            {error.description && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.description}
              </p>
            )}
          </div>

          <div className={styles.data}>
            <label htmlFor='platforms'>Plataformas: </label>
            <div className={styles.platforms}>
              <input
                ref={inputRef}
                name='platforms'
                placeholder='Para agregar oprima "Enter"'
                type='text'
                onClick={(event) => addPlatform(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addPlatform(event.target.value)
                  }
                }}
                autoComplete='off'
              />
              <button
                type='button'
                onClick={() => addPlatform(inputRef.current.value)}
              >
                +
              </button>
            </div>
            {error.platforms && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.platforms}
              </p>
            )}
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
              autoComplete='off'
            />
            {error.image && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.image}
              </p>
            )}
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
            {error.released && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.released}
              </p>
            )}
          </div>
          <div className={styles.data}>
            <label htmlFor='rating'>Rating: </label>
            <input
              name='rating'
              type='number'
              onChange={handleChange}
              value={gameInfo.rating}
            />
            {error.rating && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.rating}
              </p>
            )}
          </div>

          <div className={styles.data}>
            <label htmlFor='genres'>Géneros: </label>
            <select name='genres' defaultValue='0' onChange={addGenre}>
              <option value='0'>Seleccione un Genero</option>
              {gens?.map((obj) => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
            {error.genres && (
              <p className={`${error.status ? styles.error : styles.hidden}`}>
                {error.genres}
              </p>
            )}
          </div>

          <section className={styles.tags}>
            {gameInfo.genres.map((gen) => (
              <article
                className={styles['tag-item']}
                key={gen.id}
                onClick={() => removeGenre(gen.id)}
              >
                {gen.name}
              </article>
            ))}
          </section>

          <button className={styles} type='submit' disabled={error.status}>
            Enviar juego
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
