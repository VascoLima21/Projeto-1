import * as User from "../modules/userModule.js";

// Cria uma navbar
function createNavbar() {
    User.init();

    //Vai buscar o utilizador que está logado
    var user= User.getUserLogged();
    
    // Cria a div da navbar
    var navbar = document.querySelector("#navbar");
    var rectangle = document.createElement("span");
    var userPfp= document.createElement("div");
    userPfp.className= "userPfpFrame"
    userPfp.style.backgroundImage= `url(${user.profilePic})`;
    rectangle.className = "rectangle";
    console.log(user.profilePic)
    console.log(user)

    // Cria o Ícone Como um link
    var iconLink = document.createElement("a");
    iconLink.href = "../HTML/homePage.html";

    // Cria a imagem do Ícone
    var icon = document.createElement("img");
    icon.className= "icon"
    icon.src = "../images/logo/Stellar Escape Logo Final BW R.svg";

    // Adiciona a imagem como filho do link
    iconLink.appendChild(icon);

    // Adiciona o link com a imagem à navbar
    navbar.appendChild(iconLink);

    // Cria os links da navbar
    var links = [
        { text: "Achievements", url: "../HTML/achievementsPage.html" },
        { text: "Leaderboards", url: "../HTML/leaderboards.html" },
        { text: "Forum", url: "../HTML/forum.html" }
    ];

    for (var i = 0; i < links.length; i++) {
        var link = document.createElement("a");
        link.href = links[i].url;
        link.textContent = links[i].text;
        navbar.appendChild(link);
    }

    navbar.appendChild(userPfp);
    navbar.appendChild(rectangle);
}

// Define o link ativo
function setActiveLink(clickedLink) {
    var links = document.querySelector("#navbar").getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }
    clickedLink.classList.add("active");
}

// Chama a função para criar a navbar
createNavbar();