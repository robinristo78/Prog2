
// Import the mysql2 library to interact with MySQL databases
const mysql = require('mysql2');


// Create a connection object with the database configuration
// host: the database server address
// user: the MySQL username
// password: the MySQL password
// database: the name of the database to connect to
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql_oop'
});


// Establish the connection to the MySQL database
// If there is an error, log it to the console
// Otherwise, log the connection thread ID
conn.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', conn.threadId);
});


// Export the connection object so it can be used in other files
module.exports = conn;