const mysql = require("mysql");
const db = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "ass1",
});

function getQuestions(req, res) {
    db.getConnection((err, connection) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          }
        let query = "SELECT TITLE, DESCRIPTION, ANSWER, IS_ANSWER, ANSWER_INDEX, QQ.QUIZ_ID, QQ.QUESTION_ID, A.ANSWER_ID FROM QUIZ_QUESTION QQ JOIN QUIZ Q ON (Q.QUIZ_ID = QQ.QUIZ_ID) JOIN QUESTION QZ ON (QZ.QUESTION_ID = QQ.QUESTION_ID) JOIN ANSWER A ON (A.QUESTION_ID = QQ.QUESTION_ID)";
        connection.query(query,(err, results) => {
            if(err) {
                res.writeHead(400, {
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
              });
                res.end(`The error is ${err}`)
              }
                let rows = results;
                res.end(JSON.stringify(rows));
                connection.release();
            })
    })
}

function allAnswers(queryData, questionID) {
    let answerArray = [];
    for(const [key, value] of Object.entries(queryData)){
        if(value === null) continue;
        console.log(typeof key);
        switch(key) {
            case 'a1':
                (queryData.ansIndex === (0)) ? answerArray.push([0, questionID, value, true, queryData['ansIndex']]) : answerArray.push([0, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a2':
                (queryData.ansIndex === (1)) ? answerArray.push([0, questionID, value, true, queryData['ansIndex']]) : answerArray.push([0, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a3':
                (queryData.ansIndex === (2)) ? answerArray.push([0, questionID, value, true, queryData['ansIndex']]) : answerArray.push([0, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a4':
                (queryData.ansIndex === (3)) ? answerArray.push([0, questionID, value, true,  queryData['ansIndex']]) : answerArray.push([0, questionID, value, false, queryData['ansIndex']])
                break;
            default:
                continue;
        }
    }
    return answerArray;
}



function initCreateQuestion(req, res) {
    db.getConnection((err, connection) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          }
        let queryData = req.body;
        createQuestion(connection, queryData, res);
    })
}

function createQuestion(connection, queryData, res) {
    let questionID;
    let createQuestion = `INSERT INTO QUESTION(QUESTION_ID, DESCRIPTION) VALUES (${0}, '${queryData['currentQuestion']}')`;
    connection.query(createQuestion,(err, results) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          }
            questionID = results.insertId;
            let answerArr = allAnswers(queryData, questionID);
            createAnswer(connection, queryData, questionID, res, answerArr);
        })
}

function createAnswer(connection, queryData, questionID, res, answerArr) {
    let insertArr = `INSERT INTO ANSWER (ANSWER_ID, QUESTION_ID, ANSWER, IS_ANSWER, ANSWER_INDEX) VALUES ?`;
    connection.query(insertArr, [answerArr], (err, results) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          }
       let quiz = 'SELECT * FROM QUIZ'
       connection.query(quiz, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        (results.length === 0) ? createQUIZ(connection, queryData, questionID, res) : insertIntoQUIZ_QUESTION(connection, queryData, questionID, res);
       })
    })
}

function createQUIZ(connection, queryData, questionID, res) {
    let createQUIZ = "INSERT INTO QUIZ(QUIZ_ID, TITLE) VALUES(0, 'DEFAULT')";
    connection.query(createQUIZ, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        insertIntoQUIZ_QUESTION(connection, queryData, questionID, res);
    })
}



function insertIntoQUIZ_QUESTION(connection, queryData, questionID, res) {
    let quiz_question = `INSERT INTO QUIZ_QUESTION(QUIZ_ID, QUESTION_ID) VALUES (${queryData['quiz_id']}, ${questionID})`;
    connection.query(quiz_question, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        console.log(results);
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
      }); 
        res.end("Success");
    })
}

module.exports = {initCreateQuestion, getQuestions};