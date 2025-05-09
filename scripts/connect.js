const email = document.getElementById("email");
const password = document.getElementById("mdp");
const submitBtn = document.getElementById("submitBtn");
const emailError = document.getElementById("emailError");
const mdpError = document.getElementById("mdpError");

const MDP_ERROR = "mdp invalide";
const MAIL_ERROR = "email invalide, inscrivez-vous";

submitBtn.addEventListener("click", () => {
  const users = JSON.parse(localStorage.getItem("users"));
  let userExist = false;

  if (users) {

    users.forEach((user) => {

      if (user.mail === email.value) {
        userExist = true;

        if (password.value === user.mdp) {
          sessionStorage.setItem("currentUser", JSON.stringify(user));
					alert("Connexion Réussie, bienvenu " + user.nom);
          document.location.href= "./profile.html";
        } else {
          mdpError.textContent = MDP_ERROR;
          mdpError.classList.remove("success");
          mdpError.classList.add("error");
        }
      }

    });
    if (!userExist){
      emailError.textContent = MAIL_ERROR;
      emailError.classList.add("error");
      mdpError.classList.remove("success");
    }

  }
});
