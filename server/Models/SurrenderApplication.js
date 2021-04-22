import pg from "pg"

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
    this.pet_type = petType === "fish"? petType: petType + "s";
    this.vaccination_status = vaccinationStatus || vaccination_status;
    this.adoption_story = "Not available";
  }

  async save(){
    try {
      //Get the pet_type ID
      const query0 = "SELECT id FROM pet_types WHERE type = $1;"
      let result = await pool.query(query0, [this.pet_type]);
      let petTypeId = result.rows[0].id;
      //Create the adoptable pet and get it's id.
      const query1 = "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;"
      result = await pool.query(query1, [this.petName, this.img_url, this.petAge, this.vaccination_status, this.adoption_story, petTypeId]);
      const petId = result.rows[0].id;
      //Create the surrender_application record
      const query2 = "INSERT INTO surrender_applications (name, phone_number, email, status, adoptable_pet_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
      result = await pool.query(query2, [this.name, this.phoneNumber, this.email, this.status, petId]);
      const surrAppId = result.rows[0];
      this.id = surrAppId;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }



}
export default SurrenderApplication;