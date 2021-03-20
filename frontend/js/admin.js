class Question {
    constructor(currentQuestion, a1, a2, a3, a4, ans, ansIndex) {
        this.currentQuestion = currentQuestion;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
        this.a4 = a4;
        this.ans = ans;
        this.ansIndex = ansIndex;
        this.quiz_id;
        this.questionID;
    }
    storeQuestion() {
        const XHR = new XMLHttpRequest();
        this.quiz_id = sessionStorage.getItem('quiz_ID');
        let host = `http://localhost:8888/questions`;
        //let string = `https://andrewtakahashi.ca/COMP4537/labs/5/writeDB/?name="${name}"&score=${new_score}`;
        XHR.open("POST", host, true);
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XHR.send(JSON.stringify(this));
        XHR.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                let questions = JSON.parse(this.responseText);
                console.log(questions);
                alert("Question Created Successfully")
              //document.getElementById("quesContainer").innerHTML = this.responseText;
            } else if (this.readyState == 4 && this.status == 400) {
              document.getElementById("quesContainer").innerHTML = this.responseText;
            }
        }
    }

    updateQuestion() {
        const XHR = new XMLHttpRequest();
        this.quiz_id = sessionStorage.getItem('quiz_ID');
        let host = `http://localhost:8888/questions`;
        //let string = `https://andrewtakahashi.ca/COMP4537/labs/5/writeDB/?name="${name}"&score=${new_score}`;
        XHR.open("PUT", host, true);
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XHR.send(JSON.stringify(this));
        XHR.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            } else if (this.readyState == 4 && this.status == 400) {
                alert(this.responseText);
            }
        }
    }

    deleteQuestion(question_id) {
        const XHR = new XMLHttpRequest();
        this.quiz_id = sessionStorage.getItem('quiz_ID');
        this.questionID = question_id;
        let host = `http://localhost:8888/questions`;
        //let string = `https://andrewtakahashi.ca/COMP4537/labs/5/writeDB/?name="${name}"&score=${new_score}`;
        XHR.open("DELETE", host, true);
        XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        XHR.send(JSON.stringify(this));
        XHR.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            } else if (this.readyState == 4 && this.status == 400) {
                alert(this.responseText);
            }
        }
    }

    setQuizID(targetID) {
        this.questionID = targetID;
    }
}

window.addEventListener("load", function () {
    const XHR = new XMLHttpRequest();
    let host = `http://localhost:8888/questions`;
    //let string = `https://andrewtakahashi.ca/COMP4537/labs/5/writeDB/?name="${name}"&score=${new_score}`;
    XHR.open("GET", host, true);
    XHR.send();
    XHR.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let questions = JSON.parse(this.responseText);
            if(questions.length === 0 ) {
                let displayScore = document.getElementById("warning");
                displayScore.innerHTML = "NO QUIZZES FOUND";
            } else {
                sessionStorage.setItem('quiz_ID', questions[0].QUIZ_ID)
                sessionStorage.setItem('questions', JSON.stringify(questions));
                getQuestions(questions);
            }
        } else if (this.readyState == 4 && this.status == 400) {
            let displayScore = document.getElementById("warning");
            displayScore.innerHTML = this.responseText;
        }
    }
  } );

  function addQuestion() {
    let currentQuestion = document.getElementById("editableProblem").value;
    let a1 = document.getElementById("r5").value
    let a2 = document.getElementById("r6").value;
    let a3 = document.getElementById("r7");
    let a4 = document.getElementById("r8");
    if(a3 === null) {
        processQuestion(currentQuestion, a1, a2, null, null);
    } else if (a4 === null) {
        processQuestion(currentQuestion, a1, a2, a3.value, null);
    } else {
        processQuestion(currentQuestion, a1, a2, a3.value, a4.value);
    }
}

function processQuestion(currentQuestion, a1, a2, a3, a4) {
    if (document.getElementById("r1").checked === true) {
        let ans = a1;
        let ansIndex = 0;
        let question = new Question(currentQuestion, a1, a2, a3, a4, ans, ansIndex);
        question.storeQuestion();
    } else if (document.getElementById("r2").checked === true) {
        let ans = a2;
        let ansIndex = 1;
        let question = new Question(currentQuestion, a1, a2, a3, a4, ans, ansIndex);
        question.storeQuestion();
    } else if (document.getElementById("r3").checked === true) {
        let ans = a3;
        let ansIndex = 2;
        let question = new Question(currentQuestion, a1, a2, a3, a4, ans, ansIndex);
        question.storeQuestion();
    } else if (document.getElementById("r4").checked === true) {
        let ans = a4;
        let ansIndex = 3;
        let question = new Question(currentQuestion, a1, a2, a3, a4, ans, ansIndex);
        question.storeQuestion();
    } else {
        alert("Please check box before submitting");
    }
}

function deleteQuestion() {
    let parentdiv = document.querySelector('#quesContainer').children;
    if(parentdiv.length === 0) {
        alert("Cannot Delete no question found");
    } else {
        let childList = Array.from(parentdiv);
        let child = childList[childList.length - 1];
        let question_id = child.getAttribute('id');
        let deletedQuestion = new Question();
        deletedQuestion.deleteQuestion(parseInt(question_id));
    }
}

function addField() {
    let form = document.getElementById("form-edit-question");
    let count = form.getElementsByClassName("input-group").length;
    let btn = form.querySelector(".main-btn");
    if(count >= 4) {
        alert("Cannot have more than 4 fields");
    } else {
        let groups = createInputGroup();
        let radio = document.createElement('input');
        let answer = document.createElement('input');
        radio.id = "r" + (count + 1);
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question");
        radio.setAttribute("value", null);
        answer.classList.add("form-control");
        answer.id = "r" + (count + 5);
        answer.setAttribute("type", "text");
        answer.setAttribute("name", "answer");
        groups[2].appendChild(radio);
        groups[1].appendChild(groups[2]);
        groups[0].append(groups[1]);
        groups[0].append(answer);
        btn.before(groups[0]);
    }
}

function removeField() {
    let form = document.getElementById("form-edit-question");
    let count = form.getElementsByClassName("input-group").length;
    if(count <= 2) {
        alert("Cannot have less than 2 fields");
    } else {
       form.removeChild(form.lastElementChild.previousElementSibling);
    }
}

function createInputGroup() {
    let groupArray = [];
    let inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    let inputGroupPrepend = document.createElement("div");
    inputGroupPrepend.className = "input-group-prepend";
    let inputGroupText = document.createElement("div");
    inputGroupText.className = "input-group-text";
    groupArray.push(inputGroup);
    groupArray.push(inputGroupPrepend);
    groupArray.push(inputGroupText);
    return groupArray;
    
}

  function createInput(questionWrapper, form, input1, input2, ANSWER, IS_ANSWER, ANSWER_ID, questionNumber) {
    let groups = createInputGroup();
    let question = "question" + questionNumber;
    let btn = questionWrapper.querySelector('.btn');
    input1.checked = IS_ANSWER;
    input1.type = "radio"
    input1.name = question;
    input2.className = "form-control";
    input2.type = "text";
    input2.name = "answer" + ANSWER_ID;
    input2.value = ANSWER;
    groups[2].appendChild(input1);
    groups[1].appendChild(groups[2]);
    groups[0].appendChild(groups[1]);
    groups[0].appendChild(input2);
    //questionWrapper.appendChild(groups[0]);
    btn.before(groups[0]);
    form.appendChild(questionWrapper);
}

function processInputs() {
    let parentdiv = this.parentNode;
    let targetID = parentdiv.getAttribute('id');
    let targetTextArea = parentdiv.querySelector('.form-group').getElementsByClassName('form-control');
    let textData = targetTextArea[0].value;
    let inputs = parentdiv.getElementsByTagName('input');
    let inputList = [];
    inputList.push(textData);
    for (let i = 0; i < inputs.length; i++) {
        let radioVal;
        let answerText;
        if(inputs[i].type.toLowerCase() === 'radio')  {
            radioVal = inputs[i].checked;
            inputList.push(radioVal);
        } else if(inputs[i].value != 'Save') {
            answerText = inputs[i].value;
            inputList.push(answerText);
        } else {
            continue;
        }
    }
    save(inputList, targetID);
}

function save(inputList, targetID){
    let questionText = inputList[0];
    let ansIndex = getAnswerIndex(inputList);
    if(typeof inputList[5] === 'undefined') {
        let newQuestion = new Question(questionText, inputList[2], inputList[4], null, null, ansIndex['answer'], ansIndex['index']);
        newQuestion.setQuizID(targetID);
        newQuestion.updateQuestion();
    } else if (typeof inputList[7] === 'undefined') {
        let newQuestion = new Question(questionText, inputList[2], inputList[4], inputList[6], null, ansIndex['answer'], ansIndex['index']);
        newQuestion.setQuizID(targetID);
        newQuestion.updateQuestion();
    } else {
        let newQuestion = new Question(questionText, inputList[2], inputList[4], inputList[6], inputList[8], ansIndex['answer'], ansIndex['index']);
        newQuestion.setQuizID(targetID);
        newQuestion.updateQuestion();
    }
}

function getAnswerIndex(inputList) {
    let answerDic = {}
    if(inputList[1]) {
        answerDic['answer'] = inputList[2];
        answerDic['index'] = 0;
    } 
    if(inputList[3]){
        answerDic['answer'] = inputList[4];
        answerDic['index'] = 1;

    };
    if(inputList[5] && typeof inputList[5] != undefined){
        answerDic['answer'] = inputList[6];
        answerDic['index'] = 2;
    };
    if(inputList[7] && typeof inputList[7] != undefined){
        answerDic['answer'] = inputList[8];
        answerDic['index'] = 3;
    };
    return answerDic;
}

function createBtn() {
    let saveBtn = document.createElement("input");
    saveBtn.value = "Save";
    saveBtn.classList.add("btn", "btn-outline-primary", "saveBtn", "btn-lg");
    saveBtn.type = "button"
    saveBtn.onclick = processInputs;
    return saveBtn;
}



function createTextArea(questionWrapper, form, questionTitle, questionID) {
    let formDiv = document.createElement("div");
    let textarea = document.createElement("textarea");
    let problem = "problem " + questionID;
    let button = createBtn();
    textarea.value = questionTitle;
    formDiv.className = "form-group";
    textarea.className = "form-control"
    textarea.name = problem;
    textarea.cols = "57";
    textarea.rows = "5";
    formDiv.appendChild(textarea);
    questionWrapper.appendChild(formDiv);
    questionWrapper.appendChild(button);
    form.appendChild(questionWrapper);
}


function getQuestions(questions) {
    let form = document.getElementById("quesContainer");
    let PREV_ID;
    let questionWrapper = document.createElement('div');
    for(let i = 0; i < questions.length; i++) {
        if(questions[i].QUESTION_ID === PREV_ID) {
            let input1 = document.createElement("input");
            let input2 = document.createElement("input");
            createInput(questionWrapper, form, input1, input2, questions[i].ANSWER, questions[i].IS_ANSWER, questions[i].ANSWER_ID, questions[i].QUESTION_ID);
            PREV_ID = questions[i].QUESTION_ID;
        } else {
            let input1 = document.createElement("input");
            let input2 = document.createElement("input");
            questionWrapper = document.createElement('div');
            questionWrapper.id = questions[i].QUESTION_ID;
            questionWrapper.classList.add("question-wrapper", "border", "border-light");
            createTextArea(questionWrapper, form, questions[i].DESCRIPTION, questions[i].QUESTION_ID);
            createInput(questionWrapper, form, input1, input2, questions[i].ANSWER, questions[i].IS_ANSWER, questions[i].ANSWER_ID, questions[i].QUESTION_ID);
            PREV_ID = questions[i].QUESTION_ID;
        }
    }
}