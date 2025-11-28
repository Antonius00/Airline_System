const form = document.getElementById("login");
const errorBox = document.getElementById("loginError");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const usernameOrEmail = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;

  if (!usernameOrEmail || !password) {
    errorBox.textContent = "Please enter both username/email and password.";
    return;
  }
  const body = { usernameOrEmail, password };

  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    const data = await res.json();
    sessionStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/";
  } else {
    const data = await res.json().catch(() => ({}));
    errorBox.textContent = data.error || "Login Failed.";
  }
});
