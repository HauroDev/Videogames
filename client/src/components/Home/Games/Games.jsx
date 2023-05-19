import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import usePagination from './UsePagination'
import { cleanGames, getGames } from '../../../redux/actions'
import Loading from '../../common/Loading/Loading'
import Game from './Game/Game'

import styles from './Games.module.css'

const Games = () => {
  const { allGames } = useSelector((state) => state)
  const {
    currentPage,
    totalPages,
    getPageItems,
    nextPage,
    previousPage,
    goToPage
  } = usePagination(allGames, 15)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames())
    return () => {
      dispatch(cleanGames())
    }
  }, [])

  useEffect(() => {
    return () => setLoading(false)
  }, [allGames])

  return (
    <>
      <div className={styles.container}>
        <h1>Juegos</h1>
        {loading ? (
          <Loading message='Cargando...' />
        ) : (
          <>
            <div className={styles.games}>
              {allGames.message && <p>{allGames.message}</p>}
              {getPageItems(currentPage)?.map((game) => {
                return <Game {...game} key={game.id} />
              })}
            </div>
            <ul className={styles.ul}>
              <li className={styles.li} onClick={previousPage}>
                {'<-'}
              </li>
              {(() => {
                const pageNumbers = []
                for (let i = 0; i < totalPages; i++) {
                  pageNumbers.push(
                    <li
                      key={i}
                      className={`${styles.li} ${
                        currentPage === i ? styles.active : ''
                      }`}
                      onClick={() => goToPage(i)}
                    >
                      {i + 1}
                    </li>
                  )
                }
                return pageNumbers
              })()}
              <li className={styles.li} onClick={nextPage}>
                {'->'}
              </li>
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Games
