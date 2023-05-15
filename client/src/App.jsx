import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import NavBar from './components/Home/Header/NavBar'
import SearchBar from './components/Home/Header/SearchBar'
import Detail from './components/Detail/Detail'

function App() {
  const { pathname: ubicacion } = useLocation()
  return (
    <>
      {ubicacion !== '/' && (
        <header>
          <NavBar />
          {ubicacion === '/home' && <SearchBar />}
        </header>
      )}
      <main>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
        <Route path='/detail/:idVideogame' element={<Detail />} />
      </Routes>
      </main>
    </>
  )
}

export default App
