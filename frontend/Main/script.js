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
