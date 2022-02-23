const Buttons = document.getElementsByClassName("chooseBox");
let players = [];
//#region dice
var cube = document.getElementById("cube");

var min = 1;
var max = 24;

cube.onclick = function () {
  var xRand = getRandom(max, min);
  var yRand = getRandom(max, min);

  cube.style.webkitTransform =
    "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
  cube.style.transform = "rotateX(" + xRand + "deg) rotateY(" + yRand + "deg)";
};

function getRandom(max, min) {
  return (Math.floor(Math.random() * (max - min)) + min) * 90;
}
//#endregion
function btn0() {
  if (players.includes("1")) {
    document.getElementById(Buttons[0].id).style.backgroundColor = "white";
    players.splice(players.indexOf("1"), 1);
  } else {
    document.getElementById(Buttons[0].id).style.backgroundColor = "skyblue";
    players.push("1");
  }
}

function btn1() {
  if (players.includes("2")) {
    document.getElementById(Buttons[1].id).style.backgroundColor = "white";
    players.splice(players.indexOf("2"), 1);
  } else {
    document.getElementById(Buttons[1].id).style.backgroundColor = "skyblue";
    players.push("2");
  }
}

function btn2() {
  if (players.includes("3")) {
    document.getElementById(Buttons[2].id).style.backgroundColor = "white";
    players.splice(players.indexOf("3"), 1);
  } else {
    document.getElementById(Buttons[2].id).style.backgroundColor = "skyblue";
    players.push("3");
  }
}

function btn3() {
  if (players.includes("4")) {
    document.getElementById(Buttons[3].id).style.backgroundColor = "white";
    players.splice(players.indexOf("4"), 1);
  } else {
    document.getElementById(Buttons[3].id).style.backgroundColor = "skyblue";
    players.push("4");
  }
}
function btn4() {
  if (players.includes("5")) {
    document.getElementById(Buttons[4].id).style.backgroundColor = "white";
    players.splice(players.indexOf("5"), 1);
  } else {
    document.getElementById(Buttons[4].id).style.backgroundColor = "skyblue";
    players.push("5");
  }
}
function btn5() {
  if (players.includes("6")) {
    document.getElementById(Buttons[5].id).style.backgroundColor = "white";
    players.splice(players.indexOf("6"), 1);
  } else {
    document.getElementById(Buttons[5].id).style.backgroundColor = "skyblue";
    players.push("6");
  }
}
function btn6() {
  if (players.includes("7")) {
    document.getElementById(Buttons[6].id).style.backgroundColor = "white";
    players.splice(players.indexOf("7"), 1);
  } else {
    document.getElementById(Buttons[6].id).style.backgroundColor = "skyblue";
    players.push("7");
  }
}
function btnPlayer() {
  if (players.includes("0")) {
    document.getElementById(Buttons[7].id).style.backgroundColor = "white";
    players.splice(players.indexOf("0"), 1);
    document.getElementById("playConfigs").style.display = "none";
  } else {
    document.getElementById(Buttons[7].id).style.backgroundColor = "skyblue";
    players.push("0");
    document.getElementById("playConfigs").style.display = "flex";
  }
}

function start() {
  let sPlayers = "";
  players.forEach((value) => (sPlayers += value));
  rounds = parseInt(document.getElementById("rounds").value);
  score = parseInt(document.getElementById("score").value);
  turn = parseInt(document.getElementById("turn").value);
  document.getElementById("mainConfigs").style.display = "none";
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("dice").style.display = "block";

  document.getElementById("playConfigs").style.display === "none"
    ? fetch("http://127.0.0.1:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: sPlayers,
          rounds: rounds,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((jResponse) => handleResult(jResponse))
        .catch((e) => {
          alert("sorry, an error occurred\n", e);
          reset();
        })
    : fetch("http://127.0.0.1:8000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: sPlayers,
          rounds: rounds,
          score: score,
          turn: turn,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((jResponse) => handleResult(jResponse))
        .catch((e) => {
          alert("sorry, an error occurred\n", e);
          reset();
        });
  setTimeout(() => {
    document.getElementById("result").style.display = "block";
    document.getElementById("dice").style.display = "none";
  }, 2400);
}
function handleResult(response) {
  if (response.error === 0) {
    for (var i = 0; i <= 7; i++) {
      if (response[`${i}`]) {
        document.getElementById(`r${i}`).style.display = "flex";
        document.getElementById(`r${i}Score`).innerHTML = response[`${i}`];
      }
    }
  } else {
    alert("sorry, an error occurred");
    reset();
  }
}
function reset() {
  document.getElementById("result").style.display = "none";
  document.getElementById("mainConfigs").style.display = "flex";
  document.getElementById("startBtn").style.display = "block";
  document.getElementById("dice").style.display = "none";
  for (var i = 0; i <= 7; i++) {
    document.getElementById(`r${i}`).style.display = "none";
    document.getElementById(`r${i}Score`).innerHTML = "0";
  }
}
