import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { cleanGameDetails, getGameDetails } from '../../redux/actions'

import styles from './Detail.module.css'

const Detail = () => {
  const { idVideogame } = useParams()

  const { gameDetail } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGameDetails(idVideogame))
    return () => dispatch(cleanGameDetails())
  }, [])

  return (
    <>
      <h1>{gameDetail?.name}</h1>
      <p>Rating: {gameDetail?.rating}</p>
      <p>Fecha de lanzamiento: {gameDetail?.released}</p>
      <img className={styles.image} src={gameDetail?.image} alt={gameDetail?.name} />
      <div dangerouslySetInnerHTML={{ __html: gameDetail?.description }} />
      <p>
        Plataformas: {gameDetail.platforms?.map((plat) => plat.name).join(', ')}
      </p>
      <p>
        Generos: {gameDetail.genres?.map((gen) => gen.name).join(', ')}
      </p>
    </>
  )
}

export default Detail
