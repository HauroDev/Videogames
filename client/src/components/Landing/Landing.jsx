import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/home')
  }

  return (
    <>
      <h1>Bienvenido a la mejor pagina web de videojuegos del mundo</h1>
      <p>
        En esta pagina web podras encontrar todo sobre tus juegos favoritos,
      </p>
      <button onClick={goHome}>click para entrar</button>
    </>
  )
}

export default Landing
