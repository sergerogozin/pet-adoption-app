<<<<<<< HEAD
DROP TABLE IF EXISTS adoption_applications;
=======
>>>>>>> 4de76760c73ebdc4e390070a9d06f7d0dd57dabf
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
<<<<<<< HEAD
);


CREATE TABLE adoption_applications(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  home_status VARCHAR(255) NULL NULL,
  application_status VARCHAR(255) DEFAULT 'Pending' NOT NULL,
  adoptable_pet_id INTEGER REFERENCES adoptable_pets(id) 
);

=======
);
>>>>>>> 4de76760c73ebdc4e390070a9d06f7d0dd57dabf
