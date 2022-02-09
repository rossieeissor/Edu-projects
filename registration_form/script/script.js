document.querySelector("#signup-submit").onclick = function (event) {
  event.preventDefault();
  let nameDOM = document.querySelector("#signup-name");
  let passDOM = document.querySelector("#signup-pass");
  let emailDOM = document.querySelector("#signup-email");
  let birthdayDOM = document.querySelector("#signup-birthday");
  let name = document.querySelector("#signup-name").value;
  let pass = document.querySelector("#signup-pass").value;
  let email = document.querySelector("#signup-email").value;
  let birthday = document.querySelector("#signup-birthday").value;
  let sex = document.querySelector('input[name="sex"]:checked').value;

  if (nameDOM.classList.contains("invalid")) {
    M.toast({
      html: "Name may only contain from 3 to 10 alphabetical letters",
      classes: "red darken-4",
    });
  }

  if (passDOM.classList.contains("invalid")) {
    M.toast({
      html: "Password may only contain from 5 to 15 characters",
      classes: "red darken-4",
    });
  }

  if (emailDOM.classList.contains("invalid")) {
    M.toast({
      html: "Email is invalid",
      classes: "red darken-4",
    });
  }

  if (birthdayDOM.classList.contains("invalid")) {
    M.toast({
      html: 'Please enter a date in the "dd.mm.yyyy" format',
      classes: "red darken-4",
    });
  }

  let data = {
    name: name,
    pass: pass,
    email: email,
    birthday: birthday,
    sex: sex,
  };
  if (
    !nameDOM.classList.contains("invalid") &&
    !passDOM.classList.contains("invalid") &&
    !emailDOM.classList.contains("invalid") &&
    !birthdayDOM.classList.contains("invalid")
  ) {
    ajax("core/signup.php", "post", signup, data);
  } else {
    return false;
  }
};

function signup(result) {
  if (result == 1) {
    M.toast({ html: "Registered" });
    closeModal();
  } else if (result == "2") {
    M.toast({
      html: "All input fields must be filled!",
      classes: "red darken-4",
    });
  } else {
    M.toast({ html: "error" });
  }
}

document.querySelector("#login-submit").onclick = function (event) {
  event.preventDefault();
  let email = document.querySelector("#login-email").value;
  let pass = document.querySelector("#login-pass").value;
  let data = {
    email: email,
    pass: pass,
  };
  ajax("core/login.php", "post", login, data);
};

function login(result) {
  if (result == "2") {
    M.toast({
      html: "All input fields must be filled!",
      classes: "red darken-4",
    });
  } else if (result == "0") {
    M.toast({
      html: "Email or password is incorrect",
      classes: "red darken-4",
    });
  } else {
    let d = new Date();
    d.setTime(d.getTime() + 7 * 24 * 60 * 60 * 1000);
    let expires = d.toUTCString();
    document.cookie = `email=${result.email}; expires=${expires}; path=/`;
    location.assign("cabinet.php");
  }
}
