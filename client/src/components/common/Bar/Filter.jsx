import useFilter from '../hooks/useFilter'

const Filter = () => {
  const {
    filtro,
    genres,
    handlerChange,
    addGenre,
    removeGenre,
    handlerSubmit
  } = useFilter()

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <p>Orden:</p>
        <select name='alpha' onChange={handlerChange}>
          <option value='⯀'>Normal</option>
          <option value='🠕'>A-Z</option>
          <option value='🠗'>Z-A</option>
        </select>
        <select name='rating' onChange={handlerChange}>
          <option value='⯀'>Normal</option>
          <option value='🠕'>Mayor</option>
          <option value='🠗'>Menor</option>
        </select>
      </div>

      <div>
        <p>Filtrar por:</p>
        <select name='source' onChange={handlerChange}>
          <option value='All'>Todos</option>
          <option value='DB'>Base de Datos</option>
          <option value='API'>RAWG</option>
        </select>
        <select name='genres' defaultValue='0' onChange={addGenre}>
          <option value='0' disabled hidden>
            Selecciona una opción
          </option>
          {genres?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <div>
          {filtro.gens.map((gen) => (
            <div key={gen.id}>
              {gen.name}
              <button onClick={() => removeGenre(gen.id)}>x</button>
            </div>
          ))}
        </div>
      </div>

      <button type='submit'>Aplicar filtros</button>
    </form>
  )
}

export default Filter
