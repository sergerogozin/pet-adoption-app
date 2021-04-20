import pg from "pg"

const pool = new pg.Pool({
    connectionString: "postgres://postgres:password@localhost:5432/pets-app"
})

class PetType {
    constructor({ id, type, description, img_url, imageUrl }) {
        this.id = id
        this.type = type
        this.description = description
        this.imageUrl = img_url || imageUrl
    }

    static async findAll() {
        try{
            const rawData = await pool.query("SELECT * FROM pet_types;")
            const petTypeData = rawData.rows;
            const petTypes = petTypeData.map(type => {
                return new PetType(type);
            })
            return petTypes;
        } catch(err) {
            console.log(err);
            throw(err);
        }
    }

    static async findById(id) {
        try{
            const result = await pool.query(`SELECT * FROM pet_types WHERE id = $1;`, [id]);
            const petTypeData = result.rows[0];
            const petType = new this(petTypeData);
            return petType;
        } catch(err) {
            console.log(err);
            throw(err);
        }
    }
}

export default PetType