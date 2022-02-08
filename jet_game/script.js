const jet = document.querySelector("#jet");
const mountain = document.getElementById("mountain");
const startBtn = document.querySelector("#start");

const start = () => {
  setTimeout(() => {
    document.addEventListener("click", () => fly());
  }, 10);
  const fly = () => {
    jet.classList.add("fly");
    setTimeout(() => jet.classList.remove("fly"), 700);
  };

  mountain.classList.add("mountainApproach");
};

startBtn.onclick = start;

let fliesCount = 0;
setInterval(function () {
  let jetTop = parseInt(window.getComputedStyle(jet).getPropertyValue("top"));
  let mountainLeft = parseInt(
    window.getComputedStyle(mountain).getPropertyValue("left")
  );
  if (mountainLeft > -40 && mountainLeft < 30 && jetTop >= 80) {
    mountain.classList.remove("mountainApproach");
    alert(`Game Over!\nYou have flown over ${fliesCount} mountains!`);
    document.location.reload();
    fliesCount = 0;
  }
}, 10);

document.addEventListener("animationiteration", (event) => {
  if (event.animationName === "mountainApproach") {
    fliesCount++;
  }
});
