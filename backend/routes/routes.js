const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require('path');
const createHelper = require('../js/createHelpers');
const updateHelper = require('../js/updateHelpers');

router.get('/', function (req, res, next) {
    fs.readFile('../frontend/views/index.html', (err, content) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          } else {
            console.log(path);
            res.writeHead(200, {
                "Content-type": "text/html",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(content);
        }
    });
});

router.get('/COMP4537/assignment/admin.html', (req, res, next) => {
    fs.readFile('../frontend/views//admin.html', (err, content) => {
        if(err) {
          res.writeHead(400, {
              "Content-Type": "text/html",
              "Access-Control-Allow-Origin": "*",
        });
          res.end(`The error is ${err}`)
        } else {
            console.log(path);
            res.writeHead(200, {
                "Content-type": "text/html",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(content);
        }
    });
})

router.get('/COMP4537/assignment/admin.html/questions', (req, res, next) => {
    fs.readFile('../frontend/views/admin.html', (err, content) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          } else {
            console.log(path);
            res.writeHead(200, {
                "Content-type": "text/html",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(content);
        }
    });
})

router.get('/questions', (req, res, next) => {
    createHelper.getQuestions(req, res);
})

router.post('/questions', (req, res, next) => {
    createHelper.initCreateQuestion(req, res);
})

router.put('/questions', (req, res, next) => {
    updateHelper.initUpdateQuestion(req, res);
})

router.delete('/questions', (req, res, next) => {
    createHelper.deleteQuestion(req, res);
});


router.get('/COMP4537/assignment/student.html', (req, res, next) => {
    fs.readFile('../frontend/views/student.html', (err, content) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          } else {
            console.log(path);
            res.writeHead(200, {
                "Content-type": "text/html",
                "Access-Control-Allow-Origin": "*",
            });
            res.end(content);
        }
    });
})

router.get('/COMP4537/Assignment/index.html', (req, res, next) => {
    fs.readFile('../frontend/views/index.html', (err, content) => {
        if(err) {
            res.writeHead(400, {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
          });
            res.end(`The error is ${err}`)
          } else {
            console.log(path);
            res.writeHead(200, {
                "Content-type": "text/html"
            });
            res.end(content);
        }
    });
})




module.exports = router;