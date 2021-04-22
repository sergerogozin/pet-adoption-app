import React, { useState, useEffect } from 'react';
import AdoptionForm from './AdoptionForm.js'

const PetShow = props => {
  const [ petDetails, setPetDetails ] = useState({});
  const [ readyToDisplay, setReadyToDisplay ] = useState(false); 
  const [ showForm, setShowForm ] = useState(false);

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

  let formHolder;
  if(showForm) {
    formHolder = <AdoptionForm />;
  }
  
  const handleClick = event => {
    event.preventDefault();
    if(!showForm) {
      setShowForm(true);
    }
  }

  if(readyToDisplay) {
    if (petDetails.name) {
      return (
        <div>
          <div className="show-container">
            <div className="show-image">
              <img src={petDetails.imageUrl} alt='Pet image'/>
            </div>
            <div className="pet-info">
              <h1>{petDetails.name}</h1>
              <p>Age: {petDetails.age}</p>
              <p>Vaccination Status: {petDetails.vaccinationStatus ? "Yes" : "No"} </p>
              <br/>
              <p>{petDetails.adoptionStory}</p>
              <button onClick={handleClick}>Adopt Me!</button>
            </div>
          </div>
          {formHolder}
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