const mysql = require('mysql');

// connect to the mysql database
const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'Password',
        database: 'employee_tracker'
    },
    console.log('connected to the Employee Tracker database.')
);
