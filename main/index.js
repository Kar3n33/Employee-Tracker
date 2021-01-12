require('dotenv/types').config();

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

case "View Departments":
  viewAllDepartments();
  break;
case "View Roles":
  viewAllRoles();
  break;
case "View Employees":
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

    console.log("All Departments");
    console.table(res);
  });
  PromptQuestions();
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;

    console.log("Role Table");
    console.table(res);
  });
  PromptQuestions();
}

function viewAllEmployees() {
  const query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("All Employees");
    console.table(res);
  });

  PromptQuestions();
}



