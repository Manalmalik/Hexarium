import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Cards() {
    const navigate = useNavigate()
    const handleWitchesCardClick = () => {
        navigate(`/${witchesContent.title}`)
    }

    const handleSpellsCardClick = () => {
        navigate(`/${spellsContent.title}`)
    }

    const handleElixirsCardClick = () => {
        navigate(`/${elixirsContent.title}`)
    }

    const witchesContent = {
        title: 'Witches',
        caption: 'The Living Index',
        description: 'Practitioners, keepers and impossible guests'
    }

    const spellsContent = {
        title: 'Spells',
        caption: 'The Spoken Archive',
        description: 'Workings and instructions'
    }

     const elixirsContent = {
        title: 'Elixirs',
        caption: 'The Apothecracy',
        description: 'Coming Soon'
    }

  return (
    <div className="cards-basic">
        <Card caption={witchesContent.caption} title={witchesContent.title} description={witchesContent.description} handleCardClick={handleWitchesCardClick}/>
        <Card caption={spellsContent.caption} title={spellsContent.title} description={spellsContent.description} handleCardClick={handleSpellsCardClick}/>
        <Card caption={elixirsContent.caption} title={elixirsContent.title} description={elixirsContent.description} handleCardClick={handleElixirsCardClick}/>
    </div>
  )
}
