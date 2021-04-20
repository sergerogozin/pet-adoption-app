import pg from "pg"
import path from "path"
//import LineReader from "line-reader"
import { fileURLToPath } from "url"
import fs from 'fs';

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets_app" });

class Seeder {
  static async seed() {
    let loadedData = fs.readFileSync('data.json');
    let contents = JSON.parse(loadedData);
    
    let petTypes = contents.data.petTypes;
    await petTypes.map(async (petType) => {
      let query = 'INSERT INTO pet_types (type, img_url, description) VALUES ($1, $2, $3) RETURNING id';
      let result = await pool.query(query, [petType.type, petType.imgURL, petType.description]);
    });
  }
}

export default Seeder