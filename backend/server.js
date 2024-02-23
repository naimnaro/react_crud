const express = require("express");
const mysql = require('mysql');
const dbConfig = require('./config');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(dbConfig);

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO `login`(`name`, `email`, `password`) VALUES ('" + req.body.name + "', '" + req.body.email + "', '" + req.body.password + "')";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    console.log("SQL Query:", sql);
    console.log(values);
    console.log(req.body);
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error executing query:", err); // 에러 로그 출력
            return res.status(500).json({ error: "Error executing query" }); // 에러 응답 전송
        }
        return res.json(data);
    });
});

app.post('/login', [
    check('email', "Emaill length error").isEmail().isLength({ min: 10, max: 30 }),
    check('password', "password length 8-10").isLength({ min: 8, max: 30 })
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
