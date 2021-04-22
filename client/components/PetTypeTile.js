import React from "react"
import { Link } from "react-router-dom"

const PetTypeTile = (props) => {
    const { id, type, imageUrl, description } = props.typeOfPet

    let descriptionBlock = <p>N/A</p>;
    if(description) {
        descriptionBlock= <p>{description}</p>;
    }

    return(
        <div className="tile">
            <Link to={`/pets/${type}`}>
                <img src={imageUrl} alt={type}></img>
                <h4>{type}</h4>
            </Link>
            {descriptionBlock}
        </div>
    )
}

export default PetTypeTile