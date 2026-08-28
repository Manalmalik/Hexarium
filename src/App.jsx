import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import WitchesListPage from './pages/WitchesListPage'
import SpellsListPage from './pages/SpellsListPage'
import WitchDetailsPage from './pages/WitchDetailsPage'
import AddWitchPage from './pages/AddWitchPage'
import EditWitchPage from './pages/EditWitchPage'
import Navbar from './components/Navbar'
import bgMusic from './assets/bgMusic.m4a'
import SpellDetailsPage from './pages/SpellDetailsPage'
import ElixirsDetailsPage from './pages/ElixirsDetailsPage'

function App() {

  return (
    <div className='main-container'>
      <Navbar/>
      <audio controls loop>
        <source src={bgMusic} type="audio/mpeg" />
        Your browser does not support audio.
      </audio>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/witches" element={<WitchesListPage />} />
        <Route path="/spells" element={<SpellsListPage />} />
        <Route path="/witches/:id" element={<WitchDetailsPage />} />
        <Route path="/witches/create" element={<AddWitchPage />} />
        <Route path="/witches/edit/:id" element={<EditWitchPage />} />
        <Route path="/spells/:id" element={<SpellDetailsPage />} />
        <Route path="/elixirs" element={<ElixirsDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
