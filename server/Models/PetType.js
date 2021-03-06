import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets-app"
})

class PetType {
  constructor({ id = null, type, description, img_url, imageUrl }) {
    this.id = id
    this.type = type
    this.description = description
    this.imageUrl = img_url || imageUrl
  }

  static async findAll() {
    try {
      const rawData = await pool.query("SELECT * FROM pet_types;")
      const petTypeData = rawData.rows;
      const petTypes = petTypeData.map(type => {
        return new PetType(type);
      })

      return petTypes;
    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  static async getTypes(){
    try {
      const result = await pool.query("SELECT type FROM pet_types");
      return result.rows;
    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  static async getIdByType(petType) {
    try {
      const result = await pool.query("SELECT id FROM pet_types WHERE type = $1", [petType]);
      const row = result.rows[0];
      return row.id;
    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  static async findByType(type) {
    try {
      const result = await pool.query(`SELECT * FROM pet_types WHERE type = $1;`, [type]);
      const petTypeData = result.rows[0];
      const petType = new this(petTypeData);
      return petType;
    } catch (err) {
      console.log(err);
      throw (err);
    }
  }

  async adoptablePets() {
    const adoptablePetFile = await import("./AdoptablePet.js");
    const AdoptablePet = adoptablePetFile.default;

    try {
      const query = `SELECT * FROM adoptable_pets WHERE pet_type_id = $1 AND available_for_adoption = true;`;
      const results = await pool.query(query, [this.id]);

      const relatedAdoptablePetsData = results.rows;
      const relatedAdoptablePets = relatedAdoptablePetsData.map(adoptablePet => new AdoptablePet(adoptablePet));
      return relatedAdoptablePets;
    } catch (error) {
      console.error(error);
      throw (error);
    }
  }
}

export default PetType