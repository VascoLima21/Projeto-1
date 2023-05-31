let users;

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// ADICIONAR UTILIZADOR
export function add(username, password) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else {
    users.push(new User(username, password));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// LOGIN DO UTILIZADOR
export function login(username, password) {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    sessionStorage.setItem("loggedUser", JSON.stringify(user));
    // window.location.href= "../HTML/homePage.html";
    return true;
  } else {
    throw Error("Invalid login!");
  }
}

// LOGOUT DO UTILIZADOR
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// VERIFICA EXISTÊNCIA DE ALGUÉM AUTENTICADO
export function isLogged() {
  return sessionStorage.getItem("loggedUser") ? true : false;
}

// DEVOLVE UTILZIADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
class User {
  username= "";
  password= "";
  type= "admin";
  bestTime= NaN;
  profilePic= "default";
  description= "";
  email= "liam@gmail.com";
  country= "portugal";
  gender= "male";
  achievements= [];
  timesCompleted= 0;

  constructor(username, password,type,bestTime,profilePic,description,email,country,gender, achievements) {
    this.username = username;
    this.password = password;
    this.type = type;
    this.bestTime = bestTime;
    this.profilePic = profilePic;
    this.description = description;
    this.email = email;
    this.country = country;
    this.gender = gender;
    this.achievements = achievements;
    this.timesCompleted = timesCompleted;
  }
}