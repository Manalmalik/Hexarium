import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WitchDetailsPage() {
  const [witch, setwitch] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchWitchData();
  });

  const fetchWitchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/witches/${id}`);
      setwitch(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h1> We have found what you are looking for </h1>
      <p className="font-italic font-gold"> Beware: you are in for a scare </p>
      <div className="details-card">
        <h1> {witch?.name} </h1>
        <p className="caption"> {witch?.title} </p>
        <p> {witch?.type} </p>
      </div>
    </div>
  );
}

export default WitchDetailsPage;
