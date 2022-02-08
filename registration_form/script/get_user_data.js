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
  let name = document.querySelector("#update-name").value;
  let pass = document.querySelector("#update-pass").value;
  let birthday = document.querySelector("#update-birthday").value;
  let sex = document.querySelector('input[name="sex"]:checked').value;
  let data = {
    email: userEmail,
    name: name,
    pass: pass,
    birthday: birthday,
    sex: sex,
  };
  ajax("core/update_user_data.php", "post", updateUserData, data);
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
  let elems = document.querySelectorAll(".datepicker");
  let options = {
    format: "dd.mm.yyyy",
  };
  let instances = M.Datepicker.init(elems, options);
});

document.addEventListener("DOMContentLoaded", function () {
  const hasCharacterCounter = document.querySelectorAll(
    ".has-character-counter"
  );
  M.CharacterCounter.init(hasCharacterCounter);
});
