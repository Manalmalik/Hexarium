import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Cards() {
    const navigate = useNavigate()
    const handleCardClick = () => {
        navigate(`/${witchesContent.title}`)
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
        <Card caption={witchesContent.caption} title={witchesContent.title} description={witchesContent.description} handleCardClick={handleCardClick}/>
        <Card caption={spellsContent.caption} title={spellsContent.title} description={spellsContent.description} handleCardClick={handleCardClick}/>
        <Card caption={elixirsContent.caption} title={elixirsContent.title} description={elixirsContent.description} handleCardClick={handleCardClick}/>
    </div>
  )
}
