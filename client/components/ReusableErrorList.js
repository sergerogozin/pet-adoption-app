import React from "react";

const humanizeErrors = errors => {
  let errorContainer = errors.map(error => {
    switch (error) {
      case "phoneNumber":
        error = "phone number";
        break;
      case "petType":
        error = "pet type";
        break;
      case "petAge":
        error = "pet age";
        break;
      case "petImage":
        error = "pet image";
        break;
      case "petName":
        error = "pet name";
        break;
      case "vaccinationStatus":
        error = "vaccination status";
        break;
    }
    return <p>{`${_.capitalize(error)} is empty or not selected.`}</p>
  })
  return errorContainer;
}

export default humanizeErrors;