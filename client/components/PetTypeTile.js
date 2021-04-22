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
            </Link>
            <h4>
                <Link to={`/pets/${type}`}>{type}</Link>
            </h4>
            {descriptionBlock}
        </div>
    )
}

export default PetTypeTile