// Structure variables
var containerQuestionEl = document.getElementById("question-container");
var containerStartEl = document.getElementById("starter-container");
var containerEndEl = document.getElementById("end-container");
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var ViewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

// Buttons variable
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");
                
// Question variables    
var questionEl = document.getElementById("question")
var answerbuttonsEl = document.getElementById("answer-buttons")
var timerEl = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover
timerEl.innerText = 0;
                                        
// High Score array variable
var HighScores = [];
        
//assign array details for questions 
var arrayShuffledQuestions
var QuestionIndex = 0
                
// The array of questions for our quiz game.
var questions = [
    {
        quest: 'Arrays in Javascript can be used to store __________.', 
        answer: '4. all of the above', 
        choices: [{ choice: '1. numbers' }, { choice: '2. booleans' }, { choice: '3. strings' }, { choice: '4. all of the above' }]
    },
       
    {
        quest: "Commonly used data types DO NOT include:",
        answer: "alerts",
        choices: [{ choice: '1. strings' }, { choice: '2. booleans' }, { choice: '3. Alerts' }, { choice: '4. Numbers' }]
    },
        
    {
        quest: 'In the code -- setinterval(time(),1000) -- what is time()?', 
        answer: '1. callback function', 
        choices: [{ choice: '1. callback function' }, { choice: '2. undefined' }, { choice: '3. variable' }, { choice: '4. all of the above' }]
    },
                            
    {
        quest: 'What syntax would call a function?', 
        answer: '4. function()', 
        choices: [{ choice: '1. callback function' }, { choice: '2. function' }, { choice: '3. call functions' }, { choice: '4. function' }]
    },
            
    {
        quest: 'What is getItem commonly used for?', 
        answer: '2. local storage',
        choices: [{ choice: '1. adding drama' }, { choice: '2. local storage' }, { choice: '3. online shopping' }, { choice: '4. naming a variable' }]
    },

    {
        quest: "Which of the following function of Number object returns the number's value",
        answer: "valueOf()",
        choices: [{ choice: '1. toString' }, { choice: '2. ValueOf()' }, { choice: '3. toLocalString()' }, { choice: '4. toPrecision()' }]
    },
];
            
      
//if go back button is hit on high score page
var renderStartPage = function () {
    containerHighScoresEl.classList.add("hide")
    containerHighScoresEl.classList.remove("show")
    containerStartEl.classList.remove("hide")
    containerStartEl.classList.add("show")
    containerScoreEl.removeChild(containerScoreEl.lastChild)
    QuestionIndex = 0
    gameover = ""
    timerEl.textContent = 0 
    score = 0
    
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    }
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");  
    }
}
      
//Check if game-over is true, or if there is time left. Start time at 30. 
var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }
     
var startGame = function () {   
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    setQuestion()
}
            
        
//set next question for quiz
var setQuestion = function () {
    resetAnswers()
    displayQuestion(arrayShuffledQuestions[QuestionIndex])
}
var resetAnswers = function () {
    while (answerbuttonsEl.firstChild) {
        answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
    };
};
            
//display question information (including answer buttons)
var displayQuestion = function(index) {
    questionEl.innerText = index.quest
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerbuttonsEl.appendChild(answerbutton)
    }
};
                
//display correct! on screen
var answerCorrect = function () {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide")
        correctEl.classList.add("banner")
        wrongEl.classList.remove("banner")
        wrongEl.classList.add("hide")
    }
}  
                
//display wrong! on screen
var answerWrong = function () {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide")
        wrongEl.classList.add("banner")
        correctEl.classList.remove("banner")
        correctEl.classList.add("hide")
    }
}
            
var answerCheck = function (event) {
    var selectedanswer = event.target
    if (arrayShuffledQuestions[QuestionIndex].answer === selectedanswer.innerText) {
        answerCorrect()
        score = score + 7
    }
    else {
        answerWrong()
        score = score - 1;
        timeleft = timeleft - 3;
    };
    
    QuestionIndex++
    if (arrayShuffledQuestions.length > QuestionIndex + 1) {
        setQuestion()
    }   
    else {
        gameover = "true";
        showScore();
    }
}
            
//Display total score screen at end of game
var showScore = function () {
    var scoreDisplay = document.createElement("p");
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
}       
                    
//create high score values
var createHighScore = function (event) { 
    event.preventDefault() 
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    }        
    formInitials.reset();
    var HighScore = {
        initials: initials,
        score: score
    }  
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });
    
    //clear visibile list to resort
    while (listHighScoreEl.firstChild) {
    listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }
    saveHighScore();
    displayHighScores();
    
}
        
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))              
}

//load values
var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }
    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })
    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
        HighScores.push(LoadedHighScores[i]);              
    }
}  

var displayHighScores = function () {
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true"
    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
    }
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    }        
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    }
    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    }
    
    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    }           
}
        
var clearScores = function () {
    HighScores = [];
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    }
    localStorage.clear(HighScores);
} 
loadHighScore()
                                
btnStartEl.addEventListener("click", startGame)
formInitials.addEventListener("submit", createHighScore)
        
ViewHighScoreEl.addEventListener("click", displayHighScores)
        
      
btnGoBackEl.addEventListener("click", renderStartPage)
        
btnClearScoresEl.addEventListener("click", clearScores)
           