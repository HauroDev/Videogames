import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink className={styles.navlink} to='/home'>Pagina Principal</NavLink>
        </li>
        <li className={styles.li}>
          <NavLink className={styles.navlink} to='/form'>Cargar Juego</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
