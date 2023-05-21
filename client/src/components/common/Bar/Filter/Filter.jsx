import { useState } from 'react'
import useFilter from '../../hooks/useFilter'
import styles from './Filter.module.css'

const Filter = () => {
  const {
    filtro,
    genres,
    handlerChange,
    addGenre,
    removeGenre,
    handlerSubmit
  } = useFilter()

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className={styles.contenedor}>
      <button className={styles['toggle-button']} onClick={toggleFilter}>
        {isFilterOpen ? 'Ocultar filtro' : 'Mostrar filtro'}
      </button>
      <form
        className={`${styles.show} ${!isFilterOpen ? styles.hidden : ''}`}
        onSubmit={handlerSubmit}
      >
        <div className={styles.options}>
          <div>
            <p>Orden:</p>
            <div className={styles.option}>
              <label htmlFor='alpha'>Alfabetico:</label>
              <select name='alpha' onChange={handlerChange}>
                <option value='⯀'>Normal</option>
                <option value='🠕'>A-Z</option>
                <option value='🠗'>Z-A</option>
              </select>
            </div>

            <div className={styles.option}>
              <label htmlFor='rating'>Clasificacion: </label>
              <select name='rating' onChange={handlerChange}>
                <option value='⯀'>Normal</option>
                <option value='🠕'>Mayor</option>
                <option value='🠗'>Menor</option>
              </select>
            </div>
          </div>

          <div>
            <p>Filtrar por:</p>
            <div className={styles.option}>
              <label htmlFor='source'>Servidor:</label>
              <select name='source' onChange={handlerChange}>
                <option value='All'>Todos</option>
                <option value='DB'>Base de Datos</option>
                <option value='API'>RAWG</option>
              </select>
            </div>
            <div className={styles.option}>
              <label htmlFor='genres'>Generos:</label>
              <select name='genres' onChange={addGenre}>
                {genres?.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.tags}>
          {filtro.gens.map((gen) => (
            <div
              className={styles['tag-item']}
              key={gen.id}
              onClick={() => removeGenre(gen.id)}
            >
              {gen.name}
            </div>
          ))}
        </div>
        <button type='submit'>Aplicar filtros</button>
      </form>
    </div>
  )
}

export default Filter
