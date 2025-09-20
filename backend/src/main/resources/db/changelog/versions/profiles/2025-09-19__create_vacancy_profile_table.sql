-- Включаем расширение для работы с UUID
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS vacancies (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           title VARCHAR(255) NOT NULL,
                           department VARCHAR(255),
                           location VARCHAR(255),
                           employment_type VARCHAR(50),
                           description TEXT,
                           career_level VARCHAR(50),
                           min NUMERIC,
                           max NUMERIC,
                           currency VARCHAR(10),
                           contact_person VARCHAR(255),
                           posted_date VARCHAR(50),
                           closing_date VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS responsibilities (
                                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                  description TEXT NOT NULL,
                                  vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS requirements (
                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              description TEXT NOT NULL,
                              mandatory BOOLEAN NOT NULL,
                              vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skills (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(255) NOT NULL,
                        level VARCHAR(100),
                        vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS benefits (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          description TEXT NOT NULL,
                          vacancy_id UUID REFERENCES vacancies(id) ON DELETE CASCADE
);
