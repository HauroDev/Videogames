import { Route, Routes, BrowserRouter } from 'react-router-dom'

import './App.css'
import Landing from './components/Landing'
import Home from './components/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
