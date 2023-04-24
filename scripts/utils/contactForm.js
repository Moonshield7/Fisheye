const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const background = document.querySelector(".background");
const closeButton = document.getElementById("close-button");
const body = document.querySelector("body");

function displayModal() {
	modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    background.style.display ="block";
    main.setAttribute("aria-hidden", "true");
    body.classList.add("no-scroll");
    closeButton.focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    background.style.display ="none";
    main.setAttribute("aria-hidden", "false");
    body.classList.remove("no-scroll");
}

// Fermeture de la modale via la touche echap
document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode ? e.keyCode : e.which;
    if(modal.style.display === "block" && keyCode === 27){
        closeModal();
    }
})

// ### GESTION DU FORMULAIRE ###

// # Récupération des champs du formulaire #

const form = document.getElementById('formulaire');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const message = document.getElementById('message');

// Fonction : afficher une erreur.
function setError(element, message){
    // On sélectionne la div ayant la class .erreur liée à l'élément que l'on teste grâce à son élément parent
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.querySelector('.error');

    //On indique le message à afficher dans cette erreur, et on change la bordure grâce aux classes CSS (passe en rouge ici)
    errorDisplay.innerText = message;
    errorDisplay.classList.remove('success');
    inputContainer.classList.add('error');
    inputContainer.classList.remove('success');
}

// Fonction : signaler un succès.
function setSuccess(element){
    // On sélectionne la div ayant la class .erreur liée à l'élément que l'on teste grâce à son élément parent
    const inputContainer = element.parentElement;
    const errorDisplay = inputContainer.querySelector('.error');

    //On efface le message d'erreur qui pourraît être affiché, et on change la bordure grâce aux classes CSS (passe en vert ici)
    errorDisplay.innerText = "Le champ a bien été completé";
    errorDisplay.classList.add('success');
    inputContainer.classList.add('success');
    inputContainer.classList.remove('error');
}
// Fonction : validation et envoi du formulaire lorsque l'on clique sur le bouton submit
function validateForm(){
    let firstnameIsValid = validateFirstname();
    let lastnameIsValid = validateLastname();
    let emailIsValid = validateEmail();
    let messageIsValid = validateMessage();


    // Si l'un des éléments n'est pas valide : l'utilisateur reçoit un message d'erreur.
    if(!firstnameIsValid || !lastnameIsValid || !emailIsValid || !messageIsValid){
        alert("Veuillez remplir les champs du formulaire correctement.");
    }
    // Si tous le formulaire est valide, un message de succès s'affiche dans la modale, avec un bouton qui peut permettre de la faire disparaître.
    else {
        console.log(`Prénom : ${firstname.value}`);
        console.log(`Nom : ${lastname.value}`);
        console.log(`Email : ${email.value}`);
        console.log(`Message : ${message.value}`);
        form.innerHTML = "";
        const formThanks = document.createElement('h2');
        formThanks.textContent = "Formulaire envoyé !";
        formThanks.classList.add("form-success");
        formThanks.setAttribute("tabindex", "0");
        const formThanksClose = document.createElement('p');
        formThanksClose.textContent = "Fermer la boîte de dialogue";
        formThanksClose.classList.add("thanks_button");
        formThanksClose.setAttribute("tabindex", "0");
        form.appendChild(formThanks);
        form.append(formThanksClose);
        formThanks.focus();
        formThanksClose.addEventListener("click", () => {
            closeModal();
        })

    }
}

//Fonction de vérification du format du nom et prénom via une regex
function isValidName(name){
    const re = /^[A-zÀ-ú\-"' ]+$/;
    return re.test(String(name));
}

// Fonction : validation du prénom
function validateFirstname(){
    // On récupère la valeur du champ "firstname". trim() permet d'effacer les espaces avant ou après  chaîne de caractère, sans la modifier.
    const firstnameValue = firstname.value.trim();

    //Si le prénom n'est pas saisi :
    if(firstnameValue === "") {
        setError(firstname, "Veuillez entrer votre prénom");
        return false;
    }
    //Si le prénom contient moins de deux caractères
    else if(firstnameValue.length <= 2){
        setError(firstname, "Votre prénom doit comporter plus de deux caractères");
        return false;
    } 
    //Si le prénom contient d'autres caractères que des lettres
    else if(!isValidName(firstnameValue)) {
      setError(firstname, "Votre prénom ne peut contenir que des lettres.");
      return false;
    }
    // Les conditions sont remplies
    else {
        setSuccess(firstname);
        return true;
    }
}
  
//Identique à la fonction précédente, mais les messages d'erreur sont légèrement différents
function validateLastname(){
    const lastnameValue = lastname.value.trim();

    if(lastnameValue === "") {
        setError(lastname, "Veuillez entrer votre nom");
        return false;
    }else if(lastnameValue.length <= 2){
        setError(lastname, "Votre nom doit comporter plus de deux caractères");
        return false;
    } else if(!isValidName(lastnameValue)) {
        setError(lastname, "Votre nom ne peut contenir que des lettres.");
        return false;
    } else {
        setSuccess(lastname);
        return true;
    }
}


// Fonction de vérification du format de l'email grâce à l'utilisation d'une regex (expressionégulière)
function isValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Fonction de vérification de l'email. Vérifie si l'email est indiqué, et si le format est bon
function validateEmail(){
    const emailValue = email.value.trim();
    if(emailValue === ""){
        setError(email, "Veuillez entrer votre adresse email");
        return false;
    } else if(!isValidEmail(emailValue)){
        setError(email, "Votre email doit être au format : bonjour@contact.com");
        return false;
    } else {
        setSuccess(email);
        return true;
    }
}

// Fonction de vérification du message. Vérifie qu'un message est écrit, et qu'il est un minimum détaillé.
function validateMessage(){
    const messageValue = message.value.trim();
    if(messageValue.length < 1){
        setError(message, "Veuillez écrire votre message")
    } else if(messageValue.length < 10){
        setError(message, "Veuillez détailler votre demande (plus de 10 caractères)")
    } else {
        setSuccess(message);
        return true;
    }
  }

// Ecouteurs d'évènement sur les champs du formulaire.
firstname.addEventListener('keyup', ()=> {
    validateFirstname();
});
lastname.addEventListener('keyup', ()=> {
    validateLastname();
});
email.addEventListener('keyup', ()=> {
    validateEmail();
});
message.addEventListener('keyup', ()=> {
    validateMessage();
});

// Ecouteur d'évènement qui vérifie les champs du formulaire formulaire.
const submitButton = document.getElementById("submit");
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    validateForm();
});