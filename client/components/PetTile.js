import React from 'react'
import { Link } from "react-router-dom";


const PetTile = (props) => {
  const { id, name, imageUrl, age, vaccinationStatus } = props.pet;
  return (
    <div className="tile">
      <Link to={`/pets/${props.type}/${id}`} >
        <img src={imageUrl} alt={props.type} />
      </Link>
      <h4>
        <Link to={`/pets/${props.type}/${id}`}>{name}</Link>
      </h4>
      <p>Age: {age}</p>
      <p>Vaccination Status: {vaccinationStatus ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default PetTile
