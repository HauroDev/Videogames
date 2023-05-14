import { useNavigate } from 'react-router-dom'

const Landing = () => {

  const navigate = useNavigate()

  const goHome = ()=>{
    navigate('/home')
  }

  return (
    <div>
      <h1>Bienvenido a la mejor pagina web del mundo</h1>
      <button onClick={goHome}>click para entrar</button>
    </div>
  )
}

export default Landing
