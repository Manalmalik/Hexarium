import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../components/Card"
import { useNavigate } from "react-router-dom"

function WitchesListPage() {

  const [ allWitches, setAllWitches ] = useState()
  const [ isLoading, setIsLoading ] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchWitchesData()
  }, [])
  
  const fetchWitchesData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/witches`)
      setAllWitches(response.data)
      console.log(response.data[0])
      setIsLoading(false)
    }catch(e) {
      console.log(e)
    }
  }

  const handleCardClick = (id) => {
    navigate(`/witches/${id}`)
  }

  console.log(allWitches, "all ")
  
  return (
    <div className="list-container">
      <div>
        <h1> Witches, Wizards and Impossible Guests</h1>
        <p className="font-italic font-gold"> Enter at your own risk </p>
      </div>
    <div className="cards">
      {isLoading && <p> Loading </p>}
      {allWitches &&
        allWitches.map((witch, index) => {
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
