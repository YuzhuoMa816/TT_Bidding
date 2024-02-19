const cors = require('cors');
const express = require('express');


const {db} = require('./mysql_connect')
const app = express()
app.use(cors())

app.get('/', (req,res) =>{
    //return res.json("From Backend Side");
    const sql = "SELECT * FROM Expert ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Error executing query' });
        }
    const randomExpert = data[0];
    console.log("randomly selected: " , randomExpert);
    return res.json(randomExpert);



})
})

app.get('/expert', (req, res) => {
    if (db.state !== 'authenticated') {
        console.error('Database connection is not authenticated.');
        return res.status(500).json({ error: 'Database connection error' });
    }

    const sql = "SELECT * FROM Expert";
    db.query(sql, (err, data) =>{
        if(err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: 'Error executing query' });
        }
        console.log("Query result:", data);
        return res.json(data);
    });
});



app.listen(8080, () =>{
    console.log("Listening 8080")
})