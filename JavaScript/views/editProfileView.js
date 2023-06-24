import * as User from "../modules/userModule.js";

let btnLogOut = document.getElementById("logOut");

btnLogOut.addEventListener("click", function() {
    User.logout()
    window.location.href = '../index.html';
})