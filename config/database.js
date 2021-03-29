var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'job_portal'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
}); 

connection.on('connection', function (connection) {
    if (connection) {
        console.log('Connection %d established', connection.threadId);
        connection.query('SET SESSION auto_increment_increment=1');
    }

    connection.on('error', function (err) {
        console.error(new Date(), 'MySQL error', err.code);
    });

    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL close', err);
    });

});

connection.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

connection.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

module.exports = connection;