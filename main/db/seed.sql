use employees_db;

INSERT INTO department
  (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Sales Lead', 102000, 1),
  ('Salesperson', 85000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Account Manager', 162000, 3),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 195000, 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Sid', 'Bayou', 1, NULL),
  ('Thomas', 'Landen', 2, NULL),
  ('Tristan', 'Knight', 3, NULL),
  ('Takari', 'Sauvignon', 4, NULL),
  ('Isolde', 'Waterfall', 5, NULL),
  ('Azuhre', 'Mando', 6, NULL),
  ('Grogu', 'Doe', 7, NULL),
  ('Alaya', 'Kingston', 8, NULL);

