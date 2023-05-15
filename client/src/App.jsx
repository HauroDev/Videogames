import { Route, Routes } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import Detail from './components/Detail/Detail'
import Header from './components/Home/Bar/Header'

function App() {
  return (
    <>
      <Header />
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
