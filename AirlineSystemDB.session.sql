
CREATE TABLE users (
    id SERIAL primary key,
    email Varchar(100) NOT null unique,
    username Varchar(50) NOT null unique,
    first_name Varchar(50) NOT null,
    last_name Varchar(50) NOT null,
    password_hash Varchar(255) NOT null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


