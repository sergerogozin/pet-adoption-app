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
    try{
      petTypes.forEach(async (petType) => {
          let query = 'INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3)';
          let result = await pool.query(query, [petType.type, petType.imgURL, petType.description]);
      });
      pool.end();
    } catch(error) {
      console.log(error);
    }
  }
}

export default Seeder
