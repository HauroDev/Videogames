import { useLocation } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

import styles from './Header.module.css'
import Filter from '../Filter/Filter'

const Header = () => {
  const { pathname: ubicacion } = useLocation()

  return (
    <header className={ubicacion !== '/' && styles.header}>
      {ubicacion !== '/' && <NavBar />}
      {ubicacion === '/home' && <Filter />}
    </header>
  )
}

export default Header
