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
      <div class="firstRoomBg">
        <button id="leftArrowMain">
          <img src="../images/interactions/arrowLeft.svg">
        </button>
        <button id="rocketPosterButton">
          <img id="rocketPoster" src="../images/interactions/room1/rocketPoster.svg">
        </button>
        <button id="leftMonitorInteraction" data-bs-toggle="modal"
        data-bs-target="#zoomMonitorLeftModal">
          <img id="monitorLeft" src="../images/interactions/room1/monitorLeft.png">
        </button>
        <img id="warningMonitor" src="../images/interactions/room1/warningMonitor.png">
        <button id="rightMonitorInteraction" data-bs-toggle="modal"
        data-bs-target="#zoomMonitorRightModal">
          <img id="monitorRight" src="../images/interactions/room1/monitorRight.png">
        </button>  
        <div class="d-flex align-items-center justify-content-center image-container" id="screenPasswordDiv">
          <img  id="screenPassword" src="../images/interactions/room1/screenPassword.png">
          </div>
          <div>
            <input type="text" style="background: none; border: none; color: black;" class="speedy" placeholder="Insert 4 Digit Code Here: ">
          </div>
          <button id="screenPasswordSubmit">Submit</button>
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
      <div class="firstRoomBg d-flex">
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
      <div id="lockerDiv">
        <button id="locker">
          <img id="lockerEdit" src="../images/interactions/room1/locker/lockerLocked.png">
        </button>
        <button id="amongUs">
          <img src="../images/interactions/room1/amongUs.svg">
        </button>
      </div>
        <button id="doorShip">
          <img id="doorShipEdit" src="../images/interactions/room1/doorShip/doorShip.png">
        </button>
        <button id="rightArrowMain">
          <img src="../images/interactions/arrowRight.svg">
        </button>
      </div>
      </div>
      
      `;
  } else if (currentRoom === 1.5) {
    escapeRoomDiv.innerHTML =
      `
      <div id="solarSystemRoomBg">
        <div class="d-flex flex-row justify-content-center align-content-center">
          <button id="leftArrowMain">
            <img src="../images/interactions/arrowLeft.svg">
          </button>
            <div id="solarSystemPuzzleBg" class="d-flex">
              <div id="position1">
              </div>
              <div id="position2">
              </div>
              <div id="position3">
              </div>
              <div id="position4">
              </div>
              <div id="position5">
              </div>
              <div id="position6">
              </div>
              <div id="position7">
              </div>
              <div id="position8">
              </div>
          </div>
          <button class="btn"  id="btnSubmitSolarSystemPuzzle">Submit</button>
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
          `;
    //Verifies if the Inputs are Correct

    const btnSubmit = document.getElementById('btnSubmitSolarSystemPuzzle');
    btnSubmit.addEventListener('click', verifySolarSystemPuzzle);

    //Creation of the Planets with the Respective Images and Text Inputs

    const divs = [
      document.getElementById('position1'),
      document.getElementById('position2'),
      document.getElementById('position3'),
      document.getElementById('position4'),
      document.getElementById('position5'),
      document.getElementById('position6'),
      document.getElementById('position7'),
      document.getElementById('position8')
    ];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledDivs = shuffleArray(divs);

    //Mercury Creation

    // const firstDiv = document.getElementById('position1')
    let mercuryInput = document.createElement("input");

    mercuryInputCorrectAnswer = 1;
    mercuryInput.type = "text";
    mercuryInput.id = "mercuryInput"
    mercuryInput.placeholder = "#";
    mercuryInput.style = "width: 40px"

    let mercuryImg = document.createElement("img");
    mercuryImg.src = "../images/interactions/room1/Solar System Puzzle/Mercury.png"

    shuffledDivs[0].append(mercuryImg);
    shuffledDivs[0].append(mercuryInput)


    //Venus Creation

    // const secondDiv = document.getElementById('position2')
    let venusInput = document.createElement("input");

    venusInputCorrectAnswer = 2;
    venusInput.type = "text";
    venusInput.id = "venusInput"
    venusInput.placeholder = "#";
    venusInput.style = "width: 40px"

    let venusImg = document.createElement("img");
    venusImg.src = "../images/interactions/room1/Solar System Puzzle/Venus.png"

    shuffledDivs[1].append(venusImg);
    shuffledDivs[1].append(venusInput)

    //Earth Creation

    // const thirdDiv = document.getElementById('position3')
    let earthInput = document.createElement("input");

    earthInputCorrectAnswer = 3;
    earthInput.type = "text";
    earthInput.id = "earthInput"
    earthInput.placeholder = "#";
    earthInput.style = "width: 40px"

    let earthImg = document.createElement("img");
    earthImg.src = "../images/interactions/room1/Solar System Puzzle/Earth.png"

    shuffledDivs[2].append(earthImg);
    shuffledDivs[2].append(earthInput)

    //Mars Creation

    // const fourthDiv = document.getElementById('position4')
    let marsInput = document.createElement("input");

    marsInputCorrectAnswer = 4;
    marsInput.type = "text";
    marsInput.id = "marsInput"
    marsInput.placeholder = "#";
    marsInput.style = "width: 40px"

    let marsImg = document.createElement("img");
    marsImg.src = "../images/interactions/room1/Solar System Puzzle/Mars.png"

    shuffledDivs[3].append(marsImg);
    shuffledDivs[3].append(marsInput)

    //Jupiter Creation


    // const fifthDiv = document.getElementById('position5')
    let jupiterInput = document.createElement("input");

    jupiterInputCorrectAnswer = 5;
    jupiterInput.type = "text";
    jupiterInput.id = "jupiterInput"
    jupiterInput.placeholder = "#";
    jupiterInput.style = "width: 40px"

    let jupiterImg = document.createElement("img");
    jupiterImg.src = "../images/interactions/room1/Solar System Puzzle/Jupiter.png"

    shuffledDivs[4].append(jupiterImg);
    shuffledDivs[4].append(jupiterInput)

    //Saturn Creation

    // const sixthDiv = document.getElementById('position6')
    let saturnInput = document.createElement("input");

    saturnInputCorrectAnswer = 6;
    saturnInput.type = "text";
    saturnInput.id = "saturnInput"
    saturnInput.placeholder = "#";
    saturnInput.style = "width: 40px"

    let saturnImg = document.createElement("img");
    saturnImg.src = "../images/interactions/room1/Solar System Puzzle/Saturn.png"

    shuffledDivs[5].append(saturnImg);
    shuffledDivs[5].append(saturnInput)

    //Uranus Creation

    // const seventhDiv = document.getElementById('position7')
    let uranusInput = document.createElement("input");

    uranusInput.type = "text";
    uranusInput.id = "uranusInput"
    uranusInput.placeholder = "#";
    uranusInput.style = "width: 40px"
    uranusInputCorrectAnswer = 7;

    let uranusImg = document.createElement("img");
    uranusImg.src = "../images/interactions/room1/Solar System Puzzle/Uranus.png"

    shuffledDivs[6].append(uranusImg);
    shuffledDivs[6].append(uranusInput)

    //Neptune Creation

    // const eighthDiv = document.getElementById('position8')
    let neptuneInput = document.createElement("input");

    neptuneInputCorrectAnswer = 8;
    neptuneInput.type = "text";
    neptuneInput.id = "neptuneInput"
    neptuneInput.placeholder = "#";
    neptuneInput.style = "width: 40px"

    let neptuneImg = document.createElement("img");
    neptuneImg.src = "../images/interactions/room1/Solar System Puzzle/Neptune.png"

    shuffledDivs[7].append(neptuneImg);
    shuffledDivs[7].append(neptuneInput)
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

function verifySolarSystemPuzzle() {
  // Array com as ordens corretas dos planetas
  const correctOrder = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  // Variável para controlar se todas as respostas estão corretas
  let allCorrect = true;

  // Percorra os inputs dos planetas
  for (let i = 0; i < correctOrder.length; i++) {
    const inputId = `${planets[i]}Input`; // Supondo que você tenha um array chamado 'planetas' com os nomes dos planetas
    const inputValue = document.getElementById(inputId).value;

    // Verifique se o valor inserido é diferente da ordem correta
    if (inputValue !== correctOrder[i]) {
      allCorrect = false; // Pelo menos uma resposta está incorreta
      break; // Pode parar o loop, já que encontrou uma resposta incorreta
    }
  }

  // Verifique o resultado da verificação
  if (allCorrect) {
    alert("Correct");
    // Todas as respostas estão corretas
    // Faça algo, como exibir uma mensagem de sucesso ou redirecionar para outra página
  } else {
    // Pelo menos uma resposta está incorreta
    // Faça algo, como exibir uma mensagem de erro ou destacar as respostas incorretas
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

// Function that shuffles the images
// function shuffleImages(images) {
//   for (let i = images.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [images[i], images[j]] = [images[j], images[i]];
//   }
//   return images;
// }

// Gets the div that contains the images
// const planetsPuzzleDiv = document.getElementById('planetsPuzzle');

// Gets all the images in the div
// const images = Array.from(planetsPuzzleDiv.getElementsByTagName('img'));

// Shuffles the Images and Stores the Array in shuffledImages
// const shuffledImages = shuffleImages(images);

// Removes the Images From the Div
// images.forEach((image) => {
//   planetsPuzzleDiv.removeChild(image);
// });

// Adds the shuffled images to the Div in the new order
// shuffledImages.forEach((image) => {
//   planetsPuzzleDiv.appendChild(image);
// });

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

    //Adds and Event Listener to the Button to Enable Interactions with It

    const nextChallengeButton = document.getElementById("rightArrowChallengeMonitor");
    nextChallengeButton.disabled = true;
    if (nextChallengeButton) {
      nextChallengeButton.removeEventListener("click", handleNextChallengeButton);
      nextChallengeButton.addEventListener("click", handleNextChallengeButton);
    }
  } else if (currentChallenge === 2) {
    monitorChallenge.innerHTML = `
    <button id="leftArrowChallengeMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>`;

    const previousChallengeButton = document.getElementById("leftArrowChallengeMonitor");

    if (previousChallengeButton) {
      previousChallengeButton.removeEventListener("click", handlePreviousChallengeButton);
      previousChallengeButton.addEventListener("click", handlePreviousChallengeButton);
    }

  }

  // Obtém todos os elementos <td> com a classe "trueOrFalse"
  var cells = document.getElementsByClassName("trueOrFalse");

  // Percorre todos os elementos <td> e adiciona um ouvinte de evento de clique a cada um
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
      // Percorre todas as células da mesma linha
      var rowCells = this.parentNode.children;
      for (var j = 1; j < rowCells.length; j++) {
        // Remove o "X" das células da mesma linha
        rowCells[j].innerText = "";
      }

      // Define o conteúdo de texto da célula atual como "X"
      this.innerText = "X";

      // Verifica as respostas do usuário e desbloqueia o botão de avançar para a direita
      checkAnswers();
    });
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

rightMonitorInteraction.addEventListener("click", function () {
  showChallengeMonitor(currentChallengeMonitor);
});

//Changes the Displayed Challenge to the Next One

function nextChallenge(currentChallenge) {
  currentChallenge += 1;
  return currentChallenge;
}

function previousChallenge(currentChallenge) {
  currentChallenge -= 1;
  return currentChallenge;
}

function handleNextChallengeButton() {
  currentChallengeMonitor = nextChallenge(currentChallengeMonitor);
  showChallengeMonitor(currentChallengeMonitor);
}

function handlePreviousChallengeButton() {
  currentChallengeMonitor = previousChallenge(currentChallengeMonitor);
  showChallengeMonitor(currentChallengeMonitor);
}

//Checks if the User has Gotten the Answers Right

function checkAnswers() {
  var table = document.getElementById("trueOrFalseTable");
  var rows = table.getElementsByTagName("tr");
  var correctAnswers = ["False", "False", "True"];
  var userAnswers = [];

  // Percorre cada linha da tabela, começando da segunda linha (índice 1)
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var answer = "";

    // Verifica em qual célula a resposta do usuário está (Verdadeiro ou Falso)
    if (cells[1].innerText === "X") {
      answer = "True";
    } else if (cells[2].innerText === "X") {
      answer = "False";
    }

    userAnswers.push(answer);
  }

  // Verifica se as respostas do usuário estão corretas
  var isCorrect = true;
  for (var i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i] !== userAnswers[i]) {
      isCorrect = false;
      break;
    }
  }

  // Desbloqueia o botão de avançar para a direita se as respostas estiverem corretas
  var rightArrowButton = document.getElementById("rightArrowChallengeMonitor");
  if (isCorrect) {
    rightArrowButton.disabled = false;
  } else {
    rightArrowButton.disabled = true;
  }
}