import React, { useState, useEffect } from "react"

import PetTypeTile from "./PetTypeTile.js"

const PetTypesList = (props) => {
    const [petTypes, setPetTypes] = useState([]);

    const getPetTypes = async () => {
        try {
            const response = await fetch('/api/v1/pets/types');
            if(!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`;
                const error = new Error(errorMessage);
                throw(error);
            }
            const responseBody = await response.json();
            console.log(responseBody);
            setPetTypes(responseBody.petTypes);
        } catch(err) {
            console.error(`Error in Fetch: ${err.message}`);
        }
    }

    useEffect(() => {
        getPetTypes();
    }, [])

    const tiles = petTypes.map(typeOfPet => {
        return(
            <PetTypeTile
                key={typeOfPet.id}
                typeOfPet={typeOfPet}
            />
        ) 
    })

    return(
        <div>
            <h1>Exotic Pets Adoption Agency</h1>
            <h3>Types of Pets Available</h3>
            {tiles}
        </div>
    )
}

export default PetTypesList