import { useDispatch, useSelector } from 'react-redux'
import Game from './Game/Game'
import Pagination from './../Pagination/Pagination'

import styles from './Games.module.css'
import { useEffect, useState } from 'react'
import { cleanGames } from '../../../redux/actions'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const { allGames } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(cleanGames())
    }
  }, [])

  useEffect(() => {
    if (allGames.length) setGames(allGames.slice(0, 15))
    else setGames([])
    return () => setLoading(false)
  }, [allGames])

  const loadPage = (page) => {
    const skiped = 15 * page
    const array = allGames.slice(skiped, skiped + 15)
    setGames(array)
  }

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <div className={styles.cards}>
            {allGames.message && <p>{allGames.message}</p>}
            {games &&
              games.map((game) => {
                return <Game {...game} key={game.id} />
              })}
          </div>
          {!allGames.message && (
            <Pagination
              pages={Math.floor(allGames.length / 15)}
              loadPage={loadPage}
            />
          )}
        </>
      )}
    </>
  )
}

export default Games
