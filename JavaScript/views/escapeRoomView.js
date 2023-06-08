//Tempo

const totalTime = 1200; //Tempo Total em Segundos do Escape Room
let totalChallenges = 3; //Quantidade de Desafios a Completar na Primeira Sala (Vai Mudar de Sala para Sala)
let timeLeft = totalTime;
const timer = document.getElementById("timer");
let timeLeftElement = document.createElement("p");

timeLeftElement.id = "timeLeft";
timeLeftElement.className = "speedy";
timeLeftElement.textContent = timeFormat(timeLeft);

timer.appendChild(timeLeftElement);

// Função para formatar o tempo no formato MM:SS
function timeFormat(timeSecs) {
  const minutes = Math.floor(timeSecs / 60);
  const timeSecsLeft = timeSecs % 60;
  return `${minutes.toString().padStart(2, "0")}:${timeSecsLeft
    .toString()
    .padStart(2, "0")}`;
}

//Desafios

let curChallengesComp = 0; //Variável que Guarda e Atualiza os Desafios Completados

const challengesCompleted = document.getElementById("challengesCompleted");

let challengesCompElement = document.createElement("p");

challengesCompElement.className = "speedy text-center";
challengesCompElement.textContent = `${curChallengesComp}/${totalChallenges}`;

challengesCompleted.appendChild(challengesCompElement);

//Barra de Progresso

// Largura da Barra de Progresso em Percentagem
const progress = 20;

// Calcular a posição do foguetão e da Janelinha com o Progresso

// const windowProgress= document.getElementById("windowProgress")
const progressBar = document.getElementById("progressBar");
const progressElement = document.getElementById("barFill");

progressElement.style.width = progress + "%";

// // Função para atualizar o timer
// function timerUpdate() {
//     const timer = document.getElementById("timer");
//     timer.textContent = timeFormat(timeLeft);
// }

// setInterval(() => {
//     timeLeft--;
//     timerUpdate();

//     if (timeLeft <= 0) {
//         // Tempo esgotado, mensagem de erro etc...
//     }
// }, 1000);

let currentRoom = 1;

// Escape Room
function showRoom(currentRoom) {
  const escapeRoomDiv = document.getElementById("escapeRoom");
  if (currentRoom == 1) {
    escapeRoomDiv.innerHTML =
      '<div id="escapeRoomBg">' +
      '<button id="rocketPosterButton">' +
      '<img id="rocketPoster" src="../images/interactions/room1/rocketPoster.svg">' +
      "</button>" +
      '<img id="monitorLeft" src="../images/interactions/room1/monitor.svg" alt="">' +
      '<button id="leftArrowMain">' +
      '<img src="../images/interactions/arrowLeft.svg">' +
      "</button>" +
      '<button id="rightArrowMain">' +
      '<img src="../images/interactions/arrowRight.svg">' +
      "</button>" +
      '<img id="warningMonitor" src="../images/interactions/room1/monitor.svg" alt="">' +
      '<img id="monitorRight" src="../images/interactions/room1/monitor.svg">' +
      '<div id="screenPasswordDiv">' +
      '<img id="screenPassword" src="../images/interactions/room1/screenPassword.svg">' +
      "</div>" +
      '<div id="inventoryBar"></div>' +
      "</div>";
  } else if (currentRoom == 0.5) {
    escapeRoomDiv.innerHTML =
      '<div id="escapeRoomBg">' +
      '  <button id="doorShip">' +
      '    <img src="../images/interactions/room1/doorShip/doorShipClosed.svg" alt="" />' +
      "  </button>" +
      '<button id="rightArrowMain">' +
      '<img src="../images/interactions/arrowRight.svg">' +
      "</button>" +
      '  <div id="lockerDiv">' +
      '    <button id="locker">' +
      '      <img src="../images/interactions/room1/locker/lockerLocked.svg" alt="" />' +
      "    </button>" +
      '    <button id="amongUs">' +
      '      <img src="../images/interactions/room1/amongUs.svg" alt="" />' +
      "    </button>" +
      "  </div>" +
      "</div>";
  }

  const rightArrowMain = document.getElementById("rightArrowMain");
  rightArrowMain.addEventListener("click", () => {
    currentRoom = moveRight(currentRoom);
    showRoom(currentRoom);
  });

  const leftArrowMain = document.getElementById("leftArrowMain");
  leftArrowMain.addEventListener("click", () => {
    currentRoom = moveLeft(currentRoom);
    showRoom(currentRoom);
  });
}

function moveLeft(currentRoom) {
  previousRoom = currentRoom;
  currentRoom -= 0.5;
  return currentRoom;
}

function moveRight(currentRoom) {
  previousRoom = currentRoom;
  currentRoom += 0.5;
  return currentRoom;
}

// if (Number.isInteger(currentRoom)) {
//   escapeRoomDiv.className= "d-flex mainRoom"
// }else if(previousRoom > currentRoom){
//   escapeRoomDiv.className= "leftRoom"
// }else if(previousRoom < currentRoom){
//   escapeRoomDiv.className= "rightRoom"
// }

showRoom(currentRoom);
