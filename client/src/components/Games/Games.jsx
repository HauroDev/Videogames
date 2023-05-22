import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import usePagination from './UsePagination'
import { cleanGames, getGames } from '../../redux/actions'
import Loading from '../common/Loading/Loading'
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
    if (!allGames?.length) dispatch(getGames())
    return () => dispatch(cleanGames())
  }, [])

  useEffect(() => {
    return () => setLoading(false)
  }, [allGames])

  return (
    <div className={styles.contenedor}>
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
          <nav className={styles.pagination}>
            <a href='#' className={styles['arrow-page']} onClick={previousPage}>
              &larr;
            </a>
            {(() => {
              const pageNumbers = []
              for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(
                  <a
                    href='#'
                    key={i}
                    className={`${styles['number-page']} ${
                      currentPage === i
                        ? `${styles.active} ${styles['select-page']}`
                        : ''
                    }`}
                    onClick={() => goToPage(i)}
                  >
                    {i + 1}
                  </a>
                )
              }
              return pageNumbers
            })()}
            <a href='#' className={styles['arrow-page']} onClick={nextPage}>
              &rarr;
            </a>
          </nav>
        </>
      )}
    </div>
  )
}

export default Games
