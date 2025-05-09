const connected = document.querySelector(".connected");
const notConnected = document.querySelector('.not-connected');
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const decobtn = document.querySelector("#deco");

decobtn.addEventListener("click", deco);

const currentUser = sessionStorage.getItem("currentUser");

if (currentUser) {
    connected.classList.remove("disable");
    notConnected.classList.add("disable");
    username.textContent = JSON.parse(sessionStorage.getItem("currentUser")).nom;
    email.textContent = JSON.parse(sessionStorage.getItem("currentUser")).mail;
} else {
    connected.classList.add("disable");
    notConnected.classList.remove("disable"); 
}

function deco() {
    sessionStorage.removeItem("currentUser");
    connected.classList.add("disable");
    notConnected.classList.remove("disable"); 
}