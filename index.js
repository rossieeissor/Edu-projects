const mobileMenu = document.querySelector("#menu-toggle");
const navbarMenu = document.querySelector(".navbar__menu");
const navbarLogo = document.querySelector("#navbar__logo");

const toggleMenu = () => {
  mobileMenu.classList.toggle("is-active");
  navbarMenu.classList.toggle("is-active");
};

mobileMenu.addEventListener("click", toggleMenu);

const tenzies = document.querySelector("#tenzies");
const quizzical = document.querySelector("#quizzical");

tenzies.addEventListener("click", () =>
  window.open("tenzies/build/index.html", "_blank")
);
quizzical.addEventListener("click", () =>
  window.open("quizzical/index.html", "_blank")
);

window.addEventListener("scroll", () => console.log(window.scrollY));

const highlightLink = () => {
  const hl = "highlight";
  const highlited = document.querySelector(".highlight");
  const introLink = document.querySelector("#intro-link");
  const jetGameLink = document.querySelector("#jet-game-link");
  const loginFormLink = document.querySelector("#login-form-link");
  let scrollPosition = window.scrollY;

  if (
    window.innerWidth > 960 &&
    window.innerWidth <= 1100 &&
    scrollPosition < 490
  ) {
    introLink.classList.add(hl);
    jetGameLink.classList.remove(hl);
    return;
  } else if (
    window.innerWidth > 960 &&
    window.innerWidth <= 1100 &&
    scrollPosition < 1600
  ) {
    jetGameLink.classList.add(hl);
    introLink.classList.remove(hl);
    loginFormLink.classList.remove(hl);
    return;
  } else if (
    window.innerWidth > 960 &&
    window.innerWidth <= 1100 &&
    scrollPosition < 2820
  ) {
    loginFormLink.classList.add(hl);
    jetGameLink.classList.remove(hl);
    introLink.classList.remove(hl);
    return;
  } else if (window.innerWidth > 1100 && scrollPosition < 499) {
    introLink.classList.add(hl);
    jetGameLink.classList.remove(hl);
    return;
  } else if (window.innerWidth > 1100 && scrollPosition < 1390) {
    jetGameLink.classList.add(hl);
    introLink.classList.remove(hl);
    loginFormLink.classList.remove(hl);
    return;
  } else if (window.innerWidth > 1100 && scrollPosition < 2100) {
    loginFormLink.classList.add(hl);
    jetGameLink.classList.remove(hl);
    introLink.classList.remove(hl);
    return;
  }

  if (highlited) {
    highlited.classList.remove(hl);
  }
};

window.addEventListener("scroll", highlightLink);
window.addEventListener("click", highlightLink);

const hideMobileMenu = () => {
  const activeElements = document.querySelectorAll(".is-active");
  console.log(activeElements);
  if (window.innerWidth <= 960 && activeElements) {
    activeElements.forEach(element => element.classList.remove("is-active"));
  }
};

navbarMenu.addEventListener("click", hideMobileMenu);
navbarLogo.addEventListener("click", hideMobileMenu);
