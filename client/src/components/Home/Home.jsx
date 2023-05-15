import { useDispatch } from 'react-redux'
import Games from './Games/Games'
import { useEffect } from 'react'
import { getGames } from '../../redux/actions'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames())
  }, [])

  return (
    <>
      <p>Buscador de juegos</p>
      <Games />
    </>
  )
}

export default Home
