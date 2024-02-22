const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,email,password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', [
    check('email', "Emaill length error").isEmail().isLength({ min: 10, max: 30 }),
    check('password', "password length 8-10").isLength({ min: 8, max: 10 })
], (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(errors);
        } else {
            if (err) {
                return res.json("Error");
            }
            if (data.length > 0) {
                return res.json("Success");
            } else {
                return res.json("Faile");
            }
        }
    });
});

app.listen(8081, () => {
    console.log("listening");
});
