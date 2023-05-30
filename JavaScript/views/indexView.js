import * as User from "../modules/userModule.js";

function userAutenthification() {
    User.init();

    // CLICAR NO BOTÃO DE REGISTAR
    document
        .querySelector("#registerForm")
        ?.addEventListener("submit", (event) => {
            event.preventDefault();
            // Gestão do formulário de Registo
            const registerUsername = document.getElementById("txtRegisterUsername");
            const registerPassword = document.getElementById("txtRegisterPassword");
            const registerPassword2 = document.getElementById("txtRegisterConfPassword");
            try {
                if (registerPassword.value !== registerPassword2.value) {
                    throw Error("Password and Confirm Password are not equal");
                }
                User.add(registerUsername.value, registerPassword.value);
                displayMessage(
                    "alertRegister",
                    "User registered with success!",    
                    "success"
                );
                // Wait 1 second before reloading, so the user can see the login success message
                setTimeout(() => {
                    window.location.href = '../HTML/homePage.html';
                }, 1000);
            } catch (e) {
                displayMessage("alertRegister", e.message, "danger");
            }
        });

    // CLICAR NO BOTÃO DE LOGIN
    document.querySelector("#logInForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        try {
            User.login(
                document.getElementById("txtUsernameLogIn").value,
                document.getElementById("txtPasswordLogIn").value
            );
            displayMessage("alertLogIn", "User logged in with success!", "success");
            // Wait 1 second before reloading, so the user can see the login success message
            setTimeout(() => {
                window.location.href = '../HTML/homePage.html';
            }, 1000);
        } catch (e) {
            displayMessage("alertLogIn", e.message, "danger");
        }
    });

    function displayMessage(modal, message, type) {
        const divMessage = document.getElementById(modal);
        divMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => {
            divMessage.innerHTML = "";
        }, 2000);
    }
}

userAutenthification();