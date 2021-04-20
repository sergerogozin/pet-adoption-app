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

    //console.log(contents.data.petTypes[0]);
    let petTypes = contents.data.petTypes;
    let adoptablePets = contents.data.adoptablePets;

    try{
      petTypes.forEach(async (petType) => {
          let query = 'INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3)';
          let result = await pool.query(query, [petType.type, petType.imgURL, petType.description]);
        });

      adoptablePets.forEach( async (pet) => {
        let idArr = await pool.query('INSERT INTO adoptable_pets (name, img_url, age, vaccination_status, adoption_story, available_for_adoption, pet_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [pet.name, pet.img_url, pet.age, pet.vaccination_status, pet.adoption_story, pet.available_for_adoption, pet.pet_type_id])
        console.log(idArr.rows);
      })
     pool.end();
    } catch(error) {
      console.log(error);
      pool.end();
    }


  }
}

export default Seeder
