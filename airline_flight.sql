
CREATE TABLE airline.flights (
  flight_id SERIAL PRIMARY KEY,
  flight_number VARCHAR(10),
  origin_iata VARCHAR(3) NOT NULL,
  destination_iata VARCHAR(3) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  base_price NUMERIC(10, 2) NOT NULL,
  total_seats INT NOT NULL,
  available_seats INT NOT NULL
);