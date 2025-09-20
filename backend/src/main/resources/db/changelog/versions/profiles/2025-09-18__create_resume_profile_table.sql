CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE if not exists employees (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- базовые поля
                         full_name VARCHAR(255) NOT NULL,
                         department VARCHAR(255),
                         position VARCHAR(255),
                         grade INT,
                         experience_in_company INT, -- кол-во месяцев в компании

    -- вложенные данные храним как JSON или просто текст
                         roles TEXT,
                         work_experience TEXT,
                         education TEXT,
                         additional_education TEXT,
                         skills TEXT,
                         comments TEXT,

    -- дата последнего обновления (ISO строка, например "2025-09-20T12:00:00")
                         updated_at VARCHAR(255)
);
