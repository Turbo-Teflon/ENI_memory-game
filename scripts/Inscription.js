document.getElementById('inscriptionForm').addEventListener('input', function () {
        validateForm();
});
    
    
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/;
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('mdp');
const confirmPassword = document.getElementById('mdpConf');
const submitBtn = document.getElementById('submitBtn');
const userError = document.getElementById('userError');
const emailError = document.getElementById('emailError');
const mdpError = document.getElementById('mdpError');
const mdpConfError = document.getElementById('mdpConfError');

let errormsg = "";

let users = [];

submitBtn.addEventListener("click", () => {

    if (localStorage.getItem("users")) users = JSON.parse(localStorage.getItem("users")); //récupère le localstaorage
    let id = users.length;
    const user = {
        id : id,
        nom : username.value,
        mail : email.value,
        mdp : password.value
    }
    if (validateForm()) {
        users[id] = user; 
        localStorage.setItem("users", JSON.stringify(users));
        alert("Inscription réussie !");
    }else{
        alert("Echec de l'inscription" + errormsg);
    }
});

function validateForm() {

    let isValid = true;

    if (!username.value || !password.value || !confirmPassword.value) {
        isValid = false;
    }

    if (!regex.test(password.value)) {
        isValid = false;
        mdpError.textContent = 'Au moins une minuscule, majuscule et caractère spécial + 8char. minimum';
        mdpError.classList.remove('success');
        mdpError.classList.add('error');
    }else{
        mdpError.textContent = 'mdp Valide';
        mdpError.classList.add('success');
        mdpError.classList.remove('error');
    }
    if (password.value !== confirmPassword.value) {
        mdpConfError.textContent = 'Passwords do not match';
        mdpConfError.classList.remove('success');
        mdpConfError.classList.add('error');
        isValid = false;
    } else {
        mdpConfError.textContent = 'Passwords match';
        mdpConfError.classList.remove('error');
        mdpConfError.classList.add('success');
    }
    if (isValid) {
        submitBtn.classList.add('enabled');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('enabled');
        submitBtn.disabled = true;
    }
    //test si il y à déjà un user par email
    let emailExist = false;
    for (const u of users) {
        if(email.value === u.mail) emailExist = true;
    }
    if (emailExist) {
        errormsg += " cet email existe déjà";
        isValid = false;
    }

    return isValid;
}