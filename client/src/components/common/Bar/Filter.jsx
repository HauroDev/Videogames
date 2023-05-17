import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortGames } from '../../../redux/actions'

const Filter = () => {
  const [toggle, setToggle] = useState('🠗')
  const [indicador, setIndicador] = useState('Descendente')

  const dispatch = useDispatch()

  const handlerClick = () => {
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
  return (
    <div>
      <div>
        <p>Ordenar Alfabeticamente</p>
        <button onClick={handlerClick}>
          {toggle} <span>{indicador}</span>
        </button>
      </div>
    </div>
  )
}

export default Filter
