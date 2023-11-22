//----------------------- G O O D   L U C K -------------------------------//

// select all elements by id
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const scoreDiv2 = document.getElementById("scoreContainer_2");
const yourtime = document.getElementById("yourtime");

// create questions
let questions = [
  {
    question: "ไอลีนจะมางานแต่งไหม",
    imgSrc: "Stuffs/img/dog.gif",
    choiceA: "ไม่มา",
    choiceB: "มา",
    choiceC: "ไม่รู้จะเมา",
    choiceD: "เรื่องของแม่ง",
    correct: "A",
  },
  {
    question: "อยากได้กี่ดอกในคืนนี้ (ดอกไม้)",
    imgSrc: "Stuffs/img/flowers.gif",
    choiceA: "10",
    choiceB: "90",
    choiceC: "0",
    choiceD: "99999",
    correct: "B",
  },
  {
    question: "ใครจะหลับคนแรก",
    imgSrc: "Stuffs/img/zero.gif",
    choiceA: "นา",
    choiceB: "แชม",
    choiceC: "เจด",
    choiceD: "แบงค์",
    correct: "A",
  },
  {
    question: "เวตาลมาจากจังหวัดอะไร",
    imgSrc: "Stuffs/img/trick.gif",
    choiceA: "หนองคาย",
    choiceB: "นนทบุรี",
    choiceC: "สกลนคร",
    choiceD: "โคราช",
    correct: "C",
  },
];

// Extra variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 20; // 20s

let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  var music = new Audio();
  music.src = "Stuffs/music/Easy song.mp3";
  music.play();
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;

    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = -10;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
  var music = new Audio();
  music.src = "Stuffs/music/yeah.mp3";
  music.play();
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
  var music = new Audio();
  music.src = "Stuffs/music/Huh.mp3";
  music.play();
}

// score render
function scoreRender() {
  clearInterval(totalSeconds);
  scoreDiv.style.display = "block";

  var music = new Audio();
  music.src = "Stuffs/music/GameOver.mp3";
  music.play();
  localStorage.setItem("totalSeconds", totalSeconds);
  scoreDiv2.innerHTML = score;
  yourtime.innerHTML = minutesLabel + ":" + secondsLabel + "นาที";
  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "Stuffs/img/5.png"
      : scorePerCent >= 60
      ? "Stuffs/img/4.png"
      : scorePerCent >= 40
      ? "Stuffs/img/3.png"
      : scorePerCent >= 20
      ? "Stuffs/img/2.png"
      : "Stuffs/img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

  document.getElementById("highscore").style.display = "block";
  GoName();

  // เมื่อผู้เล่นเล่นเกมแล้วสำเร็จ ให้เรียกใช้ฟังก์ชัน gameCompleted
  gameCompleted();
}

//////////////////////////////////////////////////////
var myVar;

function myLoader() {
  myVar = setTimeout(showPage, 5000);
  myVar = setTimeout(GoName, 5000);

}

function showPage() {
  document.getElementById("loader").style.display = "none";
}

function GoName() {
  document.getElementById("container").style.display = "none";
  document.getElementById("name").style.display = "block";
}


function saveNameToLocalStorage() {
  const name = document.getElementById("nameInput").value;
  if (name) {
    document.getElementById("name").style.display = "none";
    document.getElementById("container").style.display = "block";
    localStorage.setItem("name", name);
    setInterval(setTime, 1000);
  } else {
    alert("กรุณาระบุชื่อ");
  }
}

var totalSeconds = 0;
var minutesLabel = 0;
var secondsLabel = null;
function setTime() {
  ++totalSeconds;
  secondsLabel = pad(totalSeconds % 60);
  minutesLabel = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

