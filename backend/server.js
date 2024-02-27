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

    // 이름과 이메일을 따로 중복 확인하여 이미 존재하는 경우 오류 메시지 반환
    db.query('SELECT * FROM login WHERE name = ?', [req.body.name], (err, nameResults) => {
        if (err) {
            console.error("Error executing name query:", err);
            return res.status(500).json({ error: "Error executing name query" });
        }

        db.query('SELECT * FROM login WHERE email = ?', [req.body.email], (err, emailResults) => {
            if (err) {
                console.error("Error executing email query:", err);
                return res.status(500).json({ error: "Error executing email query" });
            }

            if (nameResults.length > 0) {
                // 이미 존재하는 이름인 경우 오류 메시지 전달
                console.log("Name already exists")
                return res.status(400).json({ error: "Name already exists" });
            }

            if (emailResults.length > 0) {
                // 이미 존재하는 이메일인 경우 오류 메시지 전달
                console.log("Email already exists")
                return res.status(400).json({ error: "Email already exists" });
            }

            // 중복이 없으면 회원가입 처리 진행
            const sql = "INSERT INTO `login`(`name`, `email`, `password`) VALUES (?, ?, ?)";
            
            const values = [req.body.name, req.body.email, req.body.password];

            db.query(sql, values, (err, data) => {
                if (err) {
                    console.error("Error executing insert query:", err);
                    return res.status(500).json({ error: "Error executing insert query" });
                }
                return res.json({ success: true, message: "User registered successfully" });
            });
        });
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
            console.error("Error executing login query:", err);
            return res.status(500).json({ error: "Error executing login query" });
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
