import { useDispatch } from 'react-redux'
import { getSearch } from '../../../../redux/actions'
import { useState } from 'react'

import styles from './SearchBar.module.css'

const SearchBar = () => {
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handlerSubmit = (event) => {
    event.preventDefault()
    dispatch(getSearch(name))
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
