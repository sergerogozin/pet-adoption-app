import React, {useState, useEffect} from 'react'

import PetTile from "./PetTile.js";

const AdoptablePetsOfAType = (props) => {
  const typeName = props.match.params.type;
  //State is a type of animal with an array of that type
  const [petType, setPetType] = useState({
    adoptablePets: []
  });

  const getData = async () => {
    try {
      const response = await fetch(`/api/v1/petTypes/pets/${typeName}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json();
      console.log(responseBody);
      setPetType(responseBody.petType);
    } catch (error) {
      console.error(`error: ${error.message}`);
    }
  }

  const pets = petType.adoptablePets.map( pet => {
    return <PetTile
        key = {pet.id}
        pet = {pet}
        type = {petType.type}
      />
  })

  useEffect( () => {
    getData();
  }, [typeName])

  return (
    <div>
      <h1>Adoptable {petType.type}</h1>
      <div className="tile-container">
        {pets}
      </div>
    </div>
  )
}

export default AdoptablePetsOfAType
