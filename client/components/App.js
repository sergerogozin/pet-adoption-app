import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import PetTypesList from "./PetTypesList.js"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/pets" component={PetTypesList} />
      </Switch>
    </BrowserRouter>
  )
}

export default hot(App)
