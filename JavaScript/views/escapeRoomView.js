//Tempo

const totalTime = 1200;           //Tempo Total em Segundos do Escape Room
let totalChallenges = 3;          //Quantidade de Desafios a Completar na Primeira Sala (Vai Mudar de Sala para Sala)
let timeLeft = totalTime;
const timer = document.getElementById("timer");
let timeLeftElement = document.createElement("p")

timeLeftElement.id = "timeLeft"
timeLeftElement.className = "speedy"
timeLeftElement.textContent = timeFormat(timeLeft);

timer.appendChild(timeLeftElement);

// Função para formatar o tempo no formato MM:SS
function timeFormat(timeSecs) {
    const minutes = Math.floor(timeSecs / 60);
    const timeSecsLeft = timeSecs % 60;
    return `${minutes.toString().padStart(2, '0')}:${timeSecsLeft.toString().padStart(2, '0')}`;
}

//Desafios

let curChallengesComp = 0;        //Variável que Guarda e Atualiza os Desafios Completados

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
const progressElement= document.getElementById("barFill")

progressElement.style.width = progress + '%';



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

