-- CREATE DATABASE ps_sports; --
-- USE ps_sports; --

CREATE TABLE users (
  id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  birth_date DATE NOT NULL,
  rg VARCHAR(45),
  cpf VARCHAR(11) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  status VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (cpf),
  UNIQUE (email)
);

CREATE TABLE phones (
  id INT NOT NULL AUTO_INCREMENT,
  number VARCHAR(20) NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (number),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE schools (
  id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(100),
  phone VARCHAR(20),
  PRIMARY KEY (id)
);

CREATE TABLE players (
  id INT NOT NULL AUTO_INCREMENT,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  primary_position VARCHAR(45),
  second_position VARCHAR(45),
  dominant_foot VARCHAR(45),
  entry_date DATETIME NOT NULL,
  sport_status VARCHAR(45),
  notes TEXT,
  user_id CHAR(36) NOT NULL,
  school_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (school_id) REFERENCES schools(id)
);

CREATE TABLE addresses (
  id INT NOT NULL AUTO_INCREMENT,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(10) NOT NULL,
  complement VARCHAR(100) NOT NULL,
  neighborhood VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_roles (
  id INT NOT NULL AUTO_INCREMENT,
  user_id CHAR(36) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE guardians (
  id INT NOT NULL AUTO_INCREMENT,
  kinship VARCHAR(45) NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE categories (
  id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  min_age INT NOT NULL,
  max_age INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE trainers (
  id INT NOT NULL AUTO_INCREMENT,
  license_level VARCHAR(45),
  specialty VARCHAR(45),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE modalities (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE classes (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  weekdays VARCHAR(100) NOT NULL,
  schedule DATETIME NOT NULL,
  status VARCHAR(45) NOT NULL,
  modality_id INT NOT NULL,
  category_id CHAR(36) NOT NULL,
  trainer_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (modality_id) REFERENCES modalities (id),
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (trainer_id) REFERENCES trainers (id)
);

CREATE TABLE enrollments (
  id INT NOT NULL AUTO_INCREMENT,
  entry_date DATETIME NOT NULL,
  status VARCHAR(45) NOT NULL,
  player_id INT NOT NULL,
  class_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (player_id) REFERENCES players (id),
  FOREIGN KEY (class_id) REFERENCES classes (id)
);

CREATE TABLE leads (
  id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  entry_date DATETIME NOT NULL,
  source VARCHAR(50) NOT NULL,
  status VARCHAR(45) NOT NULL,
  magic_token VARCHAR(255),
  magic_expires_at DATETIME,
  PRIMARY KEY (id),
  UNIQUE (email)
);

CREATE TABLE staff (
  id INT NOT NULL,
  hire_date DATE NOT NULL,
  user_id CHAR(36) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE academic_records (
  id INT NOT NULL,
  year DATETIME NOT NULL,
  semester INT NOT NULL,
  status VARCHAR(45) NOT NULL,
  enrollment_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (enrollment_id) REFERENCES enrollments (id)
);

CREATE TABLE attendances (
  id INT NOT NULL,
  class_date DATETIME NOT NULL,
  status INT NOT NULL,
  enrollment_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (enrollment_id) REFERENCES enrollments (id)
);

CREATE TABLE evaluations (
  id INT NOT NULL,
  date DATETIME NOT NULL,
  score INT NOT NULL,
  notes VARCHAR(255) NOT NULL,
  trainer_id INT NOT NULL,
  academic_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (trainer_id) REFERENCES trainers(id),
  FOREIGN KEY (academic_id) REFERENCES academic_records(id)
);

CREATE TABLE performances (
  id INT NOT NULL,
  criteria VARCHAR(100) NOT NULL,
  observation VARCHAR(255) NOT NULL,
  level INT NOT NULL,
  trainer_id INT NOT NULL,
  academic_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (trainer_id) REFERENCES trainers(id),
  FOREIGN KEY (academic_id) REFERENCES academic_records(id)
);

CREATE TABLE players_guardians (
  id INT NOT NULL,
  player_id INT NOT NULL,
  guardian_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (player_id) REFERENCES players(id),
  FOREIGN KEY (guardian_id) REFERENCES guardians(id)
);
