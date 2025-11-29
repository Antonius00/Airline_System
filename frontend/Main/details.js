const form = document.getElementById("flight-details-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const depart = document.getElementById("depart").value;
  const ret = document.getElementById("return").value;

  console.log({ from, to, depart, returnDate: ret });
});
