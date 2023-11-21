// score.js

document.addEventListener('DOMContentLoaded', function() {
    // ดึงข้อมูลผู้เล่นจาก local storage
    var playersData = JSON.parse(localStorage.getItem('playersData')) || [];

    // เรียงลำดับคะแนนจากสูงไปต่ำ
    playersData.sort(function(a, b) {
        return b.score - a.score;
    });

    // แสดงคะแนนบนตารางคะแนน
    var scoreTable = document.getElementById('scoreTable');
    for (var i = 0; i < Math.min(10, playersData.length); i++) {
        var player = playersData[i];
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + (i + 1) + '</td><td>' + player.name + '</td><td>' + player.score + '</td><td>' + player.time + '</td>';
        scoreTable.appendChild(row);
    }
});
