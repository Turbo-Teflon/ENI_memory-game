const $divJeu = document.querySelector('#plateau');
let firstCard, secondCard;
let locked = false;
let cards = [];
let score = 0;

document.querySelector(".score").textContent = score;
fetch("./data/cards.json")
.then(res => res.json())
.then(data => {
    cards = [...data.legumes, ...data.legumes];
    shuffle(cards);
    afficheCartes(cards);
});

function shuffle(paquet) {
    let i = paquet.length
    let random;
    let tmp;
    while (i !== 0) {
        random = Math.floor(Math.random() * i);
        i--;
        tmp = paquet[i];
        paquet[i] = paquet[random];
        paquet[random] = tmp;
    }
}
function afficheCartes(paquet) {
    for (const card of paquet) {
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("carte");
        cardContainer.setAttribute("name", card.name);
        cardContainer.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image}>
            </div>
            <div class="back"></div>`;
        $divJeu.appendChild(cardContainer);
        cardContainer.addEventListener("click", flipCard);
    }
}

function flipCard() {
    if(locked) return;
    if(this === firstCard) return;

    this.classList.add("flipped");

    if(!firstCard){
        firstCard= this;
        return;
    }
    secondCard = this;
    score++;
    document.querySelector(".score").textContent = score;
    locked = true;

    check();
}

function check(){
    let isMatch = firstCard.getAttribute("name") === secondCard.getAttribute("name");
    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetPlateau();
}

function unflipCards(){
    console.log(firstCard);
    console.log(secondCard);
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetPlateau();
    }, 2000);
}

function resetPlateau(){
    firstCard= null;
    secondCard= null;
    locked = false;
}