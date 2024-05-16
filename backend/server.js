//백엔드 ( express.js + cors + axios )
const express = require("express");
const mysql = require('mysql');
const dbConfig = require('./config');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(dbConfig);



app.post('/signup', [         //회원가입 
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
    db.query('SELECT * FROM users WHERE name = ?', [req.body.name], (err, nameResults) => {
        if (err) {
            console.error("Error executing name query:", err);
            return res.status(500).json({ error: "Error executing name query" });
        }

        db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, emailResults) => {
            if (err) {
                console.error("Error executing email query:", err);
                return res.status(500).json({ error: "Error executing email query" });
            }

            if (nameResults.length > 0) {
                // 이미 존재하는 이름인 경우 오류 메시지 전달
                console.log("Name already exists (이미 존재하는 닉네임 입니다.)")
                return res.status(400).json({ error: "Name already exists (이미 존재하는 닉네임 입니다.)" });
            }

            if (emailResults.length > 0) {
                // 이미 존재하는 이메일인 경우 오류 메시지 전달
                console.log("Email already exists (이미 해당 이메일로 가입된 계정이 존재합니다.)")
                return res.status(400).json({ error: "Email already exists (이미 가입된 이메일 입니다.)" });
            }

            // 중복이 없으면 회원가입 처리 진행
            const sql = "INSERT INTO `users`(`name`, `email`, `password`) VALUES (?, ?, ?)";

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

app.post('/login', [              //로그인
    check('email').isEmail(),
    check('password').isLength({ min: 8 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    const values = [req.body.email, req.body.password];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Error executing users query:", err);
            return res.status(500).json({ error: "Error executing users query" });
        }
        if (data.length > 0) {
            const user = data[0];
            return res.json({ success: true, user: user });
        } else {
            return res.status(401).json({ success: false, error: "Invalid credentials (이메일 혹은 비밀번호가 일치하지 않습니다. )" });
        }
    });
});

app.post('/post', (req, res) => {  // 게시글 작성
    const { title, content, author_name } = req.body; // 클라이언트로부터 제목, 내용, 작성자 ID를 받아옵니다.
    const sql = 'INSERT INTO post (title, content, author_name) VALUES (?, ?, ?)';
    db.query(sql, [title, content, author_name], (err, result) => {
      if (err) {
        console.error('게시글 작성에 실패했습니다.', err);
        return res.status(500).json({ error: '게시글 작성에 실패했습니다.' });
      }
      console.log('게시글이 성공적으로 작성되었습니다.');
      res.json({ success: true, message: '게시글이 성공적으로 작성되었습니다.' });
    });
  });


  app.get('/post', (req, res) => {    // 게시글 표시 (불러오기)
    // DB에서 모든 게시물을 가져와서 클라이언트에 응답으로 보냅니다.
    db.query('SELECT * FROM post', (err, results) => {
      if (err) {
        console.error('게시물을 불러오는데 실패했습니다.', err);
        return res.status(500).json({ error: '게시물을 불러오는데 실패했습니다.' });
      }
      res.json(results);
    });
  });

  app.get('/pagenation', (req, res) => {           // 페이지네이션
    const page = parseInt(req.query.page) || 1; // 요청된 페이지 번호를 파싱하고, 기본값으로 1을 설정합니다.
    const pageSize = 10; // 페이지 크기, 한 페이지당 10개의 게시글
  
    const start = (page - 1) * pageSize; // 페이지의 시작 인덱스
    const end = start + pageSize; // 페이지의 끝 인덱스
  
    // DB에서 해당 페이지의 게시글 가져오기
    db.query('SELECT * FROM post ORDER BY created_at DESC LIMIT ?, ?', [start, pageSize], (err, results) => {
      if (err) {
        console.error('게시물을 불러오는데 실패했습니다.', err);
        return res.status(500).json({ error: '게시물을 불러오는데 실패했습니다.' });
      }
      
      // 총 게시글 수 카운트
      db.query('SELECT COUNT(*) AS total FROM post', (err, countResult) => {
        if (err) {
          console.error('게시물을 불러오는데 실패했습니다.', err);
          return res.status(500).json({ error: '게시물을 불러오는데 실패했습니다.' });
        }
  
        const totalPosts = countResult[0].total;
        const totalPages = Math.ceil(totalPosts / pageSize); // 전체 페이지 수 계산
  
        // 클라이언트에 응답으로 데이터 전송
        res.json({ post: results, totalPages });
      });
    });
  });

 

app.get('/postedit/:post_id', (req, res) => {
  const post_id = req.params.post_id;

  // 해당 post_id에 해당하는 게시글을 데이터베이스에서 조회하는 쿼리 작성
  const sql = 'SELECT * FROM post WHERE post_id = ?';

  // 조회된 게시글 반환
  db.query(sql, [post_id], (err, result) => {
      if (err) {
          console.error('게시글 조회에 실패했습니다.', err);
          return res.status(500).json({ error: '게시글 조회에 실패했습니다.' });
      }
      if (result.length === 0) {
          // 조회된 게시글이 없을 경우 에러 응답
          console.log('해당하는 게시글을 찾을 수 없습니다.');
          return res.status(404).json({ error: '해당하는 게시글을 찾을 수 없습니다.' });
      }
      // 조회된 게시글을 클라이언트에 응답으로 반환
      res.json(result[0]);
  });
});

app.put('/postedit/:post_id', (req, res) => {
  const post_id = req.params.post_id;
  const { title, content } = req.body;

  // 해당 post_id에 해당하는 게시글을 업데이트하는 쿼리 작성
  const sql = 'UPDATE post SET title = ?, content = ? WHERE post_id = ?';

  // 게시글 업데이트 실행
  db.query(sql, [title, content, post_id], (err, result) => {
      if (err) {
          console.error('게시글 수정에 실패했습니다.', err);
          return res.status(500).json({ error: '게시글 수정에 실패했습니다.' });
      }
      console.log('게시글이 성공적으로 수정되었습니다.');
      res.json({ success: true, message: '게시글이 성공적으로 수정되었습니다.' });
  });
});

app.delete('/post/:post_id', (req, res) => {   // 게시글,댓글 삭제 
    const post_id = req.params.post_id;

    // 먼저 해당 게시글과 연결된 모든 댓글을 삭제합니다.
    const deleteCommentsQuery = 'DELETE FROM comment WHERE post_id = ?';

    db.query(deleteCommentsQuery, [post_id], (err, commentResult) => {
        if (err) {
            console.error('댓글 삭제에 실패했습니다.', err);
            return res.status(500).json({ error: '댓글 삭제에 실패했습니다.' });
        }

        // 게시글을 삭제하는 쿼리 작성
        const deletePostQuery = 'DELETE FROM post WHERE post_id = ?';

        // 게시글 삭제 실행
        db.query(deletePostQuery, [post_id], (err, postResult) => {
            if (err) {
                console.error('게시물 삭제에 실패했습니다.', err);
                return res.status(500).json({ error: '게시물 삭제에 실패했습니다.' });
            }
            console.log('게시물이 성공적으로 삭제되었습니다.');
            res.json({ success: true, message: '게시물이 성공적으로 삭제되었습니다.' });
        });
    });
});

app.post('/comments/:post_id', (req, res) => {   //댓글 작성 
    const { post_id } = req.params;
    const { comment_name, content } = req.body;

    // 댓글을 저장하는 쿼리 작성
    const sql = 'INSERT INTO comment (post_id, comment_name, content) VALUES (?, ?, ?)';
    
    // 게시물에 댓글을 추가
    db.query(sql, [post_id, comment_name, content], (err, result) => {
        if (err) {
            console.error('댓글 작성에 실패했습니다.', err);
            return res.status(500).json({ error: '댓글 작성에 실패했습니다.' });
        }
        console.log('댓글이 성공적으로 작성되었습니다.');
        res.json({ success: true, message: '댓글이 성공적으로 작성되었습니다.' });
    });
});

app.get('/comments/:post_id', (req, res) => {    //댓글 표시 
    const { post_id } = req.params;

    // 해당 게시물의 댓글을 가져오는 쿼리 작성
    const sql = 'SELECT * FROM comment WHERE post_id = ?';

    // 게시물의 댓글을 조회
    db.query(sql, [post_id], (err, results) => {
        if (err) {
            console.error('댓글을 불러오는데 실패했습니다.', err);
            return res.status(500).json({ error: '댓글을 불러오는데 실패했습니다.' });
        }
        res.json({ comments: results });
    });
});


app.delete('/comments/:comment_id', (req, res) => {   // 댓글 삭제
    const comment_id = req.params.comment_id;

    // 해당 comment_id에 해당하는 댓글을 삭제하는 쿼리 작성
    const sql = 'DELETE FROM comment WHERE comment_id = ?';

    // 댓글 삭제 실행
    db.query(sql, [comment_id], (err, result) => {
        if (err) {
            console.error('댓글 삭제에 실패했습니다.', err);
            return res.status(500).json({ error: '댓글 삭제에 실패했습니다.' });
        }
        console.log('댓글이 성공적으로 삭제되었습니다.');
        res.json({ success: true, message: '댓글이 성공적으로 삭제되었습니다.' });
    });
});

app.post('/post/:postId/views', async (req, res) => {
    try {
        const postId = req.params.postId;
        // postId에 해당하는 게시글의 조회수를 1 증가시키는 쿼리를 실행합니다.
        // 여기서는 예시로 SQL 쿼리를 사용하였습니다. 사용하는 데이터베이스에 맞게 쿼리를 작성해주세요.
        const sql = 'UPDATE post SET views = views + 1 WHERE post_id = ?';
        db.query(sql, [postId], (err, result) => {
            if (err) {
                console.error('게시글 조회수 증가에 실패했습니다.', err);
                return res.status(500).json({ error: '게시글 조회수 증가에 실패했습니다.' });
            }
            console.log('게시글 조회수가 성공적으로 증가되었습니다.');
            res.json({ success: true, message: '게시글 조회수가 성공적으로 증가되었습니다.' });
        });
    } catch (error) {
        console.error('게시글 조회수 증가 중 오류 발생:', error);
        res.status(500).json({ error: '게시글 조회수 증가 중 오류 발생' });
    }
});

app.get('/post/search', (req, res) => {         // 게시글 검색
    const searchTerm = req.query.term; // 클라이언트로부터 검색어를 받아옵니다.
    const sql = 'SELECT * FROM post WHERE title LIKE ?'; // 검색어를 포함하는 제목을 가진 게시글을 찾는 쿼리
    const searchValue = `%${searchTerm}%`; // SQL LIKE 연산자에 사용할 검색 값

    // SQL 쿼리 실행
    db.query(sql, [searchValue], (err, results) => {
        if (err) {
            console.error('게시물 검색에 실패했습니다.', err);
            return res.status(500).json({ error: '게시물 검색에 실패했습니다.' });
        }
        res.json(results); // 검색 결과를 클라이언트에 응답으로 보냅니다.
    });
});


app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
