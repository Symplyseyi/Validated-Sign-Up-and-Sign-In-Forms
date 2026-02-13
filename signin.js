const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const button = document.getElementById("button");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMSG = document.getElementById("formMsg");
const togglePassword = document.getElementById("toggle-password");

// Number Helper Function
function hasNumber(text) {
  let i = 0;

  while (i < text.length) {
    let letter = text[i];

    if (letter >= "0" && letter <= "9") {
      return true;
    }
    i++;
  }
  return false;
}

// Uppercase Helper Function
function hasUppercase(password) {
  if (password.toLowerCase() !== password) {
    return true;
  } else {
    return false;
  }
}

// Lowercase Helper Function
function hasLowercase(password) {
  if (password.toUpperCase() !== password) {
    return true;
  } else {
    return false;
  }
}

// Generic Toggle Function
function toggleVisibility(inputField, toggleIcon) {
  if (inputField.type === "password") {
    inputField.type = "text";
    toggleIcon.textContent = "visibility_off";
  } else {
    inputField.type = "password";
    toggleIcon.textContent = "visibility";
  }
}

// Special Character Helper Function
function hasSpecialCharacter(text) {
  let i = 0;

  while (i < text.length) {
    let char = text[i];

    let isLowercase = char >= "a" && char <= "z";
    let isUppercase = char >= "A" && char <= "Z";
    let isNumber = char >= "0" && char <= "9";

    if (!isLowercase && !isUppercase && !isNumber) {
      return true;
    }
    i++;
  }
  return false;
}

// Email Validation
function validateEmail() {
  let emailValue = emailInput.value.trim();

  // Rule 1: Must be a valid Email
  if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
    emailError.textContent = "Enter a valid Email";
    emailInput.className = "invalid";
    return false;
  }

  //Rule 2: Must not be empty
  if (emailValue === "") {
    emailError.textContent = "This field can not be empty";
    emailInput.className = "invalid";
    return false;
  }

  // Passed all validations
  emailError.textContent = "";
  emailInput.className = "valid";

  return true;
}

// Password Validation
function validatePassword() {
  let passwordValue = passwordInput.value.trim();

  // Rule 1: At least 8 characters
  if (passwordValue.length >= 8) {
    r1.className = "req ok";
  } else {
    r1.className = "req";
  }

  // At least 1 Uppercase letter
  if (hasUppercase(passwordValue)) {
    r2.className = "req ok";
  } else {
    r2.className = "req";
  }

  // At least 1 Lowercase letter
  if (hasLowercase(passwordValue)) {
    r3.className = "req ok";
  } else {
    r3.className = "req";
  }

  // At least 1 Number
  if (hasNumber(passwordValue)) {
    r4.className = "req ok";
  } else {
    r4.className = "req";
  }

  // At least 1 Special character required
  if (hasSpecialCharacter(passwordValue)) {
    r5.className = "req ok";
  } else {
    r5.className = "req";
  }
}

togglePassword.addEventListener("click", () => {
  toggleVisibility(passwordInput, togglePassword);
});

//Enable Button
function canEnableButton() {
  let isEmailValid = validateEmail();

  let passwordValue = passwordInput.value.trim();
  let isPasswordValid =
    passwordValue.length >= 8 &&
    hasUppercase(passwordValue) &&
    hasLowercase(passwordValue) &&
    hasNumber(passwordValue) &&
    hasSpecialCharacter(passwordValue);

  button.disabled = !(isEmailValid && isPasswordValid);
}

emailInput.addEventListener("input", () => {
  validateEmail();
  canEnableButton();
});

passwordInput.addEventListener("input", () => {
  validatePassword();
  canEnableButton();
});

// Form Collection and Stora
const usersFormData = JSON.parse(localStorage.getItem("usersFormData")) || [];

form.addEventListener("submit", handlingFormData);
function handlingFormData(event) {
  event.preventDefault();

  let emailValue = emailInput.value.trim();
  let passwordValue = passwordInput.value.trim();

  let formData = {
    email: emailValue,
    password: passwordValue,
  };

  formMsg.textContent = "Account Login successfully";
  formMsg.textContent.className = "success";

  setTimeout(() => {
    formMsg.textContent = "";
    formMsg.className = "";
  }, 3000);

  usersFormData.push(formData);
  localStorage.setItem("usersFormData", JSON.stringify(usersFormData));
  form.reset();
  resetFormUI();
}

function resetFormUI() {
  // Remove input classes
  emailInput.className = "";
  passwordInput.className = "";

  // Clear errors
  emailError.textContent = "";

  // Reset password requirement indicators
  r1.className = "req";
  r2.className = "req";
  r3.className = "req";
  r4.className = "req";
  r5.className = "req";

  // Disable button again
  button.disabled = true;
}
