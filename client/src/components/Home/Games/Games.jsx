import { useDispatch, useSelector } from 'react-redux'
import Game from './Game/Game'
import Pagination from './../Pagination/Pagination'

import styles from './Games.module.css'
import { useEffect, useState } from 'react'
import { cleanGames, getGames } from '../../../redux/actions'
import Loading from '../../common/Loading/Loading'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const { allGames } = useSelector((state) => state)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames())
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
    let posInit = 15 * page
    let posFinal = posInit + 15

    if (posFinal > allGames?.length) posFinal = allGames.length

    const array = allGames.slice(posInit, posFinal)
    setGames(array)
  }

  return (
    <>
      {loading ? (
        <Loading message='Cargando...' />
      ) : (
        <>
          <section className={styles.cards}>
            {allGames.message && <p>{allGames.message}</p>}
            {games &&
              games?.map((game) => {
                return <Game {...game} key={game.id} />
              })}
          </section>
          {!allGames.message && (
            <Pagination
              pages={Math.ceil(allGames.length / 15)}
              loadPage={loadPage}
            />
          )}
        </>
      )}
    </>
  )
}

export default Games
