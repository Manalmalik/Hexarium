import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import image from "../assets/spell.png"

function SpellDetailsPage() {
  const [spell, setSpell] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_HEXARIUM_API}/spells/${id}`)
      .then((response) => setSpell(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false))
  }, [id])

  const deleteSpell = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_HEXARIUM_API}/spells/${id}`)
      setIsModalOpen(false)
      setIsAlertOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <div className="container"><p>Loading</p></div>
  }

  if (!spell) {
    return <div className="container"><p>Spell not found.</p></div>
  }

  return (
    <div className="container">
      <div className="details-container">
        <div className="details-content-left">
          <div>
            <h1 className="font-xxl">{spell.name}</h1>
            <p className="details-title font-italic font-gold">
              {spell.type}
            </p>
            <p className="details-caption">{spell.description}</p>
            {spell.effect && <p className="details-caption">Effect: {spell.effect}</p>}
            {spell.incantation && (
              <p className="details-caption">Incantation: {spell.incantation}</p>
            )}
          </div>
          <div className="action-buttons">
            <button className="button-default" onClick={() => navigate("/spells")}>
              Back to spells
            </button>
            <button className="button-destructive" onClick={() => setIsModalOpen(true)}>
              Delete this spell
            </button>
          </div>
        </div>
        <div className="content-right">
          <img src={image} alt={spell.name} />
        </div>
      </div>
      <div className="details-content-bottom">
        <h3> Associated Witches </h3>
        <p> Coming Soon </p>
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <p>
              Are you certain you want to delete this spell? This removes the
              record from the current working archive.
            </p>
            <div className="action-buttons">
              <button className="button-default" onClick={() => setIsModalOpen(false)}>
                No, keep spell
              </button>
              <button className="button-destructive" onClick={deleteSpell}>
                Yes, delete the spell
              </button>
            </div>
          </div>
        </div>
      )}

      {isAlertOpen && (
        <div className="alert-container">
          <p>Deleted</p>
          <div onClick={() => navigate("/spells")}>
            <i className="fa-solid fa-close"></i>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpellDetailsPage
