var mysql = require('mysql');

var db;

class Database {
    constructor(host, user, database) {
        db = mysql.createConnection({
            host: host,
            user: user,
            database: database
        })
        
        db.connect(function(err) {
            if(err)
                console.log(err);
            else
                console.log('Connected.');
        })
    }
    query(sql) {
        db.query(sql).on('result', function(data) {

        }).on('end', function() {
            console.log('end');
        })
    }
}

module.exports = Database;