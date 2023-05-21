import { NavLink } from 'react-router-dom'
import styles from './Game.module.css'

const Game = ({ id, name, image, rating }) => {
  return (
    <article className={styles.card}>
      <NavLink to={`/detail/${id}`}>
        <h3 className={styles.title}>{name}</h3>
        <img className={styles.image} src={image} alt={name} />
        <p className={styles.data}>Rating: {rating}</p>
      </NavLink>
    </article>
  )
}

export default Game
