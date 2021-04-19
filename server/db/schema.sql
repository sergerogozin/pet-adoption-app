DROP TABLE IF EXISTS pet_types;
CREATE TABLE pet_types (
  id SERIAL PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  description VARCHAR(255)
);

-- This has a PK to pet_surrender_application and pet_surrender_applicaiton
-- has a PK into this table
--pet_surrender_id INTEGER REFERENCES pet_surrender_applications(id)
DROP TABLE IF EXISTS adoptable_pets;
CREATE TABLE adoptable_pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  age INTEGER,
  vaccination_status BOOLEAN DEFAULT FALSE,
  adoption_story VARCHAR(255) NOT NULL,
  available_for_adoption BOOLEAN DEFAULT TRUE,
  pet_type_id INTEGER REFERENCES pet_types(id)
  -- Line below can't be executed with table create due to inter-dependecies
  -- of FK's. See -- ***
  --pet_surrender_id INTEGER REFERENCES pet_surrender_applications(id)
);


DROP TABLE IF EXISTS pet_surrender_applicaitons;
CREATE TABLE pet_surrender_applications (
    id SERIAL PRIMARY KEY,
    adoptable_pet_id INTEGER REFERENCES adoptable_pets(id),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    application_status VARCHAR(255) DEFAULT 'PENDING'
);

-- ***
ALTER TABLE adoptable_pets ADD pet_surrender_id INTEGER REFERENCES pet_surrender_applications(id);

DROP TABLE IF EXISTS adoption_applicaitons;
CREATE TABLE adoption_applicaitons (
    id SERIAL PRIMARY KEY,
    adoptable_pet_id INTEGER REFERENCES adoptable_pets(id),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    home_status VARCHAR(255) NOT NULL,
    application_status VARCHAR(255) DEFAULT 'PENDING'
);


