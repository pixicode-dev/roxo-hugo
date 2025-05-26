function success() {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  form.reset();
  button.disabled = "true ";
  status.innerHTML = "Merci ! Le formulaire de contact a été envoyé avec succès.";
  status.style.color = "green";
}

function error() {
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  status.innerHTML = "Oups! Un problème est survenu.";
  status.style.color = "red"; 
}

function onSubmit(token) {
  const form = document.getElementById('contact-form');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  data = {};

  Array.from(form.elements).forEach((element) => {
    if (!element.id || !element.name) return;
    data[element.id] = element.value;
  })

  data['token'] = token;

  fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then((response) => {
    console.log(response)
    if(response.status == 200){
      success()
    }else{
      error()
    }
    })
  .catch((response) => 
    error()
  );
}
