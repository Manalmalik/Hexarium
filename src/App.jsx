import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import WitchesListPage from './pages/WitchesListPage'
import SpellsListPage from './pages/SpellsListPage'
import WitchDetailsPage from './pages/WitchDetailsPage'
import AddWitchPage from './pages/AddWitchPage'
import EditWitchPage from './pages/EditWitchPage'
import Navbar from './components/Navbar'

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
        <Route path="/witches/edit/:id" element={<EditWitchPage />} />

      </Routes>
    </div>
  )
}

export default App
