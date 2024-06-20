const questions = [
    {
        question: "which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Tiger", correct: false},
            {text: "Lion", correct: false}
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            {text: "Japan", correct: false},
            {text: "Delhi", correct: true},
            {text: "Mumbai", correct: false},
            {text: "Gurgaon", correct: false}
        ]
    },
    {
        question: "which is the largest continent in the World?",
        answers:[
            {text: "Asia", correct: true},
            {text: "South Africa", correct: false},
            {text: "North Amarica", correct:false },
            {text: "Austrailia", correct: false},
        ]
    },
    {
        question: "Where is taj mahal located?",
        answers: [
            {text: "Agra", correct: true},
            {text: "Delhi", correct: false},
            {text: "Noida", correct: false},
            {text: "Lucknow", correct: false},
        ]
    }
];

const questionElement = document.querySelector(".questions");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.computedStyleMap.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selecteBtn = e.target;
    const isCorrect = selecteBtn.dataset.correct === "true"
    if(isCorrect){
        selecteBtn.classList.add("correct");
        score++;
    }else{
        selecteBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex ++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})
startQuiz()