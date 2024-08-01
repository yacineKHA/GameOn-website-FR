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
const iconMenu = document.querySelector('.icon');
const inscriptionForm = document.getElementById("inscription-form");
const closeButtons = document.querySelectorAll('.close-button');


const fields = [
  { elementId: "first", errorId: "first-error" },
  { elementId: "last", errorId: "last-error" },
  { elementId: "email", errorId: "email-error" },
  { elementId: "birthdate", errorId: "birthdate-error" },
  { elementId: "quantity", errorId: "quantity-error" },
  { elementId: "checkbox1", errorId: "conditions-error" },
  { elementId: "location", errorId: "location-error" }
];

// Liste des ID des span pour la suppression des messages d'erreurs
const listOfElementForErrorsMessages = fields.map(field => field.errorId);

// Liste des messages d'erreurs à afficher
const errorMessages = {
  first: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  last: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  email: "Veuillez entrer une adresse email valide.",
  birthdate: "Vous devez entrer votre date de naissance.",
  quantity: "Veuillez entrer une quantité valide (0-99).",
  checkbox1: "Veuillez accepter les conditions d'utilisation.",
  location: "Veuillez sélectionner une ville."
};  

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
 * Effacer les messages d'erreurs précédent
 * @param errorId ErrorId de suppression des 
 */
const deleteErrorsMessages = (errorsId) => {
  errorsId.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = "";
    }
  });
}


// Liste des validateurs
const validators = {
  first: value => value.trim().length >= 2,
  last: value => value.trim().length >= 2,
  email: value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
  birthdate: value => value !== "",
  quantity: value => value !== "" && value >= 0 && value <= 99,
  checkbox1: element => element.checked,
  location: () => displayRadioValue("location") !== null
};

/**
 * Permet de récupérer le radiobutton checké
 * @param name Nom des radiobutton
 * @returns Retourne le radiobutton sélectionné ou null
 */
const displayRadioValue = (name) => {
  let element = document.getElementsByName(name);

  for (i = 0; i < element.length; i++) {
    if (element[i].checked) {
      return element[i];
    }
  }
  return null;
}

/**
 * Permet de vérifier si les champs sont valide
 * @param element L'élément à vérifier
 * @param errorId L'ID du span correspondant
 */
const isFieldValid = (element, errorId) => {
  let validator;
  let isValid;

  if (!element || element.type === 'radio') {
    validator = validators["location"];
    isValid = validator();
  } else if (element.type === 'checkbox') {
    validator = validators[element.id];
    isValid = validator(element);
  } else {
    validator = validators[element.id];
    isValid = validator(element.value);
  }

  let errorMessage = isValid ? '' : errorMessages[element ? element.id : "location"] || '';
  document.getElementById(errorId).textContent = errorMessage;
  return isValid;
};

/**
 * Permet de verifier si le champs est valide lors du blur (lors de la perte de focus)
 * @param fields tableau de champs de type [nom-element, nom-erreur]
 */
const isFieldValidWhenBlur = (fields) => {
  fields.forEach((field) => {
    const element = document.getElementById(field.elementId);
    element.addEventListener("blur", () => isFieldValid(element, field.errorId));
  })
}

// filtre de la liste fields
const fieldsForBlur = fields.slice(0, 5);
isFieldValidWhenBlur(fieldsForBlur);

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
    if (field.elementId === "location") {
      isValid = isFieldValid(displayRadioValue("location"), field.errorId) && isValid
    } else {
      isValid = isFieldValid(element, field.errorId) && isValid
    }
  });

  if (isValid) {
    deleteErrorsMessages(listOfElementForErrorsMessages);
    form.style.display = "none";
    validDiv.style.display = "flex";
    const locationValue = displayRadioValue("location")?.value
    console.log("Données valides: ", firstName.value, lastName.value, email.value, birthdate.value, quantity.value, locationValue, checkbox1.checked);
  }
}

// Validation du formulaire.
inscriptionForm.addEventListener('submit', (event)=> validate(event));

// Bouttons de fermeture du formulaire.
closeButtons.forEach(function(button) {
  button.addEventListener('click', ()=> closeModal());
});

// Ouverture menu nav.
iconMenu.addEventListener('click', ()=> editNav());




