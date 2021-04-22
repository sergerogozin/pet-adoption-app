import React, { useState, useEffect } from "react";

import PetTypeTile from "./PetTypeTile.js";

const PetTypesList = (props) => {
  const [petTypes, setPetTypes] = useState([]);
  const getPetTypes = async () => {
    try {
      const response = await fetch('/api/v1/petTypes');
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const responseBody = await response.json();

      setPetTypes(responseBody.petTypes);
    } catch (err) {
      console.error(`Error in Fetch: ${err.message}`);
    }
  }

  useEffect(() => {
    getPetTypes();
  }, []);

  const tiles = petTypes.map(typeOfPet => {
    return (
      <PetTypeTile
        key={typeOfPet.id}
        typeOfPet={typeOfPet}
      />
    );
  });

  return (
    <div>
      <h3 className="tile-container-header">Types of Pets Available</h3>
      <div className="tile-container">
        {tiles}
      </div>
    </div>
  );
};


export default PetTypesList;