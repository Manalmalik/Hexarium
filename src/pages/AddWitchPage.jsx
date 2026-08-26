import AddWitchForm from "../components/AddWitchForm";

function AddWitchPage() {
  return (
    <div className="container">
      <div className="witch-form-page">
        <h1> Give the unknown a name. </h1>
        <p className="font-gold font-italic">
          {" "}
          Enter what the archive can hold: a name, a trace of power, and the
          practical details that help another keeper meet this witch with care.
          The record will take shape beside you as you work.{" "}
        </p>
      </div>
      <AddWitchForm />
    </div>
  );
}

export default AddWitchPage;
