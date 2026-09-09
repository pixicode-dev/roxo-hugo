/* Gestion du formulaire de contact.
   `onSubmit` est le callback appelé par reCAPTCHA (data-callback du bouton),
   il doit rester une fonction globale. */

function contactStatusNode() {
  return document.getElementById("contact-form-status");
}

/* Écrit dans la région live #contact-form-status.
   Le message porte toujours un préfixe textuel : la couleur seule ne peut pas
   véhiculer l'information (RGAA 3.1). */
function setContactStatus(kind, message) {
  var status = contactStatusNode();
  if (!status) return;

  status.classList.remove("success", "error");
  status.classList.add(kind === "success" ? "success" : "error");
  status.textContent = (kind === "success" ? "Message envoyé : " : "Erreur : ") + message;
}

function success() {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");

  if (form) form.reset();
  setContactStatus("success", "merci pour votre message, nous reviendrons vers vous rapidement.");

  /* On garde le bouton actionnable : le désactiver retirerait du parcours de
     tabulation l'élément qui a le focus, qui serait alors renvoyé au <body>
     (RGAA 12.8). Le focus est déplacé sur le message pour qu'il soit lu. */
  if (button) button.disabled = false;

  var status = contactStatusNode();
  if (status) {
    status.setAttribute("tabindex", "-1");
    status.focus();
  }
}

function error() {
  setContactStatus("error", "un problème est survenu, votre message n'a pas été envoyé. Réessayez ou écrivez-nous à contact@pixicode.dev.");
}

function onSubmit(token) {
  var form = document.getElementById("contact-form");
  if (!form) return;

  if (!form.checkValidity()) {
    /* Les bulles natives ne sont pas toujours restituées : on double d'un
       message dans la région live et on amène le focus au premier champ
       fautif, plutôt que de laisser l'utilisateur chercher (RGAA 11.10). */
    var invalid = form.querySelector(":invalid");
    if (invalid) {
      invalid.setAttribute("aria-invalid", "true");
      var label = form.querySelector('label[for="' + invalid.id + '"]');
      setContactStatus(
        "error",
        "le champ « " + (label ? label.textContent.replace("*", "").trim() : invalid.name) + " » doit être renseigné."
      );
      invalid.focus();
    }
    form.reportValidity();
    return;
  }

  Array.from(form.elements).forEach(function (element) {
    element.removeAttribute("aria-invalid");
  });

  var data = {};

  Array.from(form.elements).forEach(function (element) {
    if (!element.id || !element.name) return;
    data[element.id] = element.type === "checkbox" ? element.checked : element.value;
  });

  data.token = token;

  fetch(form.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.status == 200) {
        success();
      } else {
        error();
      }
    })
    .catch(function () {
      error();
    });
}
