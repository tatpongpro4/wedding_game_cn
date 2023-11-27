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
const game = document.getElementById("game");
// create questions
/* let questions = [
  {
    question: "บ่าว-สาวเป็นเพื่อนในFackbookตั้งแต่ปีอะไร",
    imgSrc: "Stuffs/img/dog.gif",
    choiceA: "2010",
    choiceB: "2011",
    choiceC: "2015",
    choiceD: "2018",
    correct: "B",
  },
  {
    question: "น้องชายกวางชื่ออะไร",
    imgSrc: "Stuffs/img/frog.gif",
    choiceA: "เป๋าตุง",
    choiceB: "นูนู่",
    choiceC: "ปิกาจู",
    choiceD: "ถ้วยฟู",
    correct: "A",
  },
  {
    question: "เจอกันครั้งแรกที่ไหน",
    imgSrc: "Stuffs/img/meeting.gif",
    choiceA: "โรงเรียน",
    choiceB: "มหาลัย",
    choiceC: "The moon bar",
    choiceD: "popo bar",
    correct: "D",
  },
  {
    question: "วันที่ขอแต่งงานบ่าวสาวใส่ชุดสีอะไร",
    imgSrc: "Stuffs/img/proposal.gif",
    choiceA: "ดำ",
    choiceB: "แดง",
    choiceC: "ขาว",
    choiceD: "ชมพู",
    correct: "A",
  },
  {
    question: "กวางกับเบ็คมีลูกชื่ออะไร",
    imgSrc: "Stuffs/img/baby.gif",
    choiceA: "มูมู่+มีมี่",
    choiceB: "ส้ม+ขาว",
    choiceC: "กะป๋อง+กะแป๋ง",
    choiceD: "ถ้วยฟู+ปลาทู",
    correct: "C",
  },
  {
    question: "เจ้าสาวไม่ให้แขกใส่สีอะไรมางาน!",
    imgSrc: "Stuffs/img/wedding.gif",
    choiceA: "สีขาว",
    choiceB: "สีเขียว",
    choiceC: "สีน้ำตาล",
    choiceD: "สีชมพู",
    correct: "A",
  },
  {
    question: "กวางเบ็คคบกันกี่ปี",
    imgSrc: "Stuffs/img/anniversary.gif",
    choiceA: "3ปี",
    choiceB: "5ปี",
    choiceC: "8ปี",
    choiceD: "15ปี",
    correct: "B",
  },
  {
    question: "เจ้าบ่าวทักเฟสบุ๊กไปหาเจ้าสาวเพราะอะไร",
    imgSrc: "Stuffs/img/facebook_chat.gif",
    choiceA: "หาคนหารค่าที่พัก",
    choiceB: "อยากจีบ",
    choiceC: "ยืมเงิน",
    choiceD: "ทักผิดคน",
    correct: "A",
  },
  {
    question: "กวางเบ็คชอบสัตว์อะไร",
    imgSrc: "Stuffs/img/animals.gif",
    choiceA: "หมา",
    choiceB: "แมว",
    choiceC: "หนู",
    choiceD: "ปลา",
    correct: "B",
  },
  {
    question: "ในวีดีโอพรีเซนต์ใครเป็นคนพากย์เสียง",
    imgSrc: "Stuffs/img/video_presentation.gif",
    choiceA: "เจ้าบ่าว",
    choiceB: "เจ้าสาว",
    choiceC: "เพื่อน",
    choiceD: "จ้างนักพากย์",
    correct: "A",
  }
] */


let questions = [
  {
    question: "question",
    imgSrc: "Stuffs/img/dog.gif",
    choiceA: "choiceA",
    choiceB: "choiceB",
    choiceC: "choiceC",
    choiceD: "choiceD",
    correct: "A",
  },
  {
    question: "อยากได้กี่ครั้งในคืนนี้ (ดอกไม้)",
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
  choiceA.innerHTML = "<div style='display: flex; align-items: center; justify-content: '>" +
  "<img class='icon_test' src='Stuffs/img/hatori.png' style='margin-right: 10px; width: 60px; height: 60px;'>" +
  "<span style='text-align: center; flex-grow: 1;'>" + q.choiceA + "</span>" +
  "</div>";
  choiceB.innerHTML = "<div style='display: flex; align-items: center; justify-content:'>" +
  "<img class='icon_test' src='Stuffs/img/pic.png' style='margin-right: 10px; width: 60px; height: 60px;'>" +
  "<span style='text-align: center; flex-grow: 1;'>" + q.choiceB + "</span>" +
  "</div>";
  choiceC.innerHTML = "<div style='display: flex; align-items: center; justify-content: '>" +
  "<img class='icon_test' src='Stuffs/img/oggy.png' style='margin-right: 10px; width: 60px; height: 60px;'>" +
  "<span style='text-align: center; flex-grow: 1;'>" + q.choiceC + "</span>" +
  "</div>";
  choiceD.innerHTML = "<div style='display: flex; align-items: center; justify-content: '>" +
  "<img class='icon_test' src='Stuffs/img/cat.png' style='margin-right: 10px; width: 60px; height: 60px;'>" +
  "<span style='text-align: center; flex-grow: 1;'>" + q.choiceD + "</span>" +
  "</div>";
}



// start quiz
function startQuiz() {
 /*  var music = new Audio();
  music.src = "Stuffs/music/Easy song.mp3";
  music.play(); */
  start.style.display = "none";
  renderQuestion();
 
  game.style.display = "block";
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
    /* answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    } */
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
  //music.src = "Stuffs/music/yeah.mp3";
  music.play();
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
  var music = new Audio();
  //music.src = "Stuffs/music/Huh.mp3";
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

}


var myVar;

function myLoader() {
  myVar = setTimeout(showPage);
  myVar = setTimeout(GoName);

}

function showPage() {

  document.getElementById("loader").style.display = "none";
}

function GoName() {
  document.getElementById("name").style.display = "block";
}


function saveNameToLocalStorage() {
  const name = document.getElementById("nameInput").value;
  if (name) {
    document.getElementById("name").style.display = "none";

    localStorage.setItem("name", name);
    startQuiz()
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





