import { useDispatch } from 'react-redux'
import { getSearch } from '../../../redux/actions'
import { useState } from 'react'

const SearchBar = () => {

  const [name,setName] = useState('')

  const dispatch = useDispatch()

  const handlerSubmit =(event)=>{
    event.preventDefault()
    dispatch(getSearch(name))
  }

  const handlerChange = (event)=>{
    setName(event.target.value)
  }

  return (
    <form onSubmit={handlerSubmit}>
      <label htmlFor='search'>Buscar: </label>
      <input type='text' name='search' onChange={handlerChange} value={name} />
      <button>Buscar juegos</button>
    </form>
  )
}

export default SearchBar
