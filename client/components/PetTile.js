import React from 'react'
import { Link } from "react-router-dom";


const PetTile = (props) => {
  const { id, name, imageUrl, age, vaccinationStatus } = props.pet;
  return (
    <div >
      <Link to={`/pets/${props.type}/${id}`}>{name}</Link>
      <Link to={`/pets/${props.type}/${id}`} >
        <img src={imageUrl} alt={props.type} />
      </Link>
      <p>Age: {age}</p>
      <p>Vaccination Status: {vaccinationStatus ? 'YES' : 'NO'}</p>
    </div>
  )
}

export default PetTile
