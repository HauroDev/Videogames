import { useLocation } from 'react-router-dom'
import NavBar from './NavBar'
import SearchBar from './SearchBar'

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
            </>
          )}
        </>
      )}
    </header>
  )
}

export default Header
