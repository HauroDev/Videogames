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
      <h1>Juegos</h1>
      {loading ? (
        <Loading message='Cargando...' />
      ) : (
        <div>
          <section className={styles.cards}>
            {allGames.message && <p>{allGames.message}</p>}
            {getPageItems(currentPage) &&
              getPageItems(currentPage)?.map((game) => {
                return <Game {...game} key={game.id} />
              })}
          </section>
          <div>
            <button onClick={previousPage}>{'<-'}</button>

            <div>
              <ul>
                {(() => {
                  const pageNumbers = []
                  for (let i = 0; i < totalPages; i++) {
                    pageNumbers.push(
                      <li key={i}>
                        <button onClick={() => goToPage(i)}>{i + 1}</button>
                      </li>
                    )
                  }
                  return pageNumbers
                })()}
              </ul>
            </div>

            <button onClick={nextPage}>{'->'}</button>
          </div>
        </div>
      )}
    </>
  )
}

export default Games
