import pg from "pg"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/pets-app"
})

class AdoptablePet {
  constructor({ id, name, img_url, imageUrl, age, vaccination_status = false, vaccinationStatus = false, adoption_story, adoptionStory, available_for_adoption = true, availableForAdoption = true, pet_type_id, petTypeId }) {
    this.id = id
    this.name = name
    this.imageUrl = img_url || imageUrl
    this.age = age
    this.vaccinationStatus = vaccination_status || vaccination_status
    this.adoptionStory = adoption_story || adoptionStory
    this.availableForAdoption = available_for_adoption || availableForAdoption
    this.petTypeId = pet_type_id || petTypeId
  }

  static async findAll() {
    try{
      const rawData = await pool.query("SELECT * FROM adoptable_pets;");
      const adoptablePetsData = rawData.rows;
      const adoptablePets = adoptablePetsData.map(pet => {
        return new AdoptablePet(pet);
      })
      return adoptablePets;
    } catch(err) {
      console.log(err);
      throw(err);
    }
  }
}

export default AdoptablePet;