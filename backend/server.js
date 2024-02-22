const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1994",
    database : "signup"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.password

    ]
    db.query(sql, [values], (err, data) => {
        if (err)
        {
            return res.status(500).json({ error: "An error occurred while processing your request." });
        }
        return res.json(data);
    })
})

app.listen(3000, () => {
    console.log("listening...");
})