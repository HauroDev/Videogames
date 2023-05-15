import { useSelector } from 'react-redux'
import Game from './Game/Game'
import Pagination from './../Pagination/Pagination'

import styles from './Games.module.css'
import { useEffect, useState } from 'react'

const Games = () => {
  const { allGames } = useSelector((state) => state)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setGames(allGames.slice(0, 15))
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
            {games &&
              games.map((game) => {
                return <Game {...game} key={game.id} />
              })}
          </div>
          <Pagination
            pages={Math.floor(allGames.length / 15)}
            loadPage={loadPage}
          />
        </>
      )}
    </>
  )
}

export default Games
