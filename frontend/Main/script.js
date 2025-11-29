// this initializes detial button
const details = document.querySelectorAll(".navCenter");

details.forEach((btn) => {
  btn.addEventListener("click", () => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
      return;
    }
    window.location.href = "/details";
  });
});

const cardTrack = document.querySelector(".cardTrack");
const moveLeft = document.querySelector(".arrow-button.left-arrow");
const moveRight = document.querySelector(".arrow-button.right-arrow");
const cards = document.querySelectorAll(".midCard");

let currentIndex = 0;
const cardsPerPage = 4; // must match calc(100% / 3)

function CardSlider() {
  const offset = -(currentIndex * 100);
  cardTrack.style.transform = `translateX(${offset}%)`;
}

moveRight.addEventListener("click", () => {
  if (currentIndex < cards.length - cardsPerPage) {
    currentIndex++;
    CardSlider();
  }
});

moveLeft.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    CardSlider();
  }
});

CardSlider();
