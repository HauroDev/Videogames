import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortGames, sourceGames } from '../../../redux/actions'

const Filter = () => {
  const [toggle, setToggle] = useState('🠗')
  const [indicador, setIndicador] = useState('Descendente')
  const [source, setSource] = useState('DB')

  const dispatch = useDispatch()

  const handlerSort = () => {
    setToggle((prevState) => {
      if (prevState === '⯀') return '🠗'
      if (prevState === '🠗') return '🠕'
      if (prevState === '🠕') return '⯀'
    })
    setIndicador(() => {
      if (toggle === '⯀') return 'Descendente'
      if (toggle === '🠗') return 'Ascendente'
      if (toggle === '🠕') return 'Normal'
    })
    dispatch(sortGames(toggle))
  }

  const handlerSource = () => {
    setSource((prev) => {
      switch (prev) {
        case 'All':
          return 'DB'
        case 'DB':
          return 'API'
        case 'API':
        default:
          return 'All'
      }
    })
    dispatch(sourceGames(source))
  }

  return (
    <div>
      <div>
        <p>Orden:</p>
        <button onClick={handlerSort}>
          Alfabetico: {toggle} {indicador}
        </button>
      </div>

      <div>
        <p>Filtrar por:</p>
        <button onClick={handlerSource}>Fuente: {source}</button>
      </div>
    </div>
  )
}

export default Filter
