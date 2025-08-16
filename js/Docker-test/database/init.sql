CREATE TABLE donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    donation_amount DECIMAL(10,2) NOT NULL
);

INSERT INTO donors (name, donation_amount) VALUES
('Alice', 100.00),
('Bob', 200.00);
