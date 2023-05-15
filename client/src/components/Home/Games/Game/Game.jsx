import { NavLink } from 'react-router-dom'
import styles from './Game.module.css'

const Game = ({ id, name, image, rating }) => {
  return (
    <NavLink to={`/detail/${id}`}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <img className={styles.image} src={image} alt={name} />
        <p>Rating: {rating}</p>
      </div>
    </NavLink>
  )
}

export default Game
