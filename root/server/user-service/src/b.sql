CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    created_at integer,
    is_activated BOOLEAN,
    activation_link VARCHAR(255)
);

CREATE TABLE token(
    user_id integer REFERENCES person (id),
    refresh_token VARCHAR(255)
);