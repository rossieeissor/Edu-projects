let userEmail = getCookie("email");

ajax("core/get_user_data.php", "post", getUserData, { email: userEmail });

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getUserData(result) {
  document.querySelector("#update-name").value = result.name;
  document.querySelector("#update-pass").value = result.password;
  document.querySelector("#update-birthday").value = result.birthday;
  document.querySelector(`input[value=${result.sex}]`).checked = true;
  M.updateTextFields();
}

document.querySelector("#update").onclick = function (event) {
  event.preventDefault();
  let nameDOM = document.querySelector("#update-name");
  let passDOM = document.querySelector("#update-pass");
  let birthdayDOM = document.querySelector("#update-birthday");
  let name = document.querySelector("#update-name").value;
  let pass = document.querySelector("#update-pass").value;
  let birthday = document.querySelector("#update-birthday").value;
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

  if (birthdayDOM.classList.contains("invalid")) {
    M.toast({
      html: 'Please enter a date in the "dd.mm.yyyy" format',
      classes: "red darken-4",
    });
  }

  let data = {
    email: userEmail,
    name: name,
    pass: pass,
    birthday: birthday,
    sex: sex,
  };
  if (
    !nameDOM.classList.contains("invalid") &&
    !passDOM.classList.contains("invalid") &&
    !birthdayDOM.classList.contains("invalid")
  ) {
    ajax("core/update_user_data.php", "post", updateUserData, data);
  } else {
    return false;
  }
};

function updateUserData(result) {
  if (result == 1) {
    M.toast({
      html: "Profile successfully updated!",
      classes: "green darken-1",
    });
    document.querySelector("#update").disabled = true;
  } else if (result == 2) {
    M.toast({
      html: "All input fields must be filled!",
      classes: "red darken-4",
    });
  } else {
    M.toast({ html: "Server error!" });
  }
}

document.querySelector("#edit").onclick = function () {
  document.querySelector("#update-name").disabled = false;
  document.querySelector("#update-name").disabled = false;
  document.querySelector("#update-pass").disabled = false;
  document.querySelector("#update-birthday").disabled = false;
  for (let node of document.querySelectorAll("input[name=sex]")) {
    node.disabled = false;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  let date = new Date();
  let customDate = new Date();
  customDate.setFullYear(date.getFullYear() - 5);
  let elems = document.querySelectorAll(".datepicker");
  let options = {
    format: "dd.mm.yyyy",
    yearRange: [1930, date.getFullYear()],
    maxDate: customDate,
    defaultDate: customDate,
  };
  let instances = M.Datepicker.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  const hasCharacterCounter = document.querySelectorAll(
    ".has-character-counter"
  );
  M.CharacterCounter.init(hasCharacterCounter);
});
