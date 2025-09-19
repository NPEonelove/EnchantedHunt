CREATE TABLE employees (
                           id SERIAL PRIMARY KEY,
                           full_name TEXT NOT NULL,
                           department TEXT,
                           position TEXT,
                           grade INT,
                           experience_in_company TEXT
);

CREATE TABLE roles (
                       id SERIAL PRIMARY KEY,
                       employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                       role_type TEXT, -- например: "Функциональная", "Специализация"
                       title TEXT,
                       responsibilities TEXT
);

CREATE TABLE work_experience (
                                 id SERIAL PRIMARY KEY,
                                 employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                                 company_name TEXT,
                                 role TEXT,
                                 start_date DATE,
                                 end_date DATE,
                                 responsibilities TEXT
);

CREATE TABLE education (
                           id SERIAL PRIMARY KEY,
                           employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                           institution TEXT,
                           degree TEXT,
                           specialization TEXT,
                           graduation_year INT
);

CREATE TABLE additional_education (
                                      id SERIAL PRIMARY KEY,
                                      employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                                      course_name TEXT,
                                      organization TEXT,
                                      issue_date DATE
);

CREATE TABLE skills (
                        id SERIAL PRIMARY KEY,
                        employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                        skill_name TEXT,
                        level TEXT -- Начальный, Уверенный, Продвинутый
);

CREATE TABLE comments (
                          id SERIAL PRIMARY KEY,
                          employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
                          comment TEXT
);