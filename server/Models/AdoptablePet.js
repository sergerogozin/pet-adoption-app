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
    this.vaccinationStatus = vaccination_status || vaccinationStatus
    this.adoptionStory = adoption_story || adoptionStory
    this.availableForAdoption = available_for_adoption && availableForAdoption
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

  static async findById(id) {
    try {
      const result = await pool.query("SELECT * FROM adoptable_pets WHERE id = $1;", [id]);
      if (result.rowCount) {
        const petDetailData = result.rows[0];
        const petToReturn = new this(petDetailData);
        return petToReturn;
      }
    } catch(err) {
      console.log(err);
      throw(err);
    }
  }

  async save(){
    try {
      const query = "INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;";
      const result = await pool.query(query, [this.name, this.imageUrl, this.age, this.vaccinationStatus,this.adoptionStory, this.availableForAdoption, this.petTypeId]);
      return result.rows[0].id;
    } catch (error) {
      console.log(error)
      throw(error);
    }
  }

  async petType() {
    const petTypeFile = await import("./PetType.js");
    const PetType = petTypeFile.default;

    try {
      const query = 'SELECT * FROM pet_types WHERE id = $1;';
      const result = await pool.query(query, [this.petTypeId]);
      const relatedPetTypeData = result.rows[0];
      const relatedPetType = new PetType(relatedPetTypeData);
      return relatedPetType;
    } catch(err) {
      console.log(err);
      throw(err)
    }
  }
}

export default AdoptablePet;