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
    return(
      <li key={petType.id}>
        <Link to={`/pets/${petType.type}`} >{typeOfPet} </Link>
      </li>
    ) 
  })
  
  return(
    <div>
      <div id="top-header">
        <div>
          {/* <img src={require("../assets/images/logo.png")} alt="logo" /> */}
          <hgroup>
            <h3>Rescue</h3>
            <h6>Basic Pets Adoption Agency</h6>
          </hgroup>
        </div>
        <div className="contact-info">
          <p>(727) 727-7227</p>
          <p>Mon - Sun 9am-9pm</p>
        </div>
      </div>
      <nav>
        <Link to="/pets" className="nav-element" >Home </Link>
          <div className="nav-element">
            <button>Find a Friend</button>
            <ul>
              {linkList}
            </ul>
          </div>
        <Link to="/adoptions/new" className="nav-element" >List Pet for Adoption</Link>
      </nav>
      <main>
        <Switch>
          <Route exact path="/pets" component={PetTypesList} />
          <Route exact path="/pets/:type/:id" component={PetShow} />
          <Route exact path="/pets/:type" component={AdoptablePetsOfAType} />
        </Switch>
      </main>
    </div>
   
  )
}

export default NavBar;