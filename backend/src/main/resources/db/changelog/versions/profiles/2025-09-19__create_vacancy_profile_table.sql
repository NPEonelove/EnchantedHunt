CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE vacancies (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           title VARCHAR(255) NOT NULL,
                           department VARCHAR(255),
                           location VARCHAR(255),
                           employment_type VARCHAR(50),
                           description TEXT,
                           career_level VARCHAR(50),
                           salary INT,
                           contact_person VARCHAR(255),
                           posted_date date,
                           closing_date date,
                           responsibilities TEXT,
                           requirements TEXT,
                           skills TEXT,
                           benefits TEXT
);