
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE if not exists experience_points (
                                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                   user_id UUID NOT NULL,
                                   points INT NOT NULL,
                                   reason VARCHAR(255),
                                   created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE if not exists user_stats (
                            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                            user_id UUID UNIQUE NOT NULL,
                            total_points INT DEFAULT 0,
                            level INT DEFAULT 1,
                            rank INT DEFAULT 0
);

CREATE TABLE if not exists achievements (
                              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              user_id UUID NOT NULL,
                              achievement_name VARCHAR(255),
                              description TEXT,
                              earned_at TIMESTAMP DEFAULT now()
);
