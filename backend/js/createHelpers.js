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
        let quiz_id = queryData['quiz_id'];
        (results.length === 0) ? createQUIZ(connection, quiz_id, questionID, res) : insertIntoQUIZ_QUESTION(connection, quiz_id, questionID, res);
       })
    })
}

function createQUIZ(connection, quiz_id, questionID, res) {
    let createQUIZ = "INSERT INTO QUIZ(QUIZ_ID, TITLE) VALUES(0, 'DEFAULT')";
    connection.query(createQUIZ, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        let newQuizID = results.insertId;
        insertIntoQUIZ_QUESTION(connection, newQuizID, questionID, res);
    })
}



function insertIntoQUIZ_QUESTION(connection, quiz_id, questionID, res) {
    let quiz_question = `INSERT INTO QUIZ_QUESTION(QUIZ_ID, QUESTION_ID) VALUES (${quiz_id}, ${questionID})`;
    connection.query(quiz_question, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        res.end("Success");
    })
}

function deleteQuestion(req, res) {
    db.getConnection((err, connection) => {
        let quiz_id = req.body.quiz_id;
        let question_id = req.body.questionID;
        let delete_quiz_question = `DELETE FROM QUIZ_QUESTION WHERE QUIZ_ID = ${quiz_id} AND QUESTION_ID = ${question_id}`;
        connection.query(delete_quiz_question, (err, results) => {
            if(err){
                res.writeHead(400, {
                    "Content-Type": "text/html",
                    "Access-Control-Allow-Origin": "*",
              });
              res.end(`Query Failed`);
            }
            console.log(results);
            deleteAnswers(connection, quiz_id, question_id, res);
        })
    })
}

function deleteCurrentQuestion(connection, question_id, res) {
    let delete_question = `DELETE FROM QUESTION WHERE QUESTION_ID = ${question_id}`;
    connection.query(delete_question, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        console.log(results);
        res.end(`Success Question ${question_id} was deleted`);
    })
}

function deleteAnswers(connection, quiz_id, question_id, res) {
    let deleteAnswers = `DELETE FROM ANSWER WHERE QUESTION_ID = ${question_id}`;
    connection.query(deleteAnswers, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        deleteCurrentQuestion(connection, question_id, res);
    })
}


module.exports = {initCreateQuestion, getQuestions, deleteQuestion};