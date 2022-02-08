document.querySelector("#signup-submit").onclick = function (event) {
  event.preventDefault();
  let name = document.querySelector("#signup-name").value;
  let pass = document.querySelector("#signup-pass").value;
  let email = document.querySelector("#signup-email").value;
  let birthday = document.querySelector("#signup-birthday").value;
  let sex = document.querySelectorAll("[name=sex]");
  for (let i of sex) {
    if (i.checked) {
      sex = i.value;
      break;
    }
  }
  let data = {
    name: name,
    pass: pass,
    email: email,
    birthday: birthday,
    sex: sex,
  };
  ajax("core/signup.php", "post", signup, data);
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
