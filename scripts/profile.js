const connected = document.querySelector(".connected");
const notConnected = document.querySelector('.not-connected');
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const selection = document.querySelector(".selection");
const imgPres = document.querySelector(".selection img")
const decobtn = document.querySelector("#deco");

selection.addEventListener("change", select);
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
function select(value) {
    sessionStorage.setItem("choixMemory", value.target.value);
    const urlImg = sessionStorage.getItem("choixMemory") + "/detail.png";
    imgPres.setAttribute("src", `./medias/${urlImg}`);
    console.log(urlImg);
}
function deco() {
    sessionStorage.clear();
    connected.classList.add("disable");
    notConnected.classList.remove("disable"); 
}