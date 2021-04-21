import React, { useState } from "react"
import _ from "lodash"

const AdoptionForm = () => {
  const [adoptionData, setAdoptionData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    homeStatus: "own"
  })
  const [errors, setErrors] = useState([])
  
  let errorContainer = null
  if (errors.length !== 0) {
    errorContainer = errors.map(error => {
      error = error === "phoneNumber" ? "phone number" : error
      return <p>{`${_.capitalize(error)} is empty`}</p>
    })
  }

  const handleChange = (event) => {
    setAdoptionData({
      ...adoptionData,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const checkForErrors = () => {
    const errorsArray = []
    const fieldsData = Object.keys(adoptionData)
    fieldsData.forEach(fieldName => {
      if (adoptionData[fieldName].trim() === "") {
        errorsArray.push(fieldName)
      }
    })
    return errorsArray
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let errorsArray = checkForErrors()
    if (errorsArray.length === 0) {
      await addInfo()
      setAdoptionData({
        name: "",
        phoneNumber: "",
        email: "",
        homeStatus: "own"
      })
      setErrors([])
    }
    else {
      setErrors(errorsArray)
    }
  }

  const addInfo = async () => {
    try {
      const response = await fetch("/api/v1/petAdoption", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(adoptionData)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const body = await response.json()

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <div>{errorContainer}</div>

      <label htmlFor="name">
        Name:
      <input
          id="name"
          type="text"
          name="name"
          value={adoptionData.name}
          onChange={handleChange} />
      </label>

      <label htmlFor="phone-number">
        Phone Number:
      <input
          id="phone-number"
          type="text"
          name="phoneNumber"
          value={adoptionData.phoneNumber}
          onChange={handleChange} />
      </label>

      <label htmlFor="email">
        Email:
      <input
          id="email"
          type="text"
          name="email"
          value={adoptionData.email}
          onChange={handleChange} />
      </label>

      <label htmlFor="home-status">Home Status
    <select name="homeStatus" id="home-status" onChange={handleChange}>
          <option value="own">Own</option>
          <option value="rent">Rent</option>
        </select>
      </label>
      <input type="Submit" value="Submit Info" />
    </form>

  )
}

export default AdoptionForm