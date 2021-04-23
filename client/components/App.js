import React, { useEffect } from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import NavBar from "./Navbar.js"

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
     </BrowserRouter>
  )
}

export default hot(App)
