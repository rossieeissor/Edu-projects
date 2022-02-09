document.addEventListener("DOMContentLoaded", function () {
  const hasCharacterCounter = document.querySelectorAll(
    ".has-character-counter"
  );
  M.CharacterCounter.init(hasCharacterCounter);
});

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

document.querySelectorAll(".modal-show").forEach(function (element) {
  element.onclick = showModal;
});

document.querySelectorAll(".modal-core-close").forEach(function (element) {
  element.onclick = closeModal;
});

document.querySelectorAll(".modal-wrap").forEach(function (element) {
  element.onclick = closeModalWrap;
});

document.querySelectorAll(".back-terms").forEach(e =>
  e.addEventListener("click", function () {
    document.querySelector(".form-slider").style.marginLeft = "0px";
  })
);

document.querySelector(".read-terms").addEventListener("click", function () {
  document.querySelector(".form-slider").style.marginLeft = "-350px";
});

function showModal() {
  let modalId = this.dataset.modal;
  document.querySelector(modalId).classList.remove("hide");
  document.querySelector(modalId).parentElement.classList.remove("hide");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModal() {
  document.querySelectorAll(".modal-core").forEach(function (e) {
    e.classList.add("hide");
  });
  document.querySelectorAll(".modal-core").forEach(function (e) {
    e.parentElement.classList.add("hide");
  });
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal-wrap")
      .forEach(e => e.classList.add("hide"));
    document
      .querySelectorAll(".modal-core")
      .forEach(e => e.classList.add("hide"));
    document.removeEventListener("keydown", closeModalByEscape);
  }
}

function closeModalWrap(event) {
  if (event.target.className == "modal-wrap") {
    this.classList.add("hide");
    document.removeEventListener("keydown", closeModalByEscape);
  }
}
