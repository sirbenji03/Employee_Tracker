//required dependancies
const inquirer = require("inquirer");
const mysql = require("mysql");
const CTable = require("console.table");
const db = require('./db/connection');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker',
});

db.connect(function (err) {
    if (err) throw err;
    promptUser();
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
function viewDepartment () {
    connection.query('SELECT * FROM department', function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
};
  
function viewRoles() {
    connection.query('SELECT * FROM job', function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    });
};
  
function viewEmployees () {
    connection.query(
      'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
      function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
      }
    );
};
  
function addDepartment () {
    inquirer.prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What is the department name?',
        },
     ])
    .then(function(answer) {
        connection.query(
          'INSERT INTO department (dept_name) VALUES (?)',
          [answer.department],
          function (err, _res) {
            if (err) throw err;
            console.log('Department added!');
            start();
          }
        );
      });
};

function addRoles () {
    inquirer.prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the role title?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this job?',
        },
        {
          name: 'deptId',
          type: 'input',
          message: 'What is the department ID number?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
          [answer.roleTitle, answer.salary, answer.deptId],
          function (err, _res) {
            if (err) throw err;
            console.log('role added!');
            start();
          }
        );
      });
};

function addEmployee () {
    inquirer.prompt([
        {
          name: 'nameFirst',
          type: 'input',
          message: "What is the employee's first name?",
        },
        {
          name: 'nameLast',
          type: 'input',
          message: "What is the employee's last name?",
        },
        {
          name: 'jobId',
          type: 'input',
          message: "What is the employee's job id?",
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'What is the manager Id?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.nameFirst, answer.nameLast, answer.roleId, answer.managerId],
          function (err, _res) {
            if (err) throw err;
            console.log('Employee added!');
            start();
          }
        );
      });
};

function updateEmployee() {
    inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Enter employee id',
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'Enter new role id',
        },
      ])
      .then(answer => {
        connection.query(
          'UPDATE employee SET role_id=? WHERE id=?',
          [answer.roleId, answer.id],
          function (err, _res) {
            if (err) throw err;
            console.log('Employee updated!');
            start();
          }
        );
      });
  };
  

  


