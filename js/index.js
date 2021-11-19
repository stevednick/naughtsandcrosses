
var sections = document.querySelectorAll(".section");
var gamePos = 0;
var currentGame = {};
var gameWon = false;

document.querySelectorAll(".reset-button")[0].addEventListener("click", reset);

for (i = 0; i < sections.length; i++) {
  sections[i].addEventListener("click",
    function() {
      if (this.hasChildNodes() === false){
        var divToAppend = document.createElement('div');
        if (gamePos % 2 === 0){
          divToAppend.className = 'cross';
          currentGame[this.id] = 'cross';
        } else {
          divToAppend.className = 'naught';
          currentGame[this.id] = 'naught';
        }
        this.appendChild(divToAppend);
        gamePos += 1;
        checkForWin();
      }
    });
}

function checkForWin(){
  var gameStatus = [[currentGame['a'], currentGame['b'], currentGame['c']],
  [currentGame['d'], currentGame['e'], currentGame['f']],
  [currentGame['g'], currentGame['h'], currentGame['i']]];

  var arraysToCheck = [];

  const allEqual = arr => arr.every( v => v === arr[0] )
  for (i = 0; i < 3; i++){
    arraysToCheck.push([gameStatus[0][i], gameStatus[1][i], gameStatus[2][i]]);
    arraysToCheck.push([gameStatus[i][0], gameStatus[i][1], gameStatus[i][2]]);
  }
  arraysToCheck.push([gameStatus[0][0], gameStatus[1][1], gameStatus[2][2]]);
  arraysToCheck.push([gameStatus[2][0], gameStatus[1][1], gameStatus[0][2]]);

  for (i = 0; i < arraysToCheck.length; i++){
    if (allEqual(arraysToCheck[i])){
      if (arraysToCheck[i][0] =="cross" || arraysToCheck[i][0] =="naught"){
        winner(arraysToCheck[i][0]);
      }
    }
  }
}

function winner(player){
  if (player == "cross"){
    document.querySelectorAll("h1")[0].textContent = "Lightning Wins!";
    console.log("Won");
  } else {
    document.querySelectorAll("h1")[0].textContent = "Chick Wins!";
    console.log("Won");
  }
  gameWon = true;
}

function reset(){
  document.querySelectorAll("h1")[0].textContent = "";
  currentGame = {};
  gamePos = 0;
  gameWon = false;
  for (i = 0; i < sections.length; i++) {
    while (sections[i].firstChild) {
    sections[i].removeChild(sections[i].lastChild);
    }
  }
}
