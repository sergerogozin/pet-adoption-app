import React, { useState, useEffect } from 'react';

const PetShow = props => {
  const [ petDetails, setPetDetails ] = useState({});
  const [ readyToDisplay, setReadyToDisplay ] = useState(false); 

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`/api/v1/adoptablePets/${props.match.params.type}/${props.match.params.id}`);
      
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      const responseBody = await response.json();
      setPetDetails(responseBody.adoptablePet);
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`);
    }
    setReadyToDisplay(true);
  }
  
  useEffect(() => {
    fetchPetDetails()
  }, []);

  if(readyToDisplay) {
    if (petDetails.name) {
      return (
        <div>
          <img src={petDetails.imageUrl} alt='Pet image'/>
          <h1>{petDetails.name}</h1>
          <h3>Age: {petDetails.age}</h3>
          <h5>Vaccination Status: {petDetails.vaccinationStatus ? "Yes" : "No"} </h5>
          <p>{petDetails.adoptionStory}</p>
        </div>
      )
    } else {
      return (
        <p>Oops, no pet found!</p>
      )
    }
  } else {
    return <div></div>
  }
}

export default PetShow;