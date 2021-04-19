import React from "react"
import { Redirect } from "react-router-dom"

const Home = (props) => {
    
    return(
       <Redirect to="/pets" />
    )
}

export default Home