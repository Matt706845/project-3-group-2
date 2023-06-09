CREATE TABLE restaurants (
  name VARCHAR(255),
  street_address VARCHAR(255),
  google_map VARCHAR(255),
  review_count INTEGER,
  phone VARCHAR(30),
  website VARCHAR(255),
  restaurant_type VARCHAR(255),
  average_rating NUMERIC(4, 2),
  food_review NUMERIC(4, 2),
  service_review NUMERIC(4, 2),
  ambience_review NUMERIC(4, 2),
  value_review NUMERIC(4, 2),
  price_range VARCHAR(20),
  description TEXT,
  restaurant_main_type VARCHAR(255),
  latitude NUMERIC(9, 6),
  longitude NUMERIC(9, 6),
  postal_code VARCHAR(20)
);

Alter table restaurants add column id serial primary key;