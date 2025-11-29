\copy flights(
  flight_number,
  origin_iata,
  destination_iata,
  departure_date,
  departure_time,
  arrival_date,
  arrival_time,
  base_price,
  total_seats,
  available_seats
)
from '/Users/tonysm3/Airline_System/flights_seed.csv'
with (format csv, header true) 
