let cards = document.querySelectorAll(".card");
let play = document.getElementById("play");
let won = document.getElementById("won");
let cont = document.getElementById("game");
let show = document.getElementById("show");
let tabcolor = [];

let cardwin = 0;
show.onclick = () => {
  cards.forEach((card) => {
    card.style.backgroundColor = "";
    setTimeout(() => {
      card.style.backgroundColor = "black";
    }, 500);
  });
};
cards.forEach((card) => {
  flipcard();

  card.style.backgroundColor = "black";
  play.style.display = "none";

  card.addEventListener("click", () => {
    if (tabcolor.length === 2) {
      return;
    }
    if (
      card.style.backgroundColor === "black" &&
      !card.classList.contains("move")
    ) {
      card.style.backgroundColor = "";
      card.classList.remove("flipback");
      card.classList.add("flip");
      tabcolor.push(card);
      var backgroundColor1 = getComputedStyle(tabcolor[0]).backgroundColor;
      var backgroundColor2 = getComputedStyle(tabcolor[1]).backgroundColor;
      if (backgroundColor1 === backgroundColor2) {
        tabcolor = [];
        cardwin++;
        console.log(cardwin);
      } else {
        setTimeout(() => {
          tabcolor.forEach((card) => {
            card.classList.add("move");
          });
          setTimeout(() => {
            tabcolor.forEach((card) => {
              card.style.backgroundColor = "black";
              card.classList.remove("flip", "move");
              card.classList.add("flipback");
            });
            tabcolor = [];
          }, 500);
        }, 500);
      }
    }
    back();
  });
});
function back() {
  if (cardwin === 8) {
    setTimeout(() => {
      cards.forEach((card) => {
        card.style.backgroundColor = "black";
        card.classList.remove("flip", "move");
        card.classList.add("flipback");
        cont.style.display = "none";
        won.style.display = "block";
        play.style.display = "block";
      });
      cardwin = 0;
    }, 1000);
  }
}
function flipcard() {
  let tabco = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  tabco.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, i) => {
    card.setAttribute("data-card", tabco[i]);
  });
}

play.addEventListener("click", () => {
  cards.forEach((card) => {
    card.style.backgroundColor = "black";
    card.classList.remove("flip", "move");
    card.classList.add("flipback");
    cont.style.display = "block";
    won.style.display = "none";
  });
  flipcard();
});
