 -- Up Migration

    CREATE TABLE halls(
        id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        country VARCHAR(50) NOT NULL,
        zipCode VARCHAR(7) NOT NULL,
        city VARCHAR(50) NOT NULL,
        street VARCHAR(50) NOT NULL,
        number VARCHAR(5),
        institution VARCHAR(50),
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )

 -- Down Migration

 DROP TABLE halls;

 /* name: string;
    country: string;
    zipCode: string;
    city: string;
    street: string;
    number: string | null;
    institution: string | null;
    createdAt: Date;*/