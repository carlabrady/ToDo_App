--database name = carlabrady;

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task VARCHAR(500),
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);