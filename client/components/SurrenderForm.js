import { set } from 'lodash';
import React, { useState, useEffect} from 'react'

import {jsonGetch, jsonPetch} from "./jsonFetch.js";
import humanizeErrors from "./ReusableErrorList.js";

const SurrenderForm = () => {
  const [surrenderData, setSurrenderData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "Select Pet Type",
    petImage: "",
    vaccinationStatus: "",
  })
  const [posted, setPosted] = useState(false)
  const [errors, setErrors] = useState([])
  const choose = "Choose";
  const [petTypes, setPetTypes] = useState([{type: choose}]);

  let errorContainer = null
  if (errors.length !== 0) {
    errorContainer = humanizeErrors(errors);
  }

  const checkForErrors = () => {
    const errorsArray = []
    const fieldsData = Object.keys(surrenderData)
    fieldsData.forEach(fieldName => {
      if (surrenderData[fieldName].trim() === "") {
        errorsArray.push(fieldName)
      }
      if (surrenderData[fieldName] === choose)
        errorsArray.push(fieldName);
      else if (surrenderData[fieldName] === choose)
        errorsArray.push(fieldName);
    })
    return errorsArray
  }


  const onChange = event => {
    setSurrenderData({
      ...surrenderData, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const clearForm = () => {
    setSurrenderData({
      name: "",
      phoneNumber: "",
      email: "",
      petName: "",
      petAge: "",
      petType: "Select Pet Type",
      petImage: "",
      vaccinationStatus: "No",
    });
  }

  const addSurrenderInfo = async () => {
    try {
      const response = await fetch("/api/v1/surrender", {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(surrenderData)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw (error);
      }
      const body = await response.json();
      setPosted(true);
    } catch (err) {
      console.error(`Error in fetch: ${err.status} (${err.message})`);
    }
  }

  const onSubmit = async event => {
    event.preventDefault();
    let errorsArray = checkForErrors();
    if (errorsArray.length === 0) {
      await addSurrenderInfo();
      clearForm();
      setErrors([]);
    } else {
      setErrors(errorsArray);
    }
  }

  const addToPetTypes = petTypeArr => {
      setPetTypes(petTypes.concat(petTypeArr))
  }

  useEffect(() => {
    jsonGetch("/api/v1/petTypes/getTypes", addToPetTypes)
  },[])

  const reactiveOptions = petTypes.map( type => {
    return (
      <option key={type.type} value={type.type} onChange={onChange}>{type.type}</option>
    )
  })

  const message = posted ? "Your surrender request is in process." : "";
  return (
    <div>
      <div>{errorContainer}</div>
      <h2>Pet Surrender Application</h2>
      <h3>{message}</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="name" >Name:
          <input
            id="name"
            type="text"
            name="name"
            value={surrenderData.name}
            onChange={onChange} />
        </label>
        <label htmlFor="phone-number">Phone Number:
          <input
            id="phone-number"
            type="text"
            name="phoneNumber"
            value={surrenderData.phoneNumber}
            onChange={onChange} />
        </label>
        <label htmlFor="email">Email:
          <input
            id="email"
            type="text"
            name="email"
            value={surrenderData.email}
            onChange={onChange} />
        </label>
        <label htmlFor="petType">Pet Type
          <select name="petType" id="petType" onChange={onChange} value={surrenderData.petType}>

          {reactiveOptions}
          </select>
        </label>
        <label htmlFor="petName">Pet Name:
          <input
            id="petName"
            type="text"
            name="petName"
            value={surrenderData.petName}
            onChange={onChange} />
        </label>
        <label htmlFor="petAge">Pet Age:
        <input
            id="petAge"
            type="number"
            name="petAge"
            value={surrenderData.petAge}
            onChange={onChange} />
        </label>
        <label htmlFor="petImage">Pet Image:
          <input
            id="petImage"
            type="text"
            name="petImage"
            value={surrenderData.petImage}
            onChange={onChange} />
        </label>
        <label htmlFor="vaccinationStatus">Vaccination Status:
          <select name="vaccinationStatus" id="vaccinationStatus" onChange={onChange} value={surrenderData.vaccinationStatus}>
            <option onChange={onChange} value="Choose">Choose</option>
            <option onChange={onChange} value="Yes">Yes</option>
            <option onChange={onChange} value="No">No</option>
          </select>
        </label>
        <input onChange={onChange} type="Submit" value="Submit" />
      </form>
    </div>
  )
}
export default SurrenderForm;
