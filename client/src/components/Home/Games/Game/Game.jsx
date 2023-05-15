import styles from './Game.module.css'

const Game = ({ name, image, rating }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <img className={styles.image} src={image} alt={name} />
      <p>Rating: {rating}</p>
    </div>
  )
}

export default Game
