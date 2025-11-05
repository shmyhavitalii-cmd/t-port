CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

CREATE TABLE terminals (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('port','airport')),
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  radius_m INT DEFAULT 5000
);

INSERT INTO terminals (name, type, lat, lng, radius_m) VALUES
('Genoa Port','port',44.40565,8.946256,5000),
('Fiumicino Airport (Rome)','airport',41.79998,12.24624,8000),
('Malpensa Airport (Milan)','airport',45.63006,8.72814,9000),
('Turin Airport','airport',45.2001,7.6495,7000),
('Barcelona Port','port',41.3569,2.1197,5000),
('Barcelona Airport','airport',41.2974,2.0833,8000),
('Nice Airport','airport',43.6644,7.2150,8000),
('Savona Port','port',44.3099,8.4688,5000);
