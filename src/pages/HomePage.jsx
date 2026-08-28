import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import axios from 'axios'
import moonImage from "../assets/fullmoon.png"
import bgImage from "../assets/background.png"

function HomePage() {

    const [moonData, setMoonData] = useState()

    useEffect(() => {
        fetchMoonData()
    }, [])

    const fetchMoonData = async () => {
    try {
        const response = await axios.get(import.meta.env.VITE_WEATHER_API_URL, {
            params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: "Berlin",
            }
        })
        setMoonData(response.data.astronomy.astro)
        console.log(moonData, response.data.astronomy.astro)
    } catch (e) {
        console.log(e)
    }
}

const getMoonIllum = () => {
  return moonData?.moon_illumination >= 98 ? 99 : moonData?.moon_illumination
}


  return (
    <div className="container">
      <div className="homepage-container" style={{backgroundImage: `url(${bgImage})`}}>
        <div className="hompage-left-content">
          <h1>
            <span className="font-xxl"> Enter by </span>
            <br />
            <span className="font-xxl font-gold"> Moonlight </span>
          </h1>
          <p className="font-italic">
            {" "}
            The celestial archive is fully lit. Cross toward the knowledge that
            calls your name. Let the current sky set the temperature, then
            choose the branch of knowledge you want to follow.{" "}
          </p>
        </div>
        <div className="homepage-right-content">
          <img src={moonImage} style={{opacity: moonData?.moon_illumination}}/>
          <div className="accordion">
            <h2> current celestial note </h2>
            <div className="moon-details">
                <div className="moon-details-label">
                    <p className="font-gold font-italic"> Lunar Phase: </p>
                    <p> {moonData?.moon_phase} </p>
                </div>
                <div style={{backgroundColor: `#D9BB78${getMoonIllum()}`}}>
                    <p className="font-gold font-italic"> Illimunation: </p>
                    <p> {moonData?.moon_illumination}% </p>
                </div>
            </div>
            <p className="font-italic">
              {" "}
              What is hidden is not absent. Listen for the shape of the next
              beginning.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="explore-section">
        <div className="explore-section-header">
          <p className="caption"> choose your passage </p>
          <h1>
            <span> Let the realm </span>
            <br />
            <span className="font-gold font-italic"> answer back. </span>
          </h1>
          <p>
            {" "}
            Hexarium is not arranged like an ordinary library. Its knowledge
            drifts in separate celestial chambers, each holding a different kind
            of magic.
          </p>
        </div>
        <Cards />
      </div>
    </div>
  );
}

export default HomePage;
