import pg from "pg"

const pool = new pg.Pool({
  connectionString: "postgres://postgres:password@localhost:5432/pets-app"
})

class AdoptionApplication {
  constructor({ id, name, phoneNumber, phone_number, email, homeStatus, home_status }) {
    this.id = id
    this.name = name
    this.email = email
    this.phoneNumber = phone_number || phoneNumber
    this.homeStatus = homeStatus || home_status
  }

  async save() {
    try {
      const string = "INSERT INTO adoption_applications(name, email, phone_number, home_status) VALUES($1, $2, $3, $4) RETURNING id;"
      const result = await pool.query(string, [this.name, this.email, this.phoneNumber, this.homeStatus])
      this.id = result.rows[0].id
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export default AdoptionApplication