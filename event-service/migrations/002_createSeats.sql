-- Up Migration

CREATE TABLE seats (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hallId INT NOT NULL REFERENCES halls(id),
    sector VARCHAR(100) NOT NULL,
    row INT NOT NULL CHECK(row > 0),
    seatNumber INT NOT NULL CHECK(seatNumber > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (hallId, sector, seatNumber)
);

-- Down Migration

DROP TABLE seats;
