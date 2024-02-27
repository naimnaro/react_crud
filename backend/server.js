const express = require("express");
const mysql = require('mysql');
const dbConfig = require('./config');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(dbConfig);

app.post('/signup', [
    // 사용자가 제공한 데이터의 유효성을 검사하는 미들웨어 추가
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 , max : 30})
], (req, res) => {
    // 유효성 검사 결과 확인
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // 쿼리를 Prepared Statement로 변경하여 SQL Injection 방지
    const sql = "INSERT INTO `login`(`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error executing query" });
        }
        return res.json({ success: true, message: "User registered successfully" });
    });
});

app.post('/login', [
    check('email').isEmail(),
    check('password').isLength({ min: 8 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const values = [req.body.email, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error executing query" });
        }
        if (data.length > 0) {
            const user = data[0];
            return res.json({ success: true, user: user });
        } else {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
