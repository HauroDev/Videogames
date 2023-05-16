import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import SearchBar from './SearchBar'
import Filter from './Filter'

const Header = () => {
  const { pathname: ubicacion } = useLocation()

  return (
    <header>
      {ubicacion !== '/' && (
        <>
          <NavBar />
          {ubicacion === '/home' && (
            <>
              <SearchBar />
              <Filter />
            </>
          )}
        </>
      )}
    </header>
  )
}

export default Header
