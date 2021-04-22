import React, { useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"
import AdoptablePetsOfAType from "./AdoptablePetsOfAType.js"
import SurrenderForm from "./SurrenderForm.js"

import NavBar from "./Navbar.js"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pets" component={PetTypesList} />
        <Route exact path="/pets/:type/:id" component={PetShow} />
        <Route exact path="/pets/:type" component={AdoptablePetsOfAType} />
        <Route exact path="/adoption/new" component={SurrenderForm} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
