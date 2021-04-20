import pg from "pg"
import path from "path"
import { fileURLToPath } from "url"
import fs from 'fs'

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets-app" });

class Seeder {
  static async seed() {
    let loadedData = fs.readFileSync('data.json');
    let contents = JSON.parse(loadedData);

    let petTypes = contents.data.petTypes;
    let adoptablePets = contents.data.adoptablePets;

    try{
      for (let i = 0; i < petTypes.length; i++) {
        let query = 'INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3)';
        let result = await pool.query(query, [petTypes[i].type, petTypes[i].imgURL, petTypes[i].description]);
      }

      for (let i = 0; i < adoptablePets.length; i++) {
        let query = 'INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;'
        let idArr = await pool.query(query, [adoptablePets[i].name, adoptablePets[i].img_url, adoptablePets[i].age, adoptablePets[i].vaccination_status, adoptablePets[i].adoption_story, adoptablePets[i].available_for_adoption, adoptablePets[i].pet_type_id])
      }
      
      pool.end();
    } catch(error) {
      console.log(error);
      pool.end();
    }


  }
}

export default Seeder
