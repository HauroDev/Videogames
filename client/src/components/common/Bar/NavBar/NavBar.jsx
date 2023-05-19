import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink to='/home'>Pagina Principal</NavLink>
        </li>
        <li className={styles.li}>
          <NavLink to='/form'>Cargar Juego</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
