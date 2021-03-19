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

function initUpdateQuestion(req, res) {
    db.getConnection((err, connection) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
        }
        updateQuestion(connection, req, res);
    })
}

function updateQuestion(connection, req, res) {
    let queryData = req.body;
    let updateQuestion = `UPDATE QUESTION SET DESCRIPTION = '${queryData['currentQuestion']}' WHERE QUESTION_ID = ${queryData['questionID']}`;
    connection.query(updateQuestion, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        getCurrentAnswers(connection, queryData, res);
    })
}

function getCurrentAnswers(connection, queryData, res) {
    let answers = `SELECT * FROM ANSWER WHERE QUESTION_ID = ${queryData['questionID']}`;
    connection.query(answers, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        let formattedAnswers = formatAllAnswers(queryData, queryData['questionID'], results);
        updateAllAnswers(connection, res, formattedAnswers);
    })
}

function updateAllAnswers(connection, res, formattedAnswers) {
    let answerQuery = '';
    formattedAnswers.forEach((answer) => {
        let id = answer[0];
        let newAnswer = answer.slice(2,5);
        newAnswer.push(id);
        answerQuery += mysql.format('UPDATE ANSWER SET ANSWER = ?, IS_ANSWER = ?, ANSWER_INDEX = ? WHERE ANSWER_ID = ?; ', newAnswer);
    })
    connection.query(answerQuery, (err, results) => {
        if(err){
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
          res.end(`Query Failed`);
        }
        res.end("success");
    });
}

function formatAllAnswers(queryData, questionID, results) {
    let answerArray = [];
    for(const [key, value] of Object.entries(queryData)){
        if(value === null) continue;
        console.log(typeof key);
        switch(key) {
            case 'a1':
                (queryData.ansIndex === (0)) ? answerArray.push([results[0].ANSWER_ID, questionID, value, true, queryData['ansIndex']]) : answerArray.push([results[0].ANSWER_ID, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a2':
                (queryData.ansIndex === (1)) ? answerArray.push([results[1].ANSWER_ID, questionID, value, true, queryData['ansIndex']]) : answerArray.push([results[1].ANSWER_ID, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a3':
                (queryData.ansIndex === (2)) ? answerArray.push([results[2].ANSWER_ID, questionID, value, true, queryData['ansIndex']]) : answerArray.push([results[2].ANSWER_ID, questionID, value, false, queryData['ansIndex']])
                break;
            case 'a4':
                (queryData.ansIndex === (3)) ? answerArray.push([results[3].ANSWER_ID, questionID, value, true, queryData['ansIndex']]) : answerArray.push([results[3].ANSWER_ID, questionID, value, false, queryData['ansIndex']])
                break;
            default:
                continue;
        }
    }
    return answerArray;
}

module.exports = {initUpdateQuestion};