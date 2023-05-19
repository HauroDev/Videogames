import { useLocation } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SearchBar from '../SearchBar/SearchBar'

import styles from './Header.module.css'

const Header = () => {
  const { pathname: ubicacion } = useLocation()

  return (
    <header className={ubicacion !== '/' && styles.header}>
      {ubicacion !== '/' && (
        <>
          <NavBar />
          {ubicacion === '/home' && (
            <>
              <SearchBar />
            </>
          )}
        </>
      )}
    </header>
  )
}

export default Header
