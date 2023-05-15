import { useState } from 'react'

import styles from './Pagination.module.css'

const Pagination = ({ pages, loadPage }) => {
  const [page, setPage] = useState(1)

  const incrementeClick = () => {
    if (page !== pages) {
      setPage(page + 1)
      loadPage(page)
    }
  }
  const decrementeClick = () => {
    if (page !== 1) {
      setPage(page - 1)
      loadPage(page)
    }
  }

  return (
    <div className={styles.container}>
      {page!==1 && <button onClick={decrementeClick}>{'<-'}</button>}
      <p>{`${page} de ${pages}`}</p>
      {page!==pages && <button onClick={incrementeClick} >{'->'}</button>}
    </div>
  )
}

export default Pagination
