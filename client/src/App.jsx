import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import Header from './components/Home/Header/Header'

function App() {
  const { pathname: ubicacion } = useLocation()
  return (
    <>
      {ubicacion !== '/' && <Header />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </>
  )
}

export default App
