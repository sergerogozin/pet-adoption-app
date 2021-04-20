import React,{useState} from "react"

const AdoptionForm =()=>{
const[adoptionData, setAdoptionData] = useState({
  name : "",
  phoneNumber : "",
  email: "",
  homeStatus: "own"
})
let errorContainer = null
const [errors, setErrors]=useState([])
if(errors.length!==0){
  errorContainer= errors.map(error=>{
    return <p>{error}</p>
  })
}

const handleChange =(event)=>{
setAdoptionData({
  ...adoptionData,
  [event.currentTarget.name]: event.currentTarget.value
})
}

const checkForErrors =()=>{
  const errorsArray = []
  const fieldsData = Object.keys(adoptionData)
  fieldsData.forEach(fieldName=>{
    if(adoptionData[fieldName]=== ""){
    errorsArray.push(fieldName)
    }
  })
  return errorsArray
}

const handleSubmit = async (event)=>{
  event.preventDefault()
  let errorsArray=checkForErrors()
 if(errorsArray.length===0){
   await addInfo()
  setAdoptionData({
    name : "",
    phoneNumber : "",
    email: "",
    homeStatus: "own"
   })
 }
 else{
  setErrors(errorsArray)
 }
}

const addInfo = async ()=>{
  try{
    const response = await fetch("/api/v1/petTypes", {
      method: "POST",
      headers: new Headers({
        "Content-Type" : "application/json"
      }),
      body: JSON.stringify(adoptionData)
    })

  }catch(err){
    console.error(err)
  }
}

return(
<form onSubmit ={handleSubmit}>
  {errorContainer}
  <label htmlFor="name">
    Name:
    <input id="name" name="name" value ={adoptionData.name} onChange={handleChange}/>
  </label>

  <label htmlFor="phone-number">
    Phone Number:
    <input id="phone-number" name= "phoneNumber"  value = {adoptionData.phoneNumber} onChange={handleChange}/>
  </label>

  <label htmlFor="email">
    Email:
    <input id="email" name= "email" value= {adoptionData.email } onChange={handleChange}/>
  </label>

  <label htmlFor="home-status">Home Status
  <select name="homeStatus" id="home-status" onChange={handleChange}>
    <option value="own">Own</option>
    <option value="rent">Rent</option>
  </select>
  </label>
  <input type="Submit" value="Submit Info"/>
</form>

) 
}

export default AdoptionForm