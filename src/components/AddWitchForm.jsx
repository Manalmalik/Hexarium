import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddWitchForm() {
  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [newWitch, setNewWitch] = useState();

  const [powerInput, setPowerInput] = useState("");
  const [powers, setPowers] = useState([]);
  const [spells, setSpells] = useState([]);
  const navigate = useNavigate();

  const witchTypes = [
    "Seer",
    "Hedge Witch",
    "Alchemist",
    "Storm Caller",
    "Blood Witch",
  ];

  const elements = [
    "Aether",
    "Air",
    "Blood",
    "Earth",
    "Fire",
    "Shadow",
    "Spirit",
    "Water",
  ];

  const ranks = [
    "High Witch",
    "Green Witch",
    "Enchantress",
    "High Priestess",
    "Oracle",
  ];

  const dangerLevels = ["High", "Gentle", "Measured", "Unbound"];

  const statusList = ["Active", "Missing", "Archived", "Under Review"];



  const handleInputChange = (e) => {
    setNewWitch({ ...newWitch, [e.target.id]: e.target.value });
  };

  const handleAddPower = () => {
    if (powerInput.trim() === "") {
      return;
    }
    setNewWitch({ ...newWitch, powers: [...powers, powerInput] });
    setPowerInput("");
  };

  const handlePowerDelete = (powerToRemove) => {
    setPowers(powers.filter((power) => power !== powerToRemove));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newWitch);
    id ? editWitchRecord() : createWitchRecord()
    setNewWitch({});
    navigate("/witches");
  };

  const createWitchRecord = async () => {
    try {
      const response = await axios.post(
       `${import.meta.env.VITE_HEXARIUM_API}/witches`,
        newWitch,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

   const editWitchRecord = async () => {
    try {
      const response = await axios.patch(
       `${import.meta.env.VITE_HEXARIUM_API}/witches/${id}`,
        newWitch,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSpellsData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/spells`);
      console.log(response.data);
      setSpells(response.data);
    } catch (e) {
      console.log(e);
    }
  };

    const fetchExistingWitch = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_HEXARIUM_API}/witches/${id}`)
      return response.data
    }catch(e) {
      console.log(e)
    }
  }

  const loadForm = async () => {

    if(id) {
      const existingWitch = await fetchExistingWitch()
      setNewWitch(existingWitch)
    }else {
      setNewWitch({
        name: "",
        type: "",
        title: "",
        element: "",
        secondaryElement: "",
        speciality: "",
        powers: [],
        rank: "",
        coven: "",
        dangerlevel: "",
        powerLevel: "",
        familiar: "",
        status: "",
        image: "",
        description: "",
        spellIds: [],
        celestialAffinity: [],
    })
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadForm()
    fetchSpellsData()

  }, []);

  console.log(newWitch, id)
  return (
    <div>
      {isLoading === true ? 
        <div> Loading ... </div> 
        : 
        <form onSubmit={handleFormSubmit}>
          <div className="form-card">
            <div className="form-card-header">
              <p className="form-card-title"> 01 / Identity </p>
              <p> The First Naming </p>
              <p className="card-desc">
                {" "}
                Start with the details a fellow keeper will use to recognize this
                witch in the field.{" "}
              </p>
            </div>
            <hr />
            <div className="fields">
              <div className="field">
                <label htmlFor="name"> Witch Name </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newWitch.name}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Use the name that should appear in the index.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="type"> Witch Type </label>
                <select
                  id="type"
                  name="type"
                  value={newWitch.type}
                  onChange={handleInputChange}
                >
                  {witchTypes.map((type, index) => {
                    return (
                      <option value={type} key={index}>
                        {" "}
                        {type}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info">
                  {" "}
                  A practical classification, never a complete definition.{" "}
                </p>
              </div>
              <div className="field form-field--full">
                <label htmlFor="title"> Witch Title </label>
                <input
                  type="text"
                  id="title"
                  value={newWitch.title}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Titles can be inherited, chosen, or still in motion.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="primaryElement"> Primary Element </label>
                <select
                  id="primaryElement"
                  value={newWitch.primaryElement}
                  onChange={handleInputChange}
                >
                  {elements.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {" "}
                        {element}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info">
                  {" "}
                  The element most often present in their workings.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="secondaryElement"> Secondary Element </label>
                <select
                  id="secondaryElement"
                  value={newWitch.secondaryElement}
                  onChange={handleInputChange}
                >
                  {elements.map((element, index) => {
                    return (
                      <option value={element} key={index}>
                        {" "}
                        {element}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info">
                  {" "}
                  A secondary current, season, or celestial influence.{" "}
                </p>
              </div>
              <div className="field form-field--full">
                <label htmlFor="speciality"> Speciality</label>
                <input
                  type="text"
                  id="speciality"
                  value={newWitch.speciality}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Keep this legible to a keeper searching under pressure.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="form-card">
            <div className="form-card-header">
              <p className="form-card-title"> 02 / Magical Profile </p>
              <p> The shape of their power </p>
              <p className="card-desc">
                {" "}
                Use small, precise traces instead of trying to explain an entire
                life in one field.{" "}
              </p>
            </div>
            <hr />
            <div className="fields">
              <div className="field">
                <label htmlFor="rank"> Rank </label>
                <select
                  id="rank"
                  value={newWitch.rank}
                  onChange={handleInputChange}
                >
                  {ranks.map((rank, index) => {
                    return (
                      <option value={rank} key={index}>
                        {" "}
                        {rank}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info"> Recognized standing. </p>
              </div>
              <div className="field">
                <label htmlFor="dangerLevel"> Danger Level </label>
                <select
                  id="dangerLevel"
                  value={newWitch.dangerlevel}
                  onChange={handleInputChange}
                >
                  {dangerLevels.map((rank, index) => {
                    return (
                      <option value={rank} key={index}>
                        {" "}
                        {rank}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info"> A signal, not a sentence. </p>
              </div>
              <div className="field">
                <label htmlFor="powerLevel"> Power Level </label>
                <input
                  type="number"
                  id="powerLevel"
                  min={1}
                  max={10}
                  step={1}
                  value={newWitch.powerLevel}
                  onChange={handleInputChange}
                />
                <p className="field-info"> Current field estimate. </p>
              </div>
              <div className="field">
                <label htmlFor="coven"> Coven </label>
                <input
                  type="text"
                  id="coven"
                  value={newWitch.coven}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Write “solitary” when no circle is known.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="familiar"> Familiar </label>
                <input
                  type="text"
                  id="familiar"
                  value={newWitch.familiar}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  A familiar may be a being, object, or absence.
                </p>
              </div>
              <div className="field form-field--full">
                <label htmlFor="powers"> Powers </label>
                <p className="field-info">
                  {" "}
                  Add each observable power separately. Press Enter or use the
                  plus button.
                </p>
                <div className="form-button-div">
                  <input
                    type="text"
                    id="powers"
                    value={powerInput}
                    onChange={(event) => setPowerInput(event.target.value)}
                  />
                  <button
                    className="button-primary"
                    onClick={handleAddPower}
                    type="button"
                  >
                    {" "}
                    +{" "}
                  </button>
                </div>
                <div className="form-multiselect">
                  {newWitch.powers.map((power) => {
                    return (
                      <div className="form-multiselect-option">
                        <p> {power} </p>
                        <div
                          className="button-secondary"
                          onClick={() => handlePowerDelete(power)}
                        >
                          <i className="fa-solid fa-close"></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="field form-field--full">
                <label htmlFor="description"> Description </label>
                <textarea
                  rows={3}
                  cols={33}
                  id="description"
                  value={newWitch.description}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Write a useful field note: observant, specific, and kind.
                </p>
              </div>
            </div>
          </div>
          <div className="form-card">
            <div className="form-card-header">
              <p className="form-card-title"> 03 / Archive Metadata </p>
              <p> Leave a reliable trail </p>
              <p className="card-desc">
                {" "}
                Relationships and provenance make a record useful long after the
                first encounter.{" "}
              </p>
            </div>
            <hr />
            <div className="fields">
              <div className="field">
                <label htmlFor="status"> Status </label>
                <select
                  id="status"
                  value={newWitch.status}
                  onChange={handleInputChange} defaultValue={newWitch.status}
                >
                  {statusList.map((status, index) => {
                    return (
                      <option value={status} key={index}>
                        {" "}
                        {status}{" "}
                      </option>
                    );
                  })}
                </select>
                <p className="field-info">
                  {" "}
                  The record's current archival state.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="imageUrl"> Image Url </label>
                <input
                  type="text"
                  id="imageUrl"
                  value={newWitch.image}
                  onChange={handleInputChange}
                />
                <p className="field-info">
                  {" "}
                  Optional. A portrait or field photograph.{" "}
                </p>
              </div>
              <div className="field">
                <label htmlFor="spellIds"> Spells </label>
                <p className="field-info"> Connect known workings </p>
                <select
                  id="spellIds"
                  value={newWitch.spellIds}
                  onChange={handleInputChange}
                >
                  {spells.map((spell, index) => {
                    return (
                      <option value={spell.id} key={index}>
                        {" "}
                        {spell.name}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="field">
                <label htmlFor="celestialAffinity"> Celestial Affinity </label>
                <p className="field-info">
                  {" "}
                  Signs, phases, or sky patterns that follow them.{" "}
                </p>
                <input
                  type="text"
                  id="celestialAffinity"
                  value={newWitch.celestialAffinity}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="button-default">
                {" "}
                Save to archive{" "}
              </button>
            </div>
          </div>
          <div></div>
        </form>
      }
    </div>
  );
}

export default AddWitchForm;
