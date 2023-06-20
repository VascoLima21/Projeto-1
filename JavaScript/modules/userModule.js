let users;
let userLogged;

// Loads Users From the Local Storage
export function init() {
  users = localStorage.users ? JSON.parse(localStorage.users) : [];
}

// Register User
export function register(username, password, email, country, gender) {
  if (users.some((user) => user.username === username)) {
    throw Error(`User with username "${username}" already exists!`);
  } else if (users.some((user) => user.email === email)) {
    throw Error(`User with email "${email}" already exists!`);
  }else {
    userLogged= new User(username, password, email, country, gender, NaN, "../images/icons/defaultIcon.png", "", "user", [], 0);
    users.push(userLogged);
    sessionStorage.setItem("loggedUser", JSON.stringify(userLogged));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// User LogIn
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

// User LogOut
export function logout() {
  sessionStorage.removeItem("loggedUser");
}

// Verifies if someone is logged in
export function isLogged() {
  return sessionStorage.getItem("loggedUser") ? true : false;
}

// Returns logged user
export function getUserLogged() {
  return JSON.parse(sessionStorage.getItem("loggedUser"));
}

export function setBestTime(userBestTime) {
  var jsonArray = localStorage.getItem('users');
  var objectArray = JSON.parse(jsonArray);
  var index = -1;

  // Iterate over the objectArray to find the desired index
  for (var i = 0; i < objectArray.length; i++) {
    // Assuming there is a function called getUserLogged that returns the current user's username
    if (objectArray[i].username === getUserLogged().username) {
      index = i; // Store the index when the condition is met
      break; // Exit the loop once the index is found
    }
  }

  // Check if the index is valid
  if (index !== -1) {
    var targetObject = objectArray[index];
    targetObject.bestTime = userBestTime;
    var updatedJsonArray = JSON.stringify(objectArray);
    localStorage.setItem('users', updatedJsonArray);
  } else {
    // Handle the case when the index is not found
    console.log("User not found in the array");
  }
}

/**
 * CLASS that models an user in the app
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