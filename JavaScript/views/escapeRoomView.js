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

// Function to Show The Rooms
function showRoom(currentRoom) {
  const escapeRoomDiv = document.getElementById("escapeRoom");

  if (currentRoom === 1) {
    escapeRoomDiv.innerHTML =
      `
      <div id="escapeRoomBg">
        <button id="leftArrowMain">
          <img src="../images/interactions/arrowLeft.svg">
        </button>
        <button id="rocketPosterButton">
          <img id="rocketPoster" src="../images/interactions/room1/rocketPoster.svg">
        </button>
        <button id="leftMonitorInteraction" data-bs-toggle="modal"
        data-bs-target="#zoomMonitorLeftModal">
          <img id="monitorLeft" src="../images/interactions/monitor.svg">
        </button>
        <img id="warningMonitor" src="../images/interactions/room1/monitorWarning.svg">
        <button id="rightMonitorInteraction" data-bs-toggle="modal"
        data-bs-target="#zoomMonitorRightModal">
          <img id="monitorRight" src="../images/interactions/monitor.svg">
        </button>  
        <div class="d-flex align-items-center justify-content-center" id="screenPasswordDiv">
          <span id="screenPassword">
            <input type="text" style="background: none; border: none; color: black;" class="speedy" placeholder="Insert 4 Digit Code Here: ">
          </span>
          <button id="screenPasswordSubmit">Submit</button>
        </div>
        <button id="rightArrowMain">
          <img src="../images/interactions/arrowRight.svg">
        </button>
        <div id='inventoryBar'>
          <table id="inventoryBarTable">
            <tr style='background-color: #3B3B3B;'>
              <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
              <td id='slot1'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot2'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot3'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot4'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='invBarRightArrow'><img src='../images/interactions/Inventory Bar/invBarRightArrow.svg'></td> 
            </tr> 
          </table> 
        </div>
        <div class="modal" id="zoomMonitorLeftModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title guardians">Challenges</h4>  
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div id="monitorChallenges"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="zoomMonitorRightModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Learn About Space!</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
  } else if (currentRoom === 0.5) {
    escapeRoomDiv.innerHTML =
      `
      <div id="escapeRoomBg">
        <button id="doorShip">
          <img src="../images/interactions/room1/doorShip/doorShipClosed.svg" alt="">
        </button>
        <button id="rightArrowMain">
          <img src="../images/interactions/arrowRight.svg">
        </button>
        <div id="lockerDiv">
          <button id="locker">
            <img src="../images/interactions/room1/locker/lockerLocked.svg" alt="">
          </button>
          <button id="amongUs">
            <img src="../images/interactions/room1/amongUs.svg" alt="">
          </button>
        </div>
        <div id='inventoryBar'>
          <table>
            <tr style='background-color: #3B3B3B;'>
              <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
              <td id='slot1'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot2'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot3'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot4'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='invBarRightArrow'><img src='../images/interactions/Inventory Bar/invBarRightArrow.svg'></td> 
            </tr> 
          </table> 
        </div>
      </div>
      </div>
      
      `;
  } else if (currentRoom === 1.5) {
    escapeRoomDiv.innerHTML =
      `
      <div id="escapeRoomBg">
        <button id="leftArrowMain">
          <img src="../images/interactions/arrowLeft.svg">
        </button>
        <div>
          <img id="solarSystemPuzzle" src="../images/interactions/room1/solarSystemGame.jpg" alt="">
        </div>
        <div id='inventoryBar'>
          <table>
            <tr style='background-color: #3B3B3B;'>
              <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
              <td id='slot1'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot2'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot3'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='slot4'><img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'></td> 
              <td id='invBarRightArrow'><img src='../images/interactions/Inventory Bar/invBarRightArrow.svg'></td> 
            </tr> 
          </table> 
        </div>
      </div>
      </div>
      `;
  }

  const rightArrowMain = document.getElementById("rightArrowMain");
  if (rightArrowMain) {
    rightArrowMain.removeEventListener("click", handleRightArrowClick);
    rightArrowMain.addEventListener("click", handleRightArrowClick);
  }

  const leftArrowMain = document.getElementById("leftArrowMain");
  if (leftArrowMain) {
    leftArrowMain.removeEventListener("click", handleLeftArrowClick);
    leftArrowMain.addEventListener("click", handleLeftArrowClick);
  }
}

function handleLeftArrowClick() {
  currentRoom = moveLeft(currentRoom);
  showRoom(currentRoom);
}

function handleRightArrowClick() {
  currentRoom = moveRight(currentRoom);
  showRoom(currentRoom);
}

function moveLeft(currentRoom) {
  const previousRoom = currentRoom;
  currentRoom -= 0.5;
  return currentRoom;
}

function moveRight(currentRoom) {
  const previousRoom = currentRoom;
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

function showChallengeMonitor(currentChallenge) {
  const monitorChallenge = document.getElementById("monitorChallenges");
  if (currentChallenge === 1) {
    monitorChallenge.innerHTML =
      `<table class="table table-bordered speedy" id="trueOrFalseTable">
        <tr>
          <td>Questions</td>
          <td>True</td>
          <td>False</td>
        </tr>
        <tr>
          <td>During a Trip to Space, Every Part of the Rocket Ship Remains Intact.</td>
          <td class="trueOrFalse"></td>
          <td class="trueOrFalse"></td>
        </tr>
        <tr>
          <td>The First Person to Travel to Space was Neil Armstrong</td>
          <td class="trueOrFalse"></td>
          <td class="trueOrFalse"></td>
        </tr>
        <tr>
          <td>Saturn Isn't the Only Planet With Rings in The Solar System</td>
          <td class="trueOrFalse"></td>
          <td class="trueOrFalse"></td>
        </tr>
      </table>
      <button id="rightArrowChallengeMonitor">
        <img src="../images/interactions/arrowRight.svg">
      </button>`;
  } else if (currentChallenge === 2) {
    monitorChallenge.innerHTML = '';
  }
}

let currentChallengeMonitor = 1;
showRoom(currentRoom);

// Event listener para abrir a modal do monitorChallenge
const leftMonitorInteraction = document.getElementById("leftMonitorInteraction");

leftMonitorInteraction.addEventListener("click", function () {
  showChallengeMonitor(currentChallengeMonitor);
});

const rightMonitorInteraction = document.getElementById("rightMonitorInteraction");
if (rightMonitorInteraction) {
  rightMonitorInteraction.addEventListener("click", function () {
    // código para exibir a modal do monitorChallenge da direita
  });
}

// Event listener para o botão dentro do modal
const nextChallengeButton = document.getElementById("rightArrowChallengeMonitor");
if (nextChallengeButton) {
  nextChallengeButton.removeEventListener("click", handleNextChallengeButton);
  nextChallengeButton.addEventListener("click", handleRightArrowClick);
}

function handleNextChallengeButton() {
  currentChallengeMonitor = nextChallenge(currentChallengeMonitor);
  showChallengeMonitor(currentChallengeMonitor);
}

function nextChallenge(currentChallenge) {
  currentChallenge += 1;
  return currentChallenge;
}
