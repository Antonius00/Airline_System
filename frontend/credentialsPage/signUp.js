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

// Phone Number Format
// Validate the phone number using a Regular Expression
// Format must be: xxx-xxx-xxxx
// (Example: 123-456-7890)

// ---------- Phone Number Validation --------------------//

const validNumber = /^\d{3}-\d{3}-\d{4}$/;
const phoneNumberinput = document.getElementById("phone");
const phoneNumError = document.getElementById("phoneError");

function ValidatePhoneNumber() {
  let isValid = true;
  const number = phoneNumberinput.value;
  if (validNumber.test(number)) {
    phoneNumError.textContent = "";
    phoneNumberinput.style.border = "green";
  } else {
    phoneNumError.innerHTML = `<ul>
    <li>Phone number Format must be: xxx-xxx-xxxx.
    <li>(Example: 123-456-7890)
    </ul>
    `;
    isValid = false;
  }
  return isValid;
}
phoneNumberinput.addEventListener("input", ValidatePhoneNumber);
phoneNumError.addEventListener("input", ValidatePhoneNumber);
