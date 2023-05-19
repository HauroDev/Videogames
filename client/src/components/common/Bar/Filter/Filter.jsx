import { useState } from 'react'
import useFilter from '../../hooks/useFilter'
import styled from './Filter.module.css'

const Filter = () => {
  const {
    filtro,
    genres,
    handlerChange,
    addGenre,
    removeGenre,
    handlerSubmit
  } = useFilter()

  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <form className={styled.form} onSubmit={handlerSubmit}>
      <button className={styled.button} onClick={toggleFilter}>
        {!isFilterOpen ? 'Ocultar filtro' : 'Mostrar filtro'}
      </button>

      <div hidden={isFilterOpen}>
        <div className={styled.div}>
          <p className={styled.p}>Orden:</p>
          <div className={styled.div}>
            <label className={styled.label} htmlFor='alpha'>
              Alfabetico:
            </label>
            <select
              className={styled.select}
              name='alpha'
              onChange={handlerChange}
            >
              <option value='⯀'>Normal</option>
              <option value='🠕'>A-Z</option>
              <option value='🠗'>Z-A</option>
            </select>
          </div>

          <div className={styled.div}>
            <label className={styled.label} htmlFor='rating'>
              Clasificacion:{' '}
            </label>
            <select
              className={styled.select}
              name='rating'
              onChange={handlerChange}
            >
              <option value='⯀'>Normal</option>
              <option value='🠕'>Mayor</option>
              <option value='🠗'>Menor</option>
            </select>
          </div>
        </div>

        <div className={styled.div}>
          <p className={styled.p}>Filtrar por:</p>
          <div className={styled.div}>
            <label className={styled.label} htmlFor='source'>
              Servidor:
            </label>
            <select
              className={styled.select}
              name='source'
              onChange={handlerChange}
            >
              <option value='All'>Todos</option>
              <option value='DB'>Base de Datos</option>
              <option value='API'>RAWG</option>
            </select>
          </div>
          <div className={styled.div}>
            <label className={styled.label} htmlFor='genres'>
              Generos:
            </label>
            <select
              className={styled.select}
              name='genres'
              onChange={addGenre}
              multiple
            >
              {genres?.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <div>
              {filtro.gens.map((gen) => (
                <div  key={gen.id}>
                  <p>{gen.name}</p>
                  <button onClick={() => removeGenre(gen.id)}>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type='submit'>Aplicar filtros</button>
      </div>
    </form>
  )
}

export default Filter
