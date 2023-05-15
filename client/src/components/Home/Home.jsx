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
      <h1>Home</h1>
      <p>buscador loco de videojuegos 0.1~delta</p>
      <Games />
    </>
  )
}

export default Home
