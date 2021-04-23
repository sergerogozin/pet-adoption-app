import pg from "pg"
import AdoptablePet from "./AdoptablePet.js";
import PetType from "./PetType.js"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/pets-app"
})

class SurrenderApplication{
  constructor({id = null, name, phoneNumber, phone_number, email, petName, petAge,    petType, petImage, vaccinationStatus = "No"}){
    //surrender_application fields
    this.id = id;
    this.name = name;
    this.phoneNumber = phone_number || phoneNumber;
    this.email = email;
    this.status = "Pending";
    //This needs to be set at record insert time, after the adoptable_pet is created
    this.adoptable_pet_id = null;
    //adoptable_pets fields
    this.petName = petName;
    this.img_url = petImage;
    this.age = petAge;
    this.pet_type = petType || petType;
    this.vaccination_status = vaccinationStatus || vaccination_status;
    this.adoption_story = "Not available";
    this.available_for_adoption = false;
  }

  async save(){
    try {
      //Get the pet_type ID
      let petTypeId = await PetType.getIdByType(this.pet_type);
      //Create the adoptable pet and get it's id.
      let ap = new AdoptablePet({pet_type_id: petTypeId, name: this.petName, img_url: this.img_url, age: this.age, pet_type: this.pet_type, vaccinationStatus: this.vaccination_status, adoptionStory: this.adoption_story, available_for_Adoption: false });
      const petId = await ap.save();
      //Create the surrender_application record
      const query2 = "INSERT INTO surrender_applications (name, phone_number, email, status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
      const result = await pool.query(query2, [this.name, this.phoneNumber, this.email, this.status, petId]);
      const surrAppId = result.rows[0];
      this.id = surrAppId;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }



}
export default SurrenderApplication;