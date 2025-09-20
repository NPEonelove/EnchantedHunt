drop table if exists users;

CREATE TABLE users
(
    user_id    uuid primary key         default gen_random_uuid(),
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    role       varchar(32) check ( role = 'USER' or role = 'ADMIN' )
);