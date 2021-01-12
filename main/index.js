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
connection.end();
});



