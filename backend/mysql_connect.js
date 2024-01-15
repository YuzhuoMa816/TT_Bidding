const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'zhaobiao.cja22mkkgh4i.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'yuzhuoma',
    database: 'tt_zhaobiao'
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connection established.');
    }
});

module.exports = {
    db
};
