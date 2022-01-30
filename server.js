//required dependancies
const inquirer = require("inquirer");
const mysql = require("mysql");
const CTable = require("console.table");
const db = require('./db/connection');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker',
});

// Start server after DB connection
connection.connect(err => {
    if (err) throw err;
    console.log(" SQL EMPLOYEE TRACKER");
    start();
});

// Basic function of application
function start() {
    inquirer
       .prompt({
            message: 'We have information about employees, departments, and employee roles. What would you like to do today?',
            name: 'start',
            type: 'list',
            choices: [ 
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a roles',
            'Add an employee',
            'Update employee',
            'Exit',
            ],
        })
        .then(function(res) {
            switch (res.start) {
            case 'View all departments':
              viewDepartment();
              break;
            case 'View all roles':
              viewRoles();
              break;
            case 'View all employees':
              viewEmployees();
              break;
            case 'Add a department':
              addDepartment();
              break;
            case 'Add a role':
              addRoles();
              break;
            case 'Add an employee':
              addEmployee();
              break;
            case 'Update employee':
              updateEmployee();
              break;
            case "Exit":
              connection.end();
              console.log("All done")
              break;
            default:
              console.log("default");
        }
    });
};

//view function set 
function view(){

}

const viewEmployees = () => {
    connection.query(
      'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
      function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
      }
    );
  };

const viewDepartment = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};    

const viewRoles = () => {
    connection.query('SELECT * FROM job', function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    });
  };
