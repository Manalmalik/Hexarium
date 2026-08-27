import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import WitchesListPage from './pages/WitchesListPage'
import SpellsListPage from './pages/SpellsListPage'
import WitchDetailsPage from './pages/WitchDetailsPage'
import AddWitchPage from './pages/AddWitchPage'

function App() {

  return (
    <div className='main-container'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/witches" element={<WitchesListPage />} />
        <Route path="/spells" element={<SpellsListPage />} />
        <Route path="/witches/:id" element={<WitchDetailsPage />} />
        <Route path="/witches/create" element={<AddWitchPage />} />
      </Routes>
    </div>
  )
}

export default App
