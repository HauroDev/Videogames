import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanGenres, filterGames, getGenres } from '../../../redux/actions'

const useFilter = () => {
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

  return {
    filtro,
    genres,
    handlerChange,
    addGenre,
    removeGenre,
    handlerSubmit
  }
}

export default useFilter
