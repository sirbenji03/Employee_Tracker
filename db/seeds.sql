INSERT INTO department (name)
VALUES 
('Corporate and planning'),
('IT'),
('Inside Sales'),
('budget and financing'),
('HR')

INSERT INTO job (title, salary, department_id)
VALUES 
('Director', 75000, 1),
('Associate', 18000, 2),
('Head Auditor', 100000, 3),
('Accountant', 80000, 4),
('Engineer', 55000, 5),
('Sales rep', 0, 6);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
('Ronaldo', 'Cristiano', 1, NULL),
('Blue', 'Kupe', 2, 1),
('Indiana', 'Jones', 3, 2),
('Cantona', 'Triston', 4, NULL),
('Ben', 'Wyatt', 5, NULL),
('Marko', 'Polo', 6, NULL),
