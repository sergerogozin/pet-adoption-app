import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"
import AdoptablePetsOfAType from "./AdoptablePetsOfAType.js";

import PetTypesList from "./PetTypesList.js"
import PetShow from "./PetShow.js"

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
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
