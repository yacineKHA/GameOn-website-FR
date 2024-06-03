function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/**
 * Permet de fermer la fenêtre modal (formulaire)
 */
const closeModal = () => {
  deleteErrorsMessages();
  modalbg.style.display = "none";
}

/**
 * Permet de récupérer la valeur du radiobutton checké
 * @param name Nom des radiobutton
 * @returns Retourne la valeur du radiobutton sélectionné
 */
const displayRadioValue=(name)=> {
  let ele = document.getElementsByName(name);

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      console.log("location: ", ele[i].value)
      return ele[i].value;
    }
  }
}

/**
 * Effacer les messages d'erreurs précédent
 */
const deleteErrorsMessages = ()=>{
   
   document.getElementById("first-error").textContent = "";
   document.getElementById("last-error").textContent = "";
   document.getElementById("email-error").textContent = "";
   document.getElementById("birthdate-error").textContent = "";
   document.getElementById("quantity-error").textContent = "";
   document.getElementById("location-error").textContent = "";

}

/**
 * Permet de verifier si tous les requis sont bien remplis, puis retourne la liste des valeurs
 * @param event Récupération de l'evenement au clic
 */
const validate = (event) => {

  event.preventDefault();

  let isValid = true;

  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const location = document.getElementsByName('location');
  const checkbox1 = document.getElementById("checkbox1");
  const checkbox2 = document.getElementById("checkbox2");

  console.log("firstname: ", firstName.value);
  console.log("lastname: ", lastName.value);
  console.log("email: ", email.value);
  console.log("birthday: ", birthdate.value);
  console.log("quantity: ", quantity.value);

  deleteErrorsMessages();

  let locationValue = displayRadioValue("location");

  console.log("condition: ", checkbox1.value);
  console.log("events: ", checkbox2.value);


  if (firstName.value.trim().length < 2) {
    document.getElementById("first-error").textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    isValid = false;
  }

  if (lastName.value.trim().length < 2) {
    document.getElementById("last-error").textContent = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value)) {
    document.getElementById("email-error").textContent = "Veuillez entrer une adresse email valide.";
    isValid = false;
  }

  if (birthdate.value === "") {
    document.getElementById("birthdate-error").textContent = "Vous devez entrer votre date de naissance.";
    isValid = false;
  }

  if (quantity.value === "" || quantity.value < 0 || quantity.value > 99) {
    document.getElementById("quantity-error").textContent = "Veuillez entrer une quantité valide (0-99).";
    isValid = false;
  }

  if (!locationValue) {
    document.getElementById("location-error").textContent = "Vous devez choisir une option.";
    isValid = false;
  }

  if (!checkbox1.checked) {
    alert("Vous devez vérifier que vous acceptez les termes et conditions.");
    isValid = false;
  }

  if (isValid) {
    deleteErrorsMessages();
    const form = document.querySelector(".modal-body");
    const validDiv = document.querySelector(".validate");
    form.style.display = "none";
    validDiv.style.display = "flex";
    console.log("Données valides: ",firstName.value, lastName.value, email.value, birthdate.value, quantity.value, locationValue, checkbox1.checked);
  }
  
}





