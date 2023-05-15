import { getCurrentDate } from '../../utils/date'
import styles from './Form.module.css'

const Form = () => {
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
          <input name='name' type='text' />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='description'>
            Descripcion:{' '}
          </label>
          <textarea name='description' />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='platforms'>
            Plataformas:{' '}
          </label>

          <select name='platforms'>
            <option value='1'>platform 1</option>
            <option value='2'>platform 2</option>
            <option value='3'>platform 3</option>
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
          <input name='released' type='date' max={getCurrentDate()} />
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
            defaultValue='0'
          />
        </div>

        <div className={styles.registro}>
          <label className={styles.label} htmlFor='genres'>
            Generos:{' '}
          </label>
          <select name='genres'>
            <option value='1'>genre 1</option>
            <option value='2'>genre 2</option>
            <option value='3'>genre 3</option>
          </select>
        </div>
        
        <button>Enviar</button>
      </form>
    </>
  )
}

export default Form
