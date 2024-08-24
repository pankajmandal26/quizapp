const questions = [
    {
        question: "who got honarary oscar award in india in films? ",
        answers : [
            {text: "Satyajit Ray", correct: true },
            {text: "Ritwik Ghatak", correct: false },
            {text: "Mrinal Sen", correct: false },
            {tecxt: "Anjan Dutt", correct: false },
        ]
    },
    {
        question: "Who is known as the Father of Indian cinema? ",
        answers : [
            {text: "charan singh", correct: false },
            {text: "Dhundiraj Govind Phalke", correct: true },
            {text: "Raja Lalith Rai", correct: false },
            {text: "Balram Naidu", correct: false }, 
        ]
    },
    {
        question: " Which is the highest-grossing Indian film ever? ",
        answers : [
            {text: "Dabang", correct: false },
            {text: "PK", correct: false },
            {text: "Dangal", correct: true},
            {text: "Bajrangi Bhaijaan", correct: false }, 
        ]
    },
    {
        question: " Which actor has won the most national awards in India? ",
        answers : [
            {text: "SRK", correct: true},
            {text: "Aamir Khan", correct: false },
            {text: "Vikram", correct: false},
            {text: "Amitabh Bachchan", correct: false }, 
        ] 
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion. 
    question;

    currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button");
       button.innerHTML = answer.text;
       button.classList.add("btn");
       answerButtons.appendChild(button);
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
       button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play again"
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
