DROP TABLE IF EXISTS adoptable_pets;
DROP TABLE IF EXISTS pet_types;

CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE adoptable_pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  age INTEGER,
  vaccination_status BOOLEAN DEFAULT FALSE,
  adoption_story VARCHAR(255) NOT NULL,
  available_for_adoption BOOLEAN DEFAULT TRUE,
  pet_type_id INTEGER REFERENCES pet_types(id)
);