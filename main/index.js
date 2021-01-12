require('dotenv').config();

const mySQL = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'employees_db',
  });

// connect to the mysql server and sql database
connection.connect((err) => {
if (err) throw err;
console.log('connected as id ' + connection.threadID);
PromptQuestions();
});

function PromptQuestions() {
 inquirer.prompt({
  name: "start",
  type: "list",
  message: "Select from the following options",
  choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Roles", "Exit"],
  })

.then(function (answers) {
switch (answers.start) {

case "View All Departments":
  viewAllDepartments();
  break;
case "View All Roles":
  viewAllRoles();
  break;
case "View All Employees":
  viewAllEmployees();
  break;
case "Add Department":
  addNewDepartment();
  break;
case "Add Role":
  addRole();
  break;
case "Add Employee":
  addEmployee();
  break;
case "Update Employee Roles":
  updateEmpRole();
  break;
case "Exit":
  connection.end();
  break;
}
})
}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;

    console.log("View all departments");
    console.table(res);
  });
  PromptQuestions();
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;

    console.log("View all roles");
    console.table(res);
  });
  PromptQuestions();
}

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("View all employees");
    console.table(res);
  });

  PromptQuestions();
}

function addNewDepartment() {
  inquirer.prompt([{
  name: "start",
  type: "input",
  message: "Enter new department name"
}])
.then(function (answer) {
  connection.query("INSERT INTO department SET ?",
  {name: answer.department},
  function (err,res) {
  if (err) throw err;
console.log("Department was added successfully!");
});
  viewAllDepartments();
});
}

function addRole() {
 connection.query("SELECT name FROM department;", function (err, res) {
 if (err) throw err
  inquirer.prompt([{
  name: "title",
  type: "input",
  message: "Enter role title"
},
{
  name: "salary",
  type: "input",
  message: "Enter role salary"
},
{
  name: "departmentID",
  type: "list",
  choices: function () {
  const departmentName = []
    for (var i = 0; i < res.length; i++) {
    departmentName.push(res[i].name);}
    return departmentName;},
  message: "Select the department"
}])

.then(function (answer) {
const department = "SELECT id FROM department WHERE name = ?";
let id;
connection.query(department, [answer.departmentID], function (err, result) {
  for (i = 0; i < result.length; i++) {
  id = result[i].id;
  console.log(result[i].id);
}
connection.query("INSERT INTO role set ?", {
  title: answer.title,
  salary: answer.salary,
  department_id:departmentID,
}, 
function (err,res) {
  if (err) throw err;
  console.log("Role was updated successfully!");
  viewAllRoles();
});
 })
  });
  })
}

function addEmployee() {
connection.query("SELECT title FROM role;", function (err, res) {
if (err) throw err;
  inquirer.prompt([
{
  name: "firstname",
  type: "input",
  message: "Enter employees first name"
},
{
  name: "lastname",
  type: "input",
  message: "Enter employees last name"
},
{
  name: "roleID",
  type: "list",
  choices: function () {
  const roleTitle = [];
  for (var i = 0; i < res.length; i++) {
  roleTitle.push(res[i].title);}
  return roleTitle;
},
  message: "Select employee's role title"
},
{
  name: "managerID",
  type: "input",
  message: "Enter employee's manager ID number"
}])
.then(function (answer) {
 const roleID = "SELECT id FROM role WHERE title = ?";
  let id;
  connection.query(roleID, [answer.roleID], function (err, result) {
  for (var i = 0; i < result.length; i++) {
  id = result[i].id;
  console.log(result[i].id)
}
connection.query("INSERT INTO employee SET ?", {
  first_name: answer.firstname,
  last_name: answer.lastname,
  role_id: answer.roleID,
  manager_id: answer.managerID
},
  function (err) {
  if (err) throw err;
  console.log("Employee was added successfully!")
  viewALLEmployees();
});
 })
  });
  });
}
function updateEmpRole() {
  const employeeList = "SELECT employee.first_name,employee.last_name, role.title FROM employee RIGHT JOIN role on employee.role_id = role.id";
  connection.query(employeeList, function (err, res) {
    if (err) throw err;
    inquirer.prompt([
{
  name: "firstnamepick",
  type: "list",
  choices: function () {
  const employeeName = [];
    for (var i = 0; i < res.length; i++) {
    employeeName.push(res[i].first_name)
}
  const filter = employeeName.filter(function (name) {
  return name != null;               
});
  return filter;
},
 message: "Select employee's first name"
},
{
  name: "lastnamepick",
  type: "list",
  choices: function () {
  const employeeLastName = [];
for (var i = 0; i < res.length; i++) {
  employeeLastName.push(res[i].last_name);
}
const filter = employeeLastName.filter(function (el) {
  return el != null;
});
  return filter;
},
  message: "Select the employee whose role will be updated"
},
{
  name: "updateRole",
  type: "list",
  choices: function () {
  const roles = [];
  for (var i = 0; i < res.length; i++) {
  roles.push(res[i].title);
}
  return roles;
},
 message: "Select role to be updated"
}
]).then(function(answer){
  const roleID = "SELECT id FROM role WHERE title = ?";
let id;
connection.query(roleID, [answer.updateRole], function (err, result) {
  for (var i = 0; i < result.length; i++) {
  id = result[i].id;
  console.log(result[i]);
}
const query = "UPDATE employee SET ? WHERE ? ";
  connection.query(query, [
{
  first_name: answer.firstnamepick,
  last_name: answer.lastnamepick  
},
{
  role_id: id   
}
],
function (err) {
if (err) throw err;
console.log("Employee role was updated successfully!");
viewAllEmployees();
}
 );
 })
  })
  }
)}


