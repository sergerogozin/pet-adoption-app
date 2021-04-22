import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

import PetTypesList from "./PetTypesList.js"
import PetShow from "./PetShow.js"
import AdoptablePetsOfAType from "./AdoptablePetsOfAType.js"

const NavBar = props => {
  const [petTypes, setPetTypes] = useState([]);

  const fetchPetTypes = async () => {
    try{
      const response = await fetch('/api/v1/petTypes');
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw(new Error(errorMessage));
      }
      const petTypesData = await response.json();
      setPetTypes(petTypesData.petTypes)
    } catch(error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  }

  useEffect(() => {
    fetchPetTypes();
  }, [])

  const linkList = petTypes.map(petType => {
    let firstLetter = petType.type[0].toUpperCase();
    let restOfWord = petType.type.slice(1);
    let typeOfPet = firstLetter + restOfWord;
    return <Link to={`/pets/${petType.type}`} key={petType.id}>{typeOfPet} </Link>
  })

  return(
    <div>
      <nav>
        <Link to="/pets" >Home </Link>
        <Link to="/adoptions/new" >List Pet for Adoption</Link>
          <div>
            {linkList}
          </div>
      </nav>
      <Switch>
            <Route exact path="/pets" component={PetTypesList} />
            <Route exact path="/pets/:type/:id" component={PetShow} />
            <Route exact path="/pets/:type" component={AdoptablePetsOfAType} />
      </Switch>
    </div>
   
  )
}

export default NavBar;