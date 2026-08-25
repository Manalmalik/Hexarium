import { NavLink, useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate()

    const handleImageClick = () => {
        navigate("/")
    }
  return (
    <div className="navbar-container">
      <div>
        <img src="src/assets/logo.png" onClick={handleImageClick}/>
      </div>
      <div className="nav-links">
        <NavLink to="/witches"> Witches </NavLink>
        <NavLink to="/spells"> Spells </NavLink>
        <NavLink to="/elixirs"> Elixirs </NavLink>
      </div>
      <div>
        {/* <NavLink to="/create" className="button-default"> + Add a witch </NavLink> */}
        <NavLink to="/witches/create" className="button-default"> + Add a witch </NavLink>
      </div>
    </div>
  )
}

export default Navbar
