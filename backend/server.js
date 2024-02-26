const cors = require('cors');
const express = require('express');


const {db} = require('./mysql_connect')
const app = express()
app.use(cors())

app.get('/expert', (req, res) => {
    //return res.json("From Backend Side");
    const selectedMajor = decodeURIComponent(req.query.major);

    let sql = "SELECT * FROM Expert";
    if (selectedMajor) {
        sql += ` WHERE expertMajor = '${selectedMajor}'`;
    }
    sql += " ORDER BY RAND() LIMIT 1";


    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({error: 'Error executing query'});
        }
        const randomExpert = data[0];
        console.log("randomly selected: ", randomExpert);
        return res.json(randomExpert);
    })
})


app.get('/phoneSelect', (req, res) => {
    let sql = "SELECT * FROM Expert";
    sql += ` WHERE expertPhone = '${req.query.phone}'`;
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({error: 'Error executing query'});
        }
        return res.json(data);
    })
})


app.get('/nameSelect', (req, res) => {
    let sql = "SELECT * FROM Expert";
    sql += ` WHERE expertName = '${req.query.name}'`;
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({error: 'Error executing query'});
        }
        return res.json(data);
    })
})

app.get('/majors', (req, res) => {

    const sql = "SELECT DISTINCT expertMajor FROM Expert";
    db.query(sql, (err, data) => {
        if(err){
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Error executing query' });
        }
        const randomExpert = data[0];
        const majors = data.map(item => item.expertMajor);
        console.log("current major: ", majors);

        return res.json({ majors });
    })
});

app.get('/', (req, res) => {
    if (db.state !== 'authenticated') {
        console.error('Database connection is not authenticated.');
        return res.status(500).json({error: 'Database connection error'});
    }

    const sql = "SELECT * FROM Expert";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({error: 'Error executing query'});
        }
        // console.log("Query result:", data);
        return res.json(data);
    });
});


app.listen(8080, () => {
    console.log("Listening 8080")
})