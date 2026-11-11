-- Up Migration

CREATE TABLE events (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL CHECK (price >= 0 AND price = round(price, 2)),
    description TEXT,
    startDate TIMESTAMPTZ NOT NULL,
    endDate TIMESTAMPTZ NOT NULL CHECK (endDate > startDate),
    hallId INT NOT NULL REFERENCES halls(id),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Down Migration

DROP TABLE events;
