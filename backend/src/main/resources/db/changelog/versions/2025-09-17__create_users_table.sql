create table users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       full_name VARCHAR(255) NOT NULL,
                       age INTEGER NOT NULL CHECK (age >= 14 AND age <= 100),
                       city VARCHAR(100) NOT NULL,
                       position VARCHAR(255) NOT NULL,
                       salary DECIMAL(32, 2) NOT NULL CHECK (salary >= 0),
                       hire_date DATE NOT NULL,
                       competencies TEXT CHECK (LENGTH(competencies) <= 5000),
                       career_interests TEXT CHECK (LENGTH(career_interests) <= 5000),
                       wants_new_position BOOLEAN NOT NULL DEFAULT FALSE,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Таблица сотрудников компании';
COMMENT ON COLUMN users.id IS 'Уникальный идентификатор сотрудника';
COMMENT ON COLUMN users.email IS 'Корпоративная почта (обязательное поле)';
COMMENT ON COLUMN users.password IS 'Пароль (обязательное поле)';
COMMENT ON COLUMN users.full_name IS 'ФИО сотрудника (обязательное поле)';
COMMENT ON COLUMN users.age IS 'Возраст (обязательное поле, от 18 до 100 лет)';
COMMENT ON COLUMN users.city IS 'Город проживания (обязательное поле)';
COMMENT ON COLUMN users.position IS 'Активная должность (обязательное поле)';
COMMENT ON COLUMN users.salary IS 'Оклад (обязательное поле, неотрицательное значение)';
COMMENT ON COLUMN users.hire_date IS 'Дата приема на работу (обязательное поле)';
COMMENT ON COLUMN users.competencies IS 'Компетенции сотрудника';
COMMENT ON COLUMN users.career_interests IS 'Карьерные интересы, чего хочет достичь';
COMMENT ON COLUMN users.wants_new_position IS 'Хочет ли найти другое вакантное место (обязательное поле)';

CREATE INDEX idx_employees_email ON users(email);
CREATE INDEX idx_employees_city ON users(city);
CREATE INDEX idx_employees_position ON users(position);
CREATE INDEX idx_employees_wants_new_position ON users(wants_new_position);

