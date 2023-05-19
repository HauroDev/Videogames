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
    <form onSubmit={handlerSubmit}>
      <button onClick={toggleFilter}>
        {!isFilterOpen ? 'Ocultar filtro' : 'Mostrar filtro'}
      </button>

      <div hidden={isFilterOpen}>
        <div>
          <p>Orden:</p>
          <div>
            <label htmlFor='alpha'>Alfabetico:</label>
            <select name='alpha' onChange={handlerChange}>
              <option value='⯀'>Normal</option>
              <option value='🠕'>A-Z</option>
              <option value='🠗'>Z-A</option>
            </select>
          </div>

          <div>
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
          <div>
            <label htmlFor='source'>Servidor:</label>
            <select name='source' onChange={handlerChange}>
              <option value='All'>Todos</option>
              <option value='DB'>Base de Datos</option>
              <option value='API'>RAWG</option>
            </select>
          </div>
          <div>
            <label htmlFor='genres'>Generos:</label>
            <select name='genres' onChange={addGenre} multiple>
              {genres?.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
            <div>
              {filtro.gens.map((gen) => (
                <div key={gen.id}>
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
