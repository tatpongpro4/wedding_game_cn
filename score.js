document.addEventListener("DOMContentLoaded", function () {
  var playersData = [];

  var database = firebase.database();
  var ref = database.ref("test");

  ref.on("value", (snapshot) => {
    playersData = []; // Clear the previous data
    snapshot.forEach((childSnapshot) => {
      var player = childSnapshot.val();
      playersData.push({
        name: player.name,
        score: player.score,
        time: player.time,
      });
    });

    playersData.sort(function (a, b) {
      if (b.score === a.score) {
        return timeToMinutes(a.time) - timeToMinutes(b.time);
      }
      return b.score - a.score;
    });
  
    updateScoreTable(playersData);
    findmyRank(localStorage.getItem("name") , playersData)
  });
});

function findmyRank(name , playersData){
    var myRank  = playersData.findIndex(item => item.name === name) + 1; 
    var myScore  = playersData.find(item => item.name === name); 

    var rankDiv = document.getElementById("myRank");
    var scoreDiv = document.getElementById("myscore");
    var nameDiv = document.getElementById("myName");
    if (myRank > 0) {
        nameDiv.innerHTML = "ชื่อของคุณคือ: " + myScore.name;
      rankDiv.innerHTML = "อันดับของคุณอยู่ที่: " + myRank;
      scoreDiv.innerHTML = "คุณทำคะแนนได้: " + myScore.score + " คะแนน"
    } else {
      rankDiv.innerHTML = "ชื่อของคุณไม่พบในอันดับ";
    }
}

function updateScoreTable(playersData) {
  var scoreTable = document.getElementById("scoreTable");
  scoreTable.innerHTML = ""; // ล้างตารางเก่า

  for (var i = 0; i < Math.min(10, playersData.length); i++) {
    var player = playersData[i];
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" +
      (i + 1) +
      "</td><td>" +
      player.name +
      "</td><td>" +
      player.score +
      "</td><td>" +
      player.time +
      "</td>";
    scoreTable.appendChild(row);
  }
}

function timeToMinutes(time) {
  var parts = time.split(":");
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}
