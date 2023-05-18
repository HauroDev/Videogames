import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanGenres, filterGames, getGenres } from '../../../redux/actions'

const Filter = () => {
  const [filtro, setFiltro] = useState({
    alpha: '⯀',
    rating: '⯀',
    source: 'All',
    gens: []
  })

  const dispatch = useDispatch()
  const { genres } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getGenres())
    return () => dispatch(cleanGenres())
  }, [])

  const handlerChange = ({ target: { value, name } }) => {
    console.log(name + ': ' + value)

    setFiltro({ ...filtro, [name]: value })
  }

  const addGenre = ({ target: { value } }) => {
    let gen = genres.find((g) => g.id === +value)
    setFiltro({
      ...filtro,
      gens: !filtro.gens.some((g) => g.id === +gen.id)
        ? [...filtro.gens, gen]
        : [...filtro]
    })
  }

  const removeGenre = (id) => {
    const updateGenres = filtro.gens.filter((gen) => gen.id !== +id)
    setFiltro({ ...filtro, gens: updateGenres })
  }

  const handlerSubmit = (event) => {
    event.preventDefault()
    dispatch(filterGames({ ...filtro }))
  }

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
