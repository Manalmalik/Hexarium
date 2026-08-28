import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"
import Search from "../components/Search"

function SpellsListPage() {
  const [allSpells, setAllSpells] = useState([])
  const [filteredSpells, setFilteredSpells] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HEXARIUM_API}/spells`)
      .then((response) => {
        setAllSpells(response.data)
        setFilteredSpells(response.data)
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSpellClick = (id) => {
    navigate(`/spells/${id}`)
  }

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleEnterKeyPress = (event) => {
    if (event.key !== "Enter") return

    const search = searchTerm.trim().toLowerCase()
    const searchResult = allSpells.filter((spell) =>
      String(spell.name ?? "").toLowerCase().includes(search)
    )

    setFilteredSpells(searchResult)
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Spells, Charms and Arcane Workings</h1>
        <p className="font-italic font-gold">
          Search the spell archive by name. Narrow the constellation when you
          know which working you are seeking.
        </p>
        <Search
          searchTerm={searchTerm}
          handleSearchInput={handleSearchInput}
          handleEnterKeyPress={handleEnterKeyPress}
        />
      </div>

      <div className="cards">
        {isLoading && <p>Loading</p>}
        {!isLoading && filteredSpells.length === 0 && <p>No spells found.</p>}
        {filteredSpells.map((spell) => (
          <Card
            key={spell.id}
            title={spell.name}
            description={spell.description}
            caption={spell.type}
            variant="spell"
            handleCardClick={handleSpellClick}
            id={spell.id}
          />
        ))}
      </div>
    </div>
  )
}

export default SpellsListPage
