import styles from './Loading.module.css'

const Loading = ({ message }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  )
}

export default Loading
