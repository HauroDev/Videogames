import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import SearchBar from '../SearchBar/SearchBar'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <NavLink className={styles.navlink} to='/'>Landing</NavLink>
        </li>
        <li className={styles.li}>
          <NavLink className={styles.navlink} to='/home'>Home</NavLink>
        </li>
        <li className={styles.li}>
          <NavLink className={styles.navlink} to='/form'>Form</NavLink>
        </li>
      </ul>
      <SearchBar />
    </nav>
  )
}

export default NavBar
