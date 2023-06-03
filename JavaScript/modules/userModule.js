let users;
let userLogged;

// CARREGAR UTILIZADORES DA LOCALSTORAGE
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// ADICIONAR UTILIZADOR
export function register(username, password, email, country, gender) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else if (users.some((user) => user.email === email)) {
    throw Error(`User with email "${email}" already exists!`);
  }else {
    userLogged= new User(username, password, email, country, gender);
    users.push(userLogged);
    sessionStorage.setItem("loggedUser", JSON.stringify(userLogged));
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

// DEVOLVE UTILIzADOR AUTENTICADO
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

/**
 * CLASSE QUE MODELA UM UTILIZADOR NA APLICAÇÃO
 */
class User {
  username= "";
  password= "";
  email= "";
  country= "";
  gender= "";
  bestTime= NaN;
  profilePic= "../images/icons/defaultIcon.png";
  description= "";
  type= "user";
  achievements= [];
  timesCompleted= 0;

  constructor(username, password, email, country, gender,bestTime,profilePic,description,type,achievements,timesCompleted) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.country = country;
    this.gender = gender;
    this.bestTime = bestTime;
    this.profilePic = profilePic;
    this.description = description;
    this.type = type;
    this.achievements = achievements;
    this.timesCompleted = timesCompleted;
  }
}