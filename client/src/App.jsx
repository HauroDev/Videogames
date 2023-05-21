import { Route, Routes } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing/Landing'
import Games from './components/Games/Games'
import Form from './components/Form/Form'
import Detail from './components/Detail/Detail'
import Header from './components/common/Bar/Header/Header'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Games />} />
          <Route path='/form' element={<Form />} />
          <Route path='/detail/:idVideogame' element={<Detail />} />
        </Routes>
      </main>
    </>
  )
}

export default App
