import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cleanGames, getSearch } from '../../../../redux/actions'
import { useState } from 'react'

import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handlerSubmit = (event) => {
    event.preventDefault()
    navigate('/home')
    dispatch(getSearch(name))
    dispatch(cleanGames())
  }

  const handlerChange = (event) => {
    setName(event.target.value)
  }

  return (
    <form className={styles['search-bar']} onSubmit={handlerSubmit}>
      <input
        placeholder='Rocket league, etc.'
        type='text'
        name='search'
        onChange={handlerChange}
        value={name}
      />
      <button type='submit'>Buscar</button>
    </form>
  )
}

export default SearchBar
