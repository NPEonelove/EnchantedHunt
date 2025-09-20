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
create table user_stats (
                            achievement_id uuid primary key default gen_random_uuid(),
                            id uuid references employees(id) not null ,
                            progress_bar int check ( progress_bar >= 0 and progress_bar <= 100 ) default 0,
                            xp_count int check ( xp_count >= 0 ) default 0,
                            my_corner bool default false, -- Заполнить все обязательные поля профиля.
                            full_gear bool default false, -- Заполнить профиль на 100%.
                            trailblazer bool default false, -- набрать 300 xp
                            seasoned_user bool default false, -- набрать 700 xp
                            connoisseur bool default false, -- набрать 1000 xp
                            i_live_here bool default false, -- набрать 2000 xp
                            platform_star bool default false -- набрать 3000 xp
);
