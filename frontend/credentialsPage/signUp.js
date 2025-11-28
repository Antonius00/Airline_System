// First Name and Last Name:
// Must contain letters only (no numbers or special characters)

// declare both const values
const regForm = document.getElementById("signUpForm");

// ------ Core Validation for First and Last name --------------------- //
const FnInput = document.getElementById("firstName");
const LnInput = document.getElementById("lastName");
const FirstNameError = document.getElementById("FnError");
const LastNameError = document.getElementById("LnError");
const letterOnlyPattern = /^[a-zA-Z]+$/;

function ValidateFirstName() {
  const FirstNameValue = FnInput.value.trim();
  // The if/else statement performs the check
  if (letterOnlyPattern.test(FirstNameValue)) {
    // Validation PASSED
    FirstNameError.textContent = ""; // Clear any previous error message
    FnInput.style.borderColor = "green"; // Optional: Visual feedback
    return true; // Indicate success
  } else {
    // Validation FAILED
    FnError.textContent =
      "Must contain letters only (no numbers or special characters)";
    FnInput.style.borderColor = "red"; // Optional: Visual feedback
    return false; // Indicate failure
  }
}

function ValidateLastName() {
  const LastNameValue = LnInput.value.trim();
  // The if/else statement performs the check
  if (letterOnlyPattern.test(LastNameValue)) {
    // Validation PASSED
    LastNameError.textContent = ""; // Clear any previous error message
    LnInput.style.borderColor = "green"; // Optional: Visual feedback
    return true; // Indicate success
  } else {
    // Validation FAILED
    LnError.textContent =
      "Must contain letters only (no numbers or special characters)";
    LnInput.style.borderColor = "red"; // Optional: Visual feedback
    return false; // Indicate failure
  }
}

FnInput.addEventListener("input", ValidateFirstName);
LnInput.addEventListener("input", ValidateLastName);
// --------------------------------------------------------------------  //

// this is where i will validate the email i submit is correct and
// meets the requirements for an email
// --------- Core validation for email ------------------------------//
const emailInput = document.getElementById("email");
const emailError = document.getElementById("EmailError");
const emailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ValidateEmail() {
  let isValid = true;
  const emailValue = emailInput.value;
  if (emailformat.test(emailValue)) {
    emailError.textContent = "";
    emailInput.style.borderBlockColor = "green";
  } else {
    emailError.innerHTML =
      "Email needs to be in this format 'example123@gmail.com' ";
    isValid = false;
  }
}
emailInput.addEventListener("input", ValidateEmail);
// --------------------------------------------------------------------- //

// Password Validation:
// Password and Confirm Password must match
// Minimum length: 10 characters

// Password Strength Rule:
// Password must include:
// At least one uppercase letter
// At least one special character
// (Use Regular Expression for this)

// ------ Core Validation for Password and Conf. Password ----- //
const PasswordInput = document.getElementById("password");
const ConfirmPasswordInput = document.getElementById("confirmPassword");
const passwordError = document.getElementById("PasswordError");
const confirmpasswordError = document.getElementById("ConfirmPasswordError");
const passwordpattern = /[A-Z !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/;
function ValidatePassword() {
  let isValid = true;
  const passwordValue = PasswordInput.value;
  // The if/else statement performs the check
  if (passwordValue.length >= 10 && passwordpattern.test(passwordValue)) {
    // Validation PASSED
    passwordError.textContent = ""; // Clear any previous error message
    PasswordInput.style.borderColor = "green"; // Optional: Visual feedback
  } else {
    // Validation FAILED
    passwordError.innerHTML = `<ul>
        <li>Password must contain minimum length: 10 characters.</li>
        <li>Password must contain at least one uppercase letter.</li>
        <li>Password must contain at least one special character.</li>
    </ul>`;
    PasswordInput.style.borderColor = "red"; // Optional: Visual feedback
    isValid = false; // Indicate failure
  }

  const confirmPasswordValue = ConfirmPasswordInput.value;
  // The if/else statement performs the check
  if (confirmPasswordValue === passwordValue) {
    // Validation PASSED
    confirmpasswordError.textContent = ""; // Clear any previous error message
    ConfirmPasswordInput.style.borderColor = "green"; // Optional: Visual feedback
  } else {
    // Validation FAILED
    confirmpasswordError.textContent =
      "Password and Confirm Password must match.";
    ConfirmPasswordInput.style.borderColor = "red"; // Optional: Visual feedback
    isValid = false;
  }

  return isValid;
}
PasswordInput.addEventListener("input", ValidatePassword);
ConfirmPasswordInput.addEventListener("input", ValidatePassword);

// ---------------------------------------------------- //

// ---------- Core Fetch to SignUp ----------------------//
const errorBox = document.getElementById("errorMessage");
regForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const userName = document.getElementById("userName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const password = document.getElementById("password").value.trim();

  const body = { email, userName, firstName, lastName, password };
  const res = await fetch("http://localhost:3000/auth/signup", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  try {
    if (res.ok) {
      errorBox.style.color = "green";
      errorBox.textContent =
        "Account created successfully! Redirecting to login...";
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      const data = await res.json().catch(() => ({}));
      errorBox.textContent =
        data.error === "duplicate"
          ? "Email or username already taken."
          : data.error || "Sign up Failed";
    }
  } catch (err) {
    console.error(err);
    errorBox.textContent = "Network error. Please try again.";
  }
});
