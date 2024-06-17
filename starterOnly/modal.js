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
const form = document.querySelector(".modal-body");
const validDiv = document.querySelector(".validate");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

const fields = [
  { elementId: "first", errorId: "first-error" },
  { elementId: "last", errorId: "last-error" },
  { elementId: "email", errorId: "email-error" },
  { elementId: "birthdate", errorId: "birthdate-error" },
  { elementId: "quantity", errorId: "quantity-error" }
];

// Liste des élément pour la suppression des messages d'erreurs
const listOfElementForErrorsMessages = [
  "first-error",
  "last-error",
  "email-error",
  "birthdate-error",
  "quantity-error",
  "location-error",
  "conditions-error"
];

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
  deleteErrorsMessages(listOfElementForErrorsMessages);
  modalbg.style.display = "none";
}

/**
 * Permet de récupérer la valeur du radiobutton checké
 * @param name Nom des radiobutton
 * @returns Retourne la valeur du radiobutton sélectionné
 */
const displayRadioValue = (name) => {
  let element = document.getElementsByName(name);

  for (i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i].value;
    }
  }
}

/**
 * Effacer les messages d'erreurs précédent
 */
const deleteErrorsMessages = (errorId) => {

  errorId.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = "";
    }
  });
}

/**
 * Permet de vérifier les champs
 * @param element L'élément à vérifier
 * @param errorId L'ID du span correspondant
 */
const isFieldValid = (element, errorId) => {
  let isValid = true;
  let errorMessage = '';

  switch (element.id) {
    case 'first':
      if (element.value.trim().length < 2) {
        errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
        isValid = false;
      }
      break;
    case 'last':
      if (element.value.trim().length < 2) {
        errorMessage = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        isValid = false;
      }
      break;
    case 'email':
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(element.value)) {
        errorMessage = "Veuillez entrer une adresse email valide.";
        isValid = false;
      }
      break;
    case 'birthdate':
      if (element.value === "") {
        errorMessage = "Vous devez entrer votre date de naissance.";
        isValid = false;
      }
      break;
    case 'quantity':
      if (element.value === "" || element.value < 0 || element.value > 99) {
        errorMessage = "Veuillez entrer une quantité valide (0-99).";
        isValid = false;
      }
      break;
    default:
      break;
  }

  document.getElementById(errorId).textContent = errorMessage;
  return isValid;
};

/**
 * Permet de verifier si le champs est valide lors du blur
 * @param fileds tableau de champs de type [nom-element, nom-erreur]
 */
const isFieldValidWhenBlur = (fields) => {
  fields.forEach((field) => {
    const element = document.getElementById(field.elementId);
    element.addEventListener("blur", () => isFieldValid(element, field.errorId));
  })
}

isFieldValidWhenBlur(fields);

/**
 * Permet de verifier si tous les requis sont bien remplis, puis retourne la liste des valeurs
 * @param event Récupération de l'evenement au clic
 */
const validate = (event) => {

  event.preventDefault();

  let isValid = true;

  deleteErrorsMessages(listOfElementForErrorsMessages);

  fields.forEach((field) => {
    const element = document.getElementById(field.elementId);
    isValid = isFieldValid(element, field.errorId) && isValid
  });

  if (!checkbox1.checked) {
    document.getElementById("conditions-error").textContent = "Veuillez accepter les conditions d'utilisation.";
    isValid = false;
  }

  let locationValue = displayRadioValue("location");

  if (!locationValue) {
    document.getElementById("location-error").textContent = "Veuillez sélectionner une ville.";
    isValid = false;
  }

  if (isValid) {
    deleteErrorsMessages(listOfElementForErrorsMessages);
    form.style.display = "none";
    validDiv.style.display = "flex";
    console.log("Données valides: ", firstName.value, lastName.value, email.value, birthdate.value, quantity.value, locationValue, checkbox1.checked);
  }
}





