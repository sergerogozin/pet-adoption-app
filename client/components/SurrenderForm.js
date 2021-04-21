import React, { useState } from 'react'

const SurrenderForm = () => {
  const [surrenderData, setSurrenderData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    petName: "",
    petAge: "",
    petType: "Select Pet Type",
    petImage: "",
    vaccinationStatus: "No",
  })

  const onChange = event => {
    console.log(event.currentTarget.value);
    setSurrenderData({
      ...surrenderData, [event.currentTarget.name]:event.currentTarget.value
    })
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
      //setSurrenderData(body.surrenderApplication);
    } catch (err) {
      console.error(`Error in fetch: ${err.status} (${err.message})`);
    }
  }

  const onSubmit = async event => {
    event.preventDefault();
    await addSurrenderInfo();
    console.log(surrenderData);

  }
  //<div>{errorContainer}</div>
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name" >
        Name:
      <input
          id="name"
          type="text"
          name="name"
          value={surrenderData.name}
          onChange={onChange} />
      </label>

      <label htmlFor="phone-number">
        Phone Number:
      <input
          id="phone-number"
          type="text"
          name="phoneNumber"
          value={surrenderData.phoneNumber}
          onChange={onChange} />
      </label>

      <label htmlFor="email">
        Email:
      <input
          id="email"
          type="text"
          name="email"
          value={surrenderData.email}
          onChange={onChange} />
      </label>

      <label htmlFor="petType">petType
    <select name="petType" id="petType" onChange={onChange} value={surrenderData.petType}>
          <option value="Select Pet Type">Select Pet type</option>
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="hamster">hamster</option>
          <option value="fish">fish</option>
          <option value="turle">turtle</option>
        </select>
      </label>

      <label htmlFor="petName">
        Pet Name:
      <input
          id="petName"
          type="text"
          name="petName"
          value={surrenderData.petName}
          onChange={onChange} />
      </label>
      <label htmlFor="petAge">
        Pet Age:
      <input
          id="petAge"
          type="number"
          name="petAge"
          value={surrenderData.petAge}
          onChange={onChange} />
      </label>
      <label htmlFor="petImage">
        Pet Image:
      <input
          id="petImage"
          type="text"
          name="petImage"
          value={surrenderData.petImage}
          onChange={onChange} />
      </label>





    <label htmlFor="vaccinationStatus">Vaccination Status:
      <select name="vaccinationStatus" id="vaccinationStatus" onChange={onChange} value={surrenderData.vaccinationStatus}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    </label>

      <input type="Submit" value="Submit" />
    </form>

  )
}

export default SurrenderForm;
