import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/home'>Pagina Principal</NavLink>
        </li>
        <li>
          <NavLink to='/form'>Cargar Juego</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
