CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================
-- 1. Создание таблиц
-- ========================================

CREATE TABLE employees (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           full_name VARCHAR(255) NOT NULL,
                           department VARCHAR(255),
                           position VARCHAR(255),
                           grade INT,
                           experience_in_company INT -- количество месяцев в компании
);

CREATE TABLE roles (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                       role_type VARCHAR(255) CHECK (role_type IN ('Функциональная', 'Специализация')),
                       title VARCHAR(255),
                       responsibilities TEXT
);

CREATE TABLE work_experience (
                                 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                 employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                                 company_name VARCHAR(255),
                                 role VARCHAR(255),
                                 start_date DATE,
                                 end_date DATE,
                                 responsibilities TEXT
);

CREATE TABLE education (
                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                           employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                           institution VARCHAR(255),
                           degree VARCHAR(255),
                           specialization VARCHAR(255),
                           graduation_year INT
);

CREATE TABLE additional_education (
                                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                      employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                                      course_name VARCHAR(255),
                                      organization VARCHAR(255),
                                      issue_date DATE
);

CREATE TABLE skills (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                        skill_name VARCHAR(255),
                        level VARCHAR(255) CHECK (level IN ('Начальный', 'Уверенный', 'Продвинутый'))
);

CREATE TABLE comments (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
                          comment TEXT
);