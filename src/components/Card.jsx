import witchImage from "../assets/bloowitch.png"
function Card({ caption, title, description, variant, handleCardClick, id}) {

    const cardVariant = variant ? variant : "basic"

  return (
    <>
    {cardVariant === "basic" ?
    <div className="card-basic" onClick={handleCardClick}>
        <p className="card-caption"> {caption}</p>
        <h1 className="card-title"> {title} </h1>
        <p className="card-desc">
            {description}
            
        </p>
    </div>
    :
    <div className="card" onClick={() => handleCardClick(id)}>
        <img src={witchImage}/>
        <div className="card-overlay"></div>
        <div className="card-content">
            <p className="card-caption"> {caption}</p>
            <h1 className="card-title"> {title} </h1>
            <p className="card-desc">
                {description}
            </p>
        </div>
    </div>
    }

    </>
  );
}

export default Card;
