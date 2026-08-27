import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image  from "../assets/bloowitch.png"

function WitchDetailsPage() {
  const [witch, setwitch] = useState();
  const { id } = useParams();
  const navigate = useNavigate()
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ isAlertOpen, setIsAlertOpen ] = useState(false) 

  useEffect(() => {
    fetchWitchData();
  },[]);

  const fetchWitchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/witches/${id}`);
      setwitch(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteWitch = async () => {
    try{
      const response = await axios.delete(`${import.meta.env.VITE_HEXARIUM_API}/witches/${id}`)
      console.log(response.data)
    }catch(e) {
      console.log(e)
    }
  }
  
  const handleWitchEdit = () => {
    navigate(`/witches/edit/${id}`)
  }
  
  const handleWitchDelete = () => {
    setIsModalOpen(true)
    console.log("delete")
  }
  
  const handleModalClose = () => {
    setIsModalOpen(false)
  }
  
  const handleDeleteAction = () => {
    setIsModalOpen(false)
    deleteWitch()
    setIsAlertOpen(true)
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false)
    navigate("/witches")
  }

  return (
    <div className="container">
      <div className="details-container">
        <div className="details-content-left">
          <div>
            <h1 className="font-xxl"> {witch?.name} </h1>
            <p className="details-title font-italic font-gold"> {witch?.title} </p>
            <p className="details-caption"> {witch?.description} </p>
          </div>
          <div className="action-buttons">
            <button className="button-default" onClick={handleWitchEdit}> Edit this record </button>
            <button className="button-destructive" onClick={handleWitchDelete}> Delete this record </button>
          </div>
        </div>
        <div className="content-right">
          <img src={image} alt={witch?.name}/>
        </div>
      </div>
      <div className="details-card">
      </div>
      {isModalOpen && 
      <div className="modal-backdrop">
        <div className="modal-container">
          <p> Are you certain the keeper wants to delete this record? This removes the record from the current working archive.</p>
          <div className="action-buttons">
              <button className="button-default" onClick={handleModalClose}> No, keep record </button>
              <button className="button-destructive" onClick={handleDeleteAction}> Yes, delete the record </button>
          </div>
        </div>
        </div>
      }
      {isAlertOpen &&
        <div className="alert-container">
          <p> Deleted </p>
          <div onClick={handleAlertClose}>
            <i className="fa-solid fa-close" ></i>
          </div>
        </div>

      }
    </div>
  );
}

export default WitchDetailsPage;
