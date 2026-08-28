import axios, { all } from "axios"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"
import Search from "../components/Search"

function WitchesListPage() {

  const [ allWitches, setAllWitches ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ searchTerm, setSearchTerm ] = useState("")
  const [ filteredWitches, setFilteredWitches ] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchWitchesData()
  }, [])
  
  const fetchWitchesData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/witches`)
      setAllWitches(response.data)
      setFilteredWitches(response.data)
      console.log(response.data[0])
      setIsLoading(false)
    }catch(e) {
      console.log(e)
    }
  }

  const handleCardClick = (id) => {
    navigate(`/witches/${id}`)
  }

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleEnterKeyPress = (e) => {
    if(e.key !== "Enter") return

    const searchResult = allWitches.filter((witch) => witch.name.toLowerCase().includes(searchTerm))
    setFilteredWitches(searchResult)
    
    console.log(filteredWitches, "filtered")
  }
  
  return (
    <div className="list-container">
      <div className="list-header">
        <h1> Witches, Wizards and Impossible Guests</h1>
        <p className="font-italic font-gold"> Search the witch's working index by name. Narrow the constellation when you know what kind of magic you are seeking.</p>
        <Search searchTerm={searchTerm} handleSearchInput={handleSearchInput} handleEnterKeyPress={handleEnterKeyPress}/>
      </div>
    <div className="cards">
      {isLoading && <p> Loading </p>}
      {allWitches &&
        filteredWitches.map((witch, index) => {
          return (
              <Card key={index} title={witch.name} description={witch.coven} caption={witch.type} variant="witch" handleCardClick={handleCardClick} id={witch.id}/>
          )
        })
      }
    </div>
    </div>
  )
}

export default WitchesListPage
