import * as User from "../modules/userModule.js";

//Variable for the First 4 Digit Code you Get After Completing the First Puzzle

let firstPuzzleCode;

//Variable for the First Half of the 8 Digit Code for the First Room

let firstHalfCode;

//Variable for the Second Half of the Final 8 Digit Code for the First Room

let secondHalfCode;

//Variable that Stores the Current Room you are at, Initialized at 1, which is the center room

let currentRoom = 1;

// Variable that Stores the Current Info Text you are at

let currentTextInfo = 1;

//Variable that Stores the 8 Digit Code

let final8DigitCode

//Stores the User's Answers for the First Puzzle (True or False)

let userAnswers = [];

//Variable for the Status of The Input of the Correct First 4 digit code

let firstCodeStatus = false;

//Variable for the Random Order of the Planets on the Second Puzzle

let shuffledDivs;

//Variable for Storing if the User has Been in the Solar System Puzzle Room

let rightArrowClicked = false;

// Variable That Stores the User's Time if the User Completes the Escape Room On Time

let completionTime

// Variable That Stores the First Half Text

let firstHalfText

// Variable That Stores the Second Half Text

let secondHalfText

// Variable That Stores the Last Codes Insertion Status

let lastCodesDone = false;

//Variables for the Content of the Inventory Slots

let inventorySlot1 = "<img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'>";
let inventorySlot2 = "<img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'>";
let inventorySlot3 = "<img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'>";
let inventorySlot4 = "<img src='../images/interactions/Inventory Bar/rectangleInvBar.svg'>";

//Variables for the Different Educational Content in the Right Monitor Modal

let firstMessage = "When the boosters of a rocket run out of fuel, they are detached from the rest of the rocket (usually with some kind of small explosive charge or explosive bolts) and fall away."

let secondMessage = "Yuri Gagarin from the Soviet Union was the first human in space. His vehicle, Vostok 1 circled Earth at a speed of 27,400 kilometers per hour with the flight lasting 108 minutes."

let thirdMessage = "Saturn is a funny-looking planet. True, but it's not the only planet with rings. Jupiter, Uranus and Neptune have rings too."

let fourthMessage = "There are 8 Planets in the Solar System, Which are Mercury, Venus, Earth, Mars, Which Constitute the Group of Planets Known as Terrestrial, and Then There are Jupiter, Saturn, Uranus, Neptune"

let fifthMessage = "Gravity is the Force That Pulls us to the Surface of the Earth, Keeps the Planets in Orbit Around the Sun and Causes the Formation of Planets, Stars and Galaxies."

let sixthMessage = "The Sun is the Only Star in our Solar System. It is the Center of our Solar System, and its Gravity Holds the Solar System Together. Everything in our Solar System Revolves Around it, the Planets, Asteroids, Comets, and Tiny Bits of Space Debris."

let seventhMessage = "The Milky Way is a huge collection of stars, dust and gas. It's called a spiral galaxy because if you could view it from the top or bottom, it would look like a spinning pinwheel. The Sun is located on one of the spiral arms, about 25,000 light-years away from the center of the galaxy."

// Starts the Timer

const intervalId = setInterval(updateTimer, 1000);

//Sucess Sound Const

const sucessSound = new Audio("../sounds/sucessSound.mp3")

//Fail Sound Const

const failSound = new Audio("../sounds/failSound.mp3")

//Key Locker Unlock Sound Const

const keyUnlock = new Audio("../sounds/keyUnlock.mp3")

// Door Opening Const

const doorOpening = new Audio("../sounds/doorOpening.mp3")

//Adds an Event Listener to the Loading of the Page, to Show the Introduction Modal

$(document).ready(function () {
  $('#introModal').modal('show');
});

//Defines the Variable That Contains the "p" Element Inside the Alert Modals

let alertModaltxtContainer = document.getElementById('alertModalText')

//Challenges

const totalTime = 600; // Total Time in Seconds for the Escape Room
let totalChallenges = 3; // Amount of Challenges that You Have to Complete in the First Room (varies from room to room)
let timeLeft = totalTime;
const timer = document.getElementById("timer");
let timeLeftElement = document.createElement("p");

timeLeftElement.id = "timeLeft";
timeLeftElement.className = "speedy";
timeLeftElement.textContent = timeFormat(timeLeft);

timer.appendChild(timeLeftElement);

// Function that Formats the Time in the Format MM:SS

function timeFormat(timeSecs) {
  const minutes = Math.floor(timeSecs / 60);
  const timeSecsLeft = timeSecs % 60;
  return `${minutes.toString().padStart(2, "0")}:${timeSecsLeft.toString().padStart(2, "0")}`;
}

function convertSecondsToMMSS(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secondsLeft = seconds % 60;

  // Adds a 0 to the Left if the Number of Minutes or Seconds is Less than 10
  var minFormat = minutes < 10 ? "0" + minutes : minutes;
  var secFormat = secondsLeft < 10 ? "0" + secondsLeft : secondsLeft;

  return minFormat + ":" + secFormat;
}


// Function to Update the Timer Each Second
function updateTimer() {
  timeLeft--;
  timeLeftElement.textContent = timeFormat(timeLeft);

  if (timeLeft <= 0) {
    clearInterval(intervalId); // Stops Executing the setInterval When the Time is Over

    // Configures the Event to Capture when the Modal is Closed
    $('#alertModal').on('hidden.bs.modal', function () {
      // Redirects to the HomePage
      window.location.href = '../HTML/homePage.html';
    });

    alertModaltxtContainer.textContent = "Your Time is Up!!! We Hope You Enjoyed your Experience!"
    $('#alertModal').modal('show');
  }
}

// Pauses the Timer and Stores the Current Time Left
function pauseTimer() {
  clearInterval(intervalId);
  completionTime = timeLeft; // Stores the Current Time Left in the Variable completionTime
}

let curChallengesComp = 0; //Variable that Stores and Updates the Current Completed Challenges

const challengesCompleted = document.getElementById("challengesCompleted");

let challengesCompElement = document.createElement("p");

challengesCompElement.className = "speedy text-center";
challengesCompElement.textContent = `${curChallengesComp}/${totalChallenges}`;

challengesCompleted.appendChild(challengesCompElement);

//Progress Bar

// Progress Bar Width in %

let progress = 0;

function updateProgressBar() {
  const progressElement = document.getElementById("barFill");
  progressElement.style.width = progress + "%";

  challengesCompElement.textContent = `${curChallengesComp}/${totalChallenges}`;
}

// Function to Show The Rooms

function showRoom(currentRoom) {
  const escapeRoomDiv = document.getElementById("escapeRoom");

  if (currentRoom === 1) {
    escapeRoomDiv.innerHTML =
      `
      <div class="firstRoomBg d-flex justify-content-end">
        <button id="leftArrowMain">
          <img src="../images/interactions/arrowLeft.svg">
        </button>

        <div id="monitorsAlign" class="">
          <div id="topMonitors" class="d-flex">
            <button id="leftMonitorInteraction" data-bs-toggle="modal"
            data-bs-target="#zoomMonitorLeftModal">
              <img id="monitorLeft" src="../images/interactions/room1/monitorLeft.png">
            </button>
            <img id="warningMonitor" src="../images/interactions/room1/warningMonitorSign.png">
            <button id="rightMonitorInteraction" data-bs-toggle="modal"
            data-bs-target="#zoomMonitorRightModal">
              <img id="monitorRight" src="../images/interactions/room1/monitorRight.png">
            </button>
          </div>  
          <div class="d-flex align-items-center justify-content-center image-container" id="screenPasswordDiv">
            <img  id="screenPassword" src="../images/interactions/room1/screenPassword.png">
          </div>
          <div class="d-flex flex-column flex-wrap align-content-center">
            <input id="input4DigitCode" type="text" class="speedy text-center" placeholder="Insert Code Here: ">
            <button class="btn speedy" id="screenPasswordSubmit">Submit</button>
          </div>
        </div>

        <button id="rightArrowMain">
          <img src="../images/interactions/arrowRight.svg">
        </button>
        <div id='inventoryBar'>
          <table id="inventoryBarTable">
            <tr style='background-color: #3B3B3B;'>
              <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
              <td id='slot1'>${inventorySlot1}</td> 
              <td id='slot2'>${inventorySlot2}</td> 
              <td id='slot3'>${inventorySlot3}</td> 
              <td id='slot4'>${inventorySlot4}</td> 
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
                <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal" id="zoomMonitorRightModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title guardians">Learn About Space!</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div id="monitorInfo">
                
              </div>
              <div id = "infoMonitorFooter" class="modal-footer">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      `;

    //Event Listener For Submitting the 4 Digit or the 8 Digit Code 

    const btnSubmitCode = document.getElementById("screenPasswordSubmit");

    btnSubmitCode.addEventListener("click", function () {
      const userAnswer = document.getElementById("input4DigitCode").value
      final8DigitCode = firstHalfCode + secondHalfCode

      if (!solarSystemStatus) {
        if (userAnswer == firstPuzzleCode) {
          firstCodeStatus = true;
          sucessSound.play()
          alertModaltxtContainer.textContent = "Correct! You Have Unlocked the Rooms to Your Left and Right, and Discovered that the Ship has a Problem With the O2 System. Complete all Puzzles to Solve the Problem and Stabilize the Ship.You Need to Find Two 4 Digit Codes to Complete the First Room"
          $('#alertModal').modal('show');
        }
      } else {
        if (userAnswer == final8DigitCode) {

          sucessSound.play()
          alertModaltxtContainer.textContent = "Correct! You Have Managed to Stabilize the Ship, but You Spent Too Much Fuel Stabilizing, so You Have to do an Emergency Landing in Mercury, Since it's the Closest Place the Scanners Found Fuel in. You May Exit Through the Door in the Left Room."
          $('#alertModal').modal('show');
          lastCodesDone = true;

        } else {
          failSound.play();

          alertModaltxtContainer.textContent = "Incorrect! Try Combining Both Halves of the Code you Got!"
          $('#alertModal').modal('show');
        }
      }
    })

    // Event Listener for opening the monitorChallenge modal
    const leftMonitorInteraction = document.getElementById("leftMonitorInteraction");

    leftMonitorInteraction.addEventListener("click", function () {
      showChallengeMonitor(currentChallengeMonitor);
    });
  } else if (currentRoom === 0.5) {
    escapeRoomDiv.innerHTML =
      `
      <div class="firstRoomBg d-flex">
        <div id='inventoryBar'>
          <table>
            <tr style='background-color: #3B3B3B;'>
              <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
              <td id='slot1'>${inventorySlot1}</td> 
              <td id='slot2'>${inventorySlot2}</td> 
              <td id='slot3'>${inventorySlot3}</td> 
              <td id='slot4'>${inventorySlot4}</td> 
              <td id='invBarRightArrow'><img src='../images/interactions/Inventory Bar/invBarRightArrow.svg'></td> 
            </tr> 
          </table> 
        </div>

        <div id="lockerDoorArrow" class="d-flex">
          
            <div id="lockerDiv" class="d-flex">
              <button id="locker">
                <img id="lockerEdit" src="../images/interactions/room1/locker/lockerLocked.png">
              </button>
            </div>
            <button disabled="true" id="doorShip">
              <img id="doorShipEdit" src="../images/interactions/room1/doorShip/doorShip.png">
            </button>
            </div>
            <button id="rightArrowMain">
              <img src="../images/interactions/arrowRight.svg">
            </button>
          
        </div>  
      </div>
      
      `;

    //Verifies if the 8 Digit Code has Been Correctly Answered

    if (lastCodesDone) {
      const shipDoor = document.getElementById("doorShip");
      shipDoor.disabled = false;
    
      shipDoor.addEventListener("click", function () {
        var diffInSeconds = parseInt(totalTime) - parseInt(timeLeft);
        var diffFormatted = convertSecondsToMMSS(diffInSeconds);
    
        pauseTimer();
    
        let completionTimeElement = document.getElementById("completionTime");
        completionTimeElement.innerText = diffFormatted;
    
        User.setBestTime(diffFormatted);
    
        doorOpening.play();
    
        $('#completionModal').modal('show'); // Show the modal
    
        // Configures the Event for When the Modal is Closed
        $('#completionModal').on('hidden.bs.modal', function () {
          // Redirects to the HomePage
          window.location.href = '../HTML/homePage.html';
        });
    
      });
    }
    
    const btnLocker = document.getElementById("locker");
    firstHalfText = document.getElementById("firstHalf")

    //Adds an Event Listener to the Locker in the Left Room to Add Interactions With It

    btnLocker.addEventListener("click", function () {
      if (!solarSystemStatus) {
        alertModaltxtContainer.textContent = "Complete the Solar System Puzzle to Have Acess to the Locker"
        $('#alertModal').modal('show');
      } else {

        keyUnlock.play();

        firstHalfCode = generate4DigCode()

        inventorySlot3 = `<button data-bs-toggle="modal" data-bs-target="#secondCodeModal"><img src='../images/inventory/firstHalf.png'></button>`
        const inventorySlot3Tag = document.getElementById("slot3");
        firstHalfText.innerText = firstHalfCode
        inventorySlot3Tag.innerHTML = inventorySlot3;

        alertModaltxtContainer.textContent = "You've Unlocked the Locker and the First Half of the Final Code! Check the Left Monitor in the Center Room for Another Available Puzzle"
        $('#alertModal').modal('show');
      }
    })

  } else if (currentRoom === 1.5) {
    escapeRoomDiv.innerHTML =
      `
    <div id="solarSystemRoomBg">
    <div id="arrowAndPuzzleDiv" class="d-flex flex-row justify-content-center align-content-center">
    <button id="leftArrowMain">
    <img src="../images/interactions/arrowLeft.svg">
    </button>
    <div id="solarSystemPuzzleBg" class="d-flex align-items-end">
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
    </div>
    <div class="text-center">
    <button class="btn text-center"  id="btnSubmitSolarSystemPuzzle">Submit</button>
    </div>
    <div id='inventoryBar'>
    <table>
    <tr style='background-color: #3B3B3B;'>
    <td id='invBarLeftArrow'><img src='../images/interactions/Inventory Bar/invBarLeftArrow.svg'></td> 
    <td id='slot1'>${inventorySlot1}</td> 
    <td id='slot2'>${inventorySlot2}</td> 
    <td id='slot3'>${inventorySlot3}</td> 
    <td id='slot4'>${inventorySlot4}</td> 
    <td id='invBarRightArrow'><img src='../images/interactions/Inventory Bar/invBarRightArrow.svg'></td> 
    </tr> 
    </table> 
    </div>
    </div>
    `;

    if (solarSystemStatus) {
      const btnSubmitSolarSystem = document.getElementById("btnSubmitSolarSystemPuzzle");
      btnSubmitSolarSystem.disabled = true;
    }

    //Verifies if the Inputs are Correct

    const btnSubmit = document.getElementById('btnSubmitSolarSystemPuzzle');
    btnSubmit.addEventListener('click', function () {
      verifySolarSystemPuzzle(); // Calls The Function
    });

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

    // Removes the Old Elements From the Divs
    divs.forEach((div) => {
      while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
    });

    if (!solarSystemStatus && rightArrowClicked == false) {
      shuffledDivs = shuffleArray(divs);
    }
    else {
      shuffledDivs = divs
    }

    let mercuryInput = document.createElement("input");

    //Mercury Creation

    mercuryInput.type = "text";
    mercuryInput.id = "mercuryInput"
    mercuryInput.placeholder = "#";
    mercuryInput.style = "width: 40px"

    let mercuryImg = document.createElement("img");
    mercuryImg.className = "planetSize";
    mercuryImg.src = "../images/interactions/room1/Solar System Puzzle/Mercury.png"

    shuffledDivs[0].append(mercuryImg);
    shuffledDivs[0].append(mercuryInput)


    //Venus Creation

    let venusInput = document.createElement("input");

    venusInput.type = "text";
    venusInput.id = "venusInput"
    venusInput.placeholder = "#";
    venusInput.style = "width: 40px"

    let venusImg = document.createElement("img");
    venusImg.className = "planetSize";
    venusImg.src = "../images/interactions/room1/Solar System Puzzle/Venus.png"

    shuffledDivs[1].append(venusImg);
    shuffledDivs[1].append(venusInput)

    //Earth Creation

    let earthInput = document.createElement("input");

    earthInput.type = "text";
    earthInput.id = "earthInput"
    earthInput.placeholder = "#";
    earthInput.style = "width: 40px"

    let earthImg = document.createElement("img");
    earthImg.className = "planetSize";
    earthImg.src = "../images/interactions/room1/Solar System Puzzle/Earth.png"

    shuffledDivs[2].append(earthImg);
    shuffledDivs[2].append(earthInput)

    //Mars Creation

    let marsInput = document.createElement("input");

    marsInput.type = "text";
    marsInput.id = "marsInput"
    marsInput.placeholder = "#";
    marsInput.style = "width: 40px"

    let marsImg = document.createElement("img");
    marsImg.className = "planetSize"
    marsImg.src = "../images/interactions/room1/Solar System Puzzle/Mars.png"

    shuffledDivs[3].append(marsImg);
    shuffledDivs[3].append(marsInput)

    //Jupiter Creation

    let jupiterInput = document.createElement("input");

    jupiterInput.type = "text";
    jupiterInput.id = "jupiterInput"
    jupiterInput.placeholder = "#";
    jupiterInput.style = "width: 40px"

    let jupiterImg = document.createElement("img");
    jupiterImg.className = "planetSize";
    jupiterImg.src = "../images/interactions/room1/Solar System Puzzle/Jupiter.png"

    shuffledDivs[4].append(jupiterImg);
    shuffledDivs[4].append(jupiterInput)

    //Saturn Creation

    let saturnInput = document.createElement("input");

    saturnInput.type = "text";
    saturnInput.id = "saturnInput"
    saturnInput.placeholder = "#";
    saturnInput.style = "width: 40px"

    let saturnImg = document.createElement("img");
    saturnImg.className = "planetSize";
    saturnImg.src = "../images/interactions/room1/Solar System Puzzle/Saturn.png"

    shuffledDivs[5].append(saturnImg);
    shuffledDivs[5].append(saturnInput)

    //Uranus Creation

    let uranusInput = document.createElement("input");

    uranusInput.type = "text";
    uranusInput.id = "uranusInput"
    uranusInput.placeholder = "#";
    uranusInput.style = "width: 40px"

    let uranusImg = document.createElement("img");
    uranusImg.className = "planetSize";
    uranusImg.src = "../images/interactions/room1/Solar System Puzzle/Uranus.png"

    shuffledDivs[6].append(uranusImg);
    shuffledDivs[6].append(uranusInput)

    //Neptune Creation

    let neptuneInput = document.createElement("input");

    neptuneInput.type = "text";
    neptuneInput.id = "neptuneInput"
    neptuneInput.placeholder = "#";
    neptuneInput.style = "width: 40px"

    let neptuneImg = document.createElement("img");
    neptuneImg.className = "planetSize";
    neptuneImg.src = "../images/interactions/room1/Solar System Puzzle/Neptune.png"

    shuffledDivs[7].append(neptuneImg);
    shuffledDivs[7].append(neptuneInput)
  }


  const rightArrowMain = document.getElementById("rightArrowMain");
  const leftArrowMain = document.getElementById("leftArrowMain");

  if (rightArrowMain) {
    rightArrowMain.removeEventListener("click", handleRightArrowClick);
    rightArrowMain.addEventListener("click", handleRightArrowClick);
  }

  if (leftArrowMain) {
    leftArrowMain.removeEventListener("click", handleLeftArrowClick);
    leftArrowMain.addEventListener("click", handleLeftArrowClick);
  }

}

// Function that Displays the Educational Content in the Right Monitor of the Center Room

function showInfo() {
  const monitorInfo = document.getElementById("monitorInfo");
  const infoMonitorFooter = document.getElementById("infoMonitorFooter");

  if (currentTextInfo == 1) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${firstMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }
  } else if (currentTextInfo == 2) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${secondMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");
    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }

  } else if (currentTextInfo == 3) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${thirdMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");
    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }
  } else if (currentTextInfo == 4) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${fourthMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");
    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }
  } else if (currentTextInfo == 5) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${fifthMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");
    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }
  } else if (currentTextInfo == 6) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${sixthMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button id="rightArrowInfoMonitor">
      <img src="../images/interactions/arrowRight.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");
    const nextInfoButton = document.getElementById("rightArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }

    if (nextInfoButton) {
      nextInfoButton.removeEventListener("click", handleNextInfoButton);
      nextInfoButton.addEventListener("click", handleNextInfoButton);
    }
  } else if (currentTextInfo == 7) {
    monitorInfo.innerHTML =
      `
    <p id="txtInfo" class="speedy text-center">${seventhMessage}</p>
    `;

    infoMonitorFooter.innerHTML =
      `
    <button id="leftArrowInfoMonitor">
      <img src="../images/interactions/arrowLeft.svg">
    </button>
    <button type="button" class="btn btn-secondary speedy" data-bs-dismiss="modal">Close</button>
    `;

    const previousInfoButton = document.getElementById("leftArrowInfoMonitor");

    if (previousInfoButton) {
      previousInfoButton.removeEventListener("click", handlePreviousInfoButton);
      previousInfoButton.addEventListener("click", handlePreviousInfoButton);
    }
  }
}

//Changes the Displayed Info to the Next One or Previous One

function handleNextInfoButton() {
  currentTextInfo += 1;
  showInfo();
}

function handlePreviousInfoButton() {
  currentTextInfo -= 1;
  showInfo();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let firstPuzzleStatus = false;
let solarSystemStatus = false;

function verifySolarSystemPuzzle() {

  solarSystemStatus = false

  // Array that Stores the Correct Orders of the Planets 

  const correctOrder = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  // Variable that Controls if All the Answers Are Correct

  let allCorrect = true;

  // Iterates Over all the PLanets' Inputs

  for (let i = 0; i < correctOrder.length; i++) {
    const inputId = `${planets[i]}Input`;
    const inputValue = document.getElementById(inputId).value;

    // Verifies if the Inserted Value is Diffrent Than the Correct Order
    if (inputValue !== correctOrder[i]) {
      allCorrect = false; // At  Least One Answer is Incorrect
      break; // Breaks the Loop, Since it Found a Wrong Answer
    }
  }

  // Verifies the Result of the Verifications

  if (allCorrect) {
    sucessSound.play();

    solarSystemStatus = true;

    inventorySlot2 = `<img src='../images/inventory/solarSystemKey.png'></img>`
    const inventorySlot2Tag = document.getElementById("slot2");
    inventorySlot2Tag.innerHTML = inventorySlot2;

    progress += 40;
    curChallengesComp += 1;
    updateProgressBar()

    alertModaltxtContainer.textContent = "Correct! You Have Unlocked the Key to the Locker!"
    $('#alertModal').modal('show');
    rightArrowClicked = true;

  } else {
    failSound.play()
    alertModaltxtContainer.textContent = "Incorrect. Try Again!"
    $('#alertModal').modal('show');
  }
  const btnSolarSystemSubmit = document.getElementById("btnSubmitSolarSystemPuzzle")
  btnSolarSystemSubmit.disabled = true;
}

function handleLeftArrowClick() {

  if (!firstCodeStatus) {
    alertModaltxtContainer.textContent = "You Should Unlock the 4 Digit Code for the Main Monitor First!"
    $('#alertModal').modal('show');

  } else {
    currentRoom = moveLeft(currentRoom);
    showRoom(currentRoom);
  }
}

function handleRightArrowClick() {
  if (!firstCodeStatus) {
    alertModaltxtContainer.textContent = "You Should Unlock the 4 Digit Code for the Main Monitor First!"
    $('#alertModal').modal('show');

  } else {
    currentRoom = moveRight(currentRoom);
    showRoom(currentRoom);
  }

}

function moveLeft(currentRoom) {
  currentRoom -= 0.5;
  return currentRoom;
}

function moveRight(currentRoom) {
  currentRoom += 0.5;
  return currentRoom;
}

// Function that Shows the Challenges on the Left Monitor

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
          <td class="trueOrFalse">`+ (userAnswers[0] == 'True' ? "X" : "") + `</td>
          <td class="trueOrFalse">`+ (userAnswers[0] == 'False' ? "X" : "") + `</td>
        </tr>
        <tr>
          <td>The First Person to Travel to Space was Neil Armstrong</td>
          <td class="trueOrFalse">`+ (userAnswers[1] == 'True' ? "X" : "") + `</td>
          <td class="trueOrFalse">`+ (userAnswers[1] == 'False' ? "X" : "") + `</td>
        </tr>
        <tr>
          <td>Saturn Isn't the Only Planet With Rings in The Solar System</td>
          <td class="trueOrFalse">`+ (userAnswers[2] == 'True' ? "X" : "") + `</td>
          <td class="trueOrFalse">`+ (userAnswers[2] == 'False' ? "X" : "") + `</td>
        </tr>
      </table>
      <button disabled="true" id="rightArrowChallengeMonitor">
      <img src="../images/interactions/arrowRight.svg">
      </button>`;

    //Adds and Event Listener to the Button to Enable Interactions with It

    const nextChallengeButton = document.getElementById("rightArrowChallengeMonitor");
    nextChallengeButton.disabled = true;
    if (nextChallengeButton) {
      nextChallengeButton.removeEventListener("click", handleNextChallengeButton);
      nextChallengeButton.addEventListener("click", handleNextChallengeButton);
    }

    var rightArrowButton = document.getElementById("rightArrowChallengeMonitor");

    // Unlocks the Button to Go to the Next Challenge in the Center Room's Left Monitor

    if (solarSystemStatus) {
      rightArrowButton.disabled = false;
    }

  } else if (currentChallenge === 2) {
    monitorChallenge.innerHTML = `
      <button id="leftArrowChallengeMonitor">
        <img src="../images/interactions/arrowLeft.svg">
      </button>
      <table id="tableMultipleChoice1" class="table table-bordered speedy">
        <tr>
          <td colspan="2" class="text-center speedy">What is the Name of the Force which Keeps the Planets in Orbit around
            the Sun?</td>
        </tr>
        <tr>
          <td class="correctAnswer text-center">Gravity</td>
          <td class="wrongAnswer text-center">Tension</td>
        </tr>
        <tr>
          <td class="wrongAnswer text-center">Orbital Force</td>
          <td class="wrongAnswer text-center">Magnetic Force</td>
        </tr>
      </table>
      <button disabled="true" id="rightArrowChallengeMonitor">
        <img src="../images/interactions/arrowRight.svg">
      </button>
    `;

    const nextQuestionButton = document.getElementById("rightArrowChallengeMonitor");

    if (nextQuestionButton) {
      nextQuestionButton.removeEventListener("click", handleNextQuestionButton);
      nextQuestionButton.addEventListener("click", handleNextQuestionButton);
    }

    //Does the Verification for the Multiple Choice Puzzle

    const tableMultipleChoice = document.getElementById("tableMultipleChoice1")

    var answerCells = tableMultipleChoice.querySelectorAll('td');

    answerCells.forEach(function (cell) {
      cell.addEventListener('click', function () {

        // Removes the class "selected" from all the cells

        answerCells.forEach(function (cell) {
          cell.classList.remove('selected');
        });

        // Adds the Class "Selected" to the Clicked Cell

        cell.classList.add('selected');

        // Verifies if the Selected Cell Has the Class "correctAnswer"

        if (cell.classList.contains('correctAnswer')) {
          document.getElementById('rightArrowChallengeMonitor').removeAttribute('disabled');
          cell.style.backgroundColor = 'green';
          progress += 10;
          sucessSound.play();
          updateProgressBar()
        } else {
          failSound.play()
        }
      });
    });

  } else if (currentChallenge === 2.5) {
    monitorChallenge.innerHTML = `
      <button id="leftArrowChallengeMonitor">
        <img src="../images/interactions/arrowLeft.svg">
      </button>
      <table id="tableMultipleChoice2" class="table table-bordered speedy">
        <tr>
          <td colspan="2" class="text-center">What would you find if you travelled to the center of the solar system?
          </td>
        </tr>
        <tr>
          <td class="wrongAnswer text-center">Earth</td>
          <td class="wrongAnswer text-center">A Black Hole</td>
        </tr>
        <tr>
          <td class="correctAnswer text-center">The Sun</td>
          <td class="wrongAnswer text-center">Saturn</td>
        </tr>
      </table>
      <button id="rightArrowChallengeMonitor">
        <img src="../images/interactions/arrowRight.svg">
      </button>
    `;

    const tableMultipleChoice2 = document.getElementById("tableMultipleChoice2")

    var answerCells = tableMultipleChoice2.querySelectorAll('td');

    answerCells.forEach(function (cell) {
      cell.addEventListener('click', function () {

        // Removes the class "selected" from all the cells

        answerCells.forEach(function (cell) {
          cell.classList.remove('selected');
        });

        // // Adds the Class "Selected" to the Clicked Cell
        cell.classList.add('selected');

        // Verifies if the Selected Cell Has the Class "correctAnswer"

        if (cell.classList.contains('correctAnswer')) {

          // Enables the Right Arrow Button and Fills the Cell's Background with the Color Green

          document.getElementById('rightArrowChallengeMonitor').removeAttribute('disabled');
          cell.style.backgroundColor = 'green';
          progress += 10;
          sucessSound.play();
          updateProgressBar()
        } else {

          // Disables the Right Arrow Button and Removes Any Background Color From the Cell

          failSound.play()
          document.getElementById('rightArrowChallengeMonitor').setAttribute('disabled', 'disabled');
          cell.style.backgroundColor = '';
        }
      });
    });

    const nextQuestionButton = document.getElementById("rightArrowChallengeMonitor");

    if (nextQuestionButton) {
      nextQuestionButton.removeEventListener("click", handleNextQuestionButton);
      nextQuestionButton.addEventListener("click", handleNextQuestionButton);
    }

  } else if (currentChallenge === 3) {
    monitorChallenge.innerHTML = `
      <button id="leftArrowChallengeMonitor">
        <img src="../images/interactions/arrowLeft.svg">
      </button>
      <table id="tableMultipleChoice3" class="table table-bordered speedy">
        <tr>
          <td colspan="2" class="text-center">What Shape is the Milky Way?</td>
        </tr>
        <tr>
          <td class="wrongAnswer text-center">Circular</td>
          <td class="correctAnswer text-center">Spiral</td>
        </tr>
        <tr>
          <td class="wrongAnswer text-center">Elliptical</td>
          <td class="wrongAnswer text-center">Irregular</td>
        </tr>
      </table>
    `;
    const tableMultipleChoice3 = document.getElementById("tableMultipleChoice3")

    var answerCells = tableMultipleChoice3.querySelectorAll('td');

    secondHalfText = document.getElementById("secondHalf")

    answerCells.forEach(function (cell) {
      cell.addEventListener('click', function () {

        // Removes the class "selected" from all the cells

        answerCells.forEach(function (cell) {
          cell.classList.remove('selected');
        });

        // Adds the Class "Selected" to the Clicked Cell

        cell.classList.add('selected');

        // Verifies if the Selected Cell Has the Class "correctAnswer"

        if (cell.classList.contains('correctAnswer')) {

          // Enables the Right Arrow Button and Fills the Cell's Background with the Color Green

          cell.style.backgroundColor = 'green';
          progress += 10;
          curChallengesComp += 1;
          sucessSound.play();
          updateProgressBar()

          alertModaltxtContainer.textContent = "Correct! You Got the Second Half of the 8 Digit Code! Insert the Entire Code in the Main Monitor!"
          $('#alertModal').modal('show');


          secondHalfCode = generate4DigCode()

          inventorySlot4 = `<button data-bs-toggle="modal" data-bs-target="#secondHalfCode"><img src='../images/inventory/secondHalf.png'></button>`
          const inventorySlot4Tag = document.getElementById("slot4");
          secondHalfText.innerText = secondHalfCode
          inventorySlot4Tag.innerHTML = inventorySlot4;

        } else {
          failSound.play()

          // Disables the Right Arrow Button and Removes Any Background Color From the Cell

          cell.style.backgroundColor = '';
        }
      });
    });
    const nextQuestionButton = document.getElementById("rightArrowChallengeMonitor");

    if (nextQuestionButton) {
      nextQuestionButton.removeEventListener("click", handleNextQuestionButton);
      nextQuestionButton.addEventListener("click", handleNextQuestionButton);
    }

  }

  const previousChallengeButton = document.getElementById("leftArrowChallengeMonitor");

  if (previousChallengeButton) {
    previousChallengeButton.removeEventListener("click", handlePreviousChallengeButton);
    previousChallengeButton.addEventListener("click", handlePreviousChallengeButton);
  }

  // Gets all the td elements with the class "trueOrFalse"
  var cells = document.getElementsByClassName("trueOrFalse");



  // Goes through all the td elements and adds an event listener to each of them
  for (var i = 0; i < cells.length; i++) {

    cells[i].addEventListener("click", function () {

      //Verifies if the first puzzle has been completed, and if it hasn't been completed it runs the code normally

      if (!firstPuzzleStatus) {
        // Goes through the cells in the same row
        var rowCells = this.parentNode.children;
        for (var j = 1; j < rowCells.length; j++) {
          // Removes the "X" from the cells after the question cells
          rowCells[j].innerText = "";
        }

        // Defines the Content of the Current Cell as "X"
        this.innerText = "X";

        // Verifies the User's answers
        checkAnswers();
      }
    });
  }
}

//Function That Generates a Random 4 Digit Code

function generate4DigCode() {
  let code = ""
  for (var i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

//Function That Shows the Table of The Multiple Choice Question That is Currently Displaying

let currentChallengeMonitor = 1;
showRoom(currentRoom);

// Event Listener for opening the monitorChallenge modal
const leftMonitorInteraction = document.getElementById("leftMonitorInteraction");

leftMonitorInteraction.addEventListener("click", function () {
  showChallengeMonitor(currentChallengeMonitor);
});

const rightMonitorInteraction = document.getElementById("rightMonitorInteraction");

rightMonitorInteraction.addEventListener("click", function () {
  showInfo();
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

//Handles the Next and Previous Question Button

function nextQuestion(currentChallenge) {
  currentChallenge += 0.5;
  return currentChallenge;
}

function previousQuestion(currentChallenge) {
  currentChallenge -= 0.5;
  return currentChallenge;
}

function handleNextQuestionButton() {
  currentChallengeMonitor = nextQuestion(currentChallengeMonitor)
  showChallengeMonitor(currentChallengeMonitor)
}

function handlePreviousQuestionButton() {
  currentChallengeMonitor = previousQuestion(currentChallengeMonitor)
  showChallengeMonitor(currentChallengeMonitor)
}

//Checks if the User has Gotten the Answers Right

function checkAnswers() {
  var table = document.getElementById("trueOrFalseTable");
  var rows = table.getElementsByTagName("tr");
  var correctAnswers = ["False", "False", "True"];
  userAnswers = [];
  // Goes through each row of the table, starting from the second line
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var answer = "";

    // Verifies in which cell the user's answer is (to see if it's True or False)
    if (cells[1].innerText === "X") {
      answer = "True";
    } else if (cells[2].innerText === "X") {
      answer = "False";
    }

    userAnswers.push(answer);
  }

  // Verifies if the user's answers are correct 
  var isCorrect = true;
  for (var i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i] !== userAnswers[i]) {
      isCorrect = false;
      break;
    }
  }

  //Handles the Funtionalities for Completing the Puzzle(Adds the Progress to the Progress Bar, Adds the Completion of the Challenge to the Completed Challenges Text and Plays the Sucess Sound)

  if (isCorrect && firstPuzzleStatus != true) {

    const firstCodeText = document.getElementById("firstCode");

    firstPuzzleCode = generate4DigCode()
    firstCodeText.innerText = firstPuzzleCode
    firstPuzzleStatus = true;

    sucessSound.play();

    progress += 30;
    curChallengesComp += 1;
    updateProgressBar();

    // Uses the Promise to Wait For All the Actions to be Completed before Showing the Alert Modal
    Promise.resolve()
      .then(function () {
        return new Promise(function (resolve) {
          // Sets a One Second Timeout Before Showing the Alert Modal
          setTimeout(resolve, 1000);
        });
      })
      .then(function () {

        // Shows the Alert Modal
        alertModaltxtContainer.textContent = "Congrats on Solving Your First Puzzle! You Have Unlocked the 4 Digit Code to Access the Main Monitor!"
        $('#alertModal').modal('show');

        inventorySlot1 = `<button data-bs-toggle="modal" data-bs-target="#firstCodeModal"><img src='../images/inventory/firstPuzzleCode.png'></button>`
        const inventorySlot1Tag = document.getElementById("slot1");
        inventorySlot1Tag.innerHTML = inventorySlot1;
      });
  }
}