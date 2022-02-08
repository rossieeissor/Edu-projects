document.querySelector("#logout").onclick = function () {
  let c = document.cookie;
  const d = new Date();
  d.setTime(d.getTime() - 10 * 1000);
  let expires = d.toUTCString();
  document.cookie = `email=${c}; expires=${expires}; path=/`;
  location.reload();
};
