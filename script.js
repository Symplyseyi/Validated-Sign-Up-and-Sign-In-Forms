const form = document.getElementById("form");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const button = document.getElementById("button");
const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPassworderror = document.getElementById("confirmPasswordError");
const formMSG = document.getElementById("formMsg");
const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");
const r4 = document.getElementById("r4");
const r5 = document.getElementById("r5");
const togglePassword = document.getElementById("toggle-password");
const toggleConfirmPassword = document.getElementById(
  "toggle-confirm-password",
);

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

// Word Helper Function
function hasAtLeastTwoWords(text) {
  let i = 0;
  let wordCount = 0;
  let inWord = false;

  while (i < text.length) {
    let letter = text[i];
    if (letter !== " " && !inWord) {
      wordCount++;
      inWord = true;
    }

    if (text[i] === " ") {
      inWord = false;
    }

    i++;
  }

  return wordCount >= 2;
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

// Name Validation
function validateName() {
  let fullnameValue = fullnameInput.value.trim();

  // Rule 1: At least 3 characters
  if (fullnameValue.length < 3) {
    fullnameError.textContent = "Must be at least 3 characters";
    fullnameInput.className = "invalid";
    return false;
  }

  // Rule 2: No numbers allowed
  if (hasNumber(fullnameValue)) {
    fullnameError.textContent = "Name must not contain numbers";
    fullnameInput.className = "invalid";
    return false;
  }

  // Rule 3: At least 2 words
  if (!hasAtLeastTwoWords(fullnameValue)) {
    fullnameError.textContent = "Please enter first and last name";
    fullnameInput.className = "invalid";
    return false;
  }

  // Passed all validations
  fullnameError.textContent = "";
  fullnameInput.className = "valid";

  return true;
}

// Email Validation
function validateEmail() {
  let emailValue = emailInput.value.trim();

  // Rule 1: Field must not be empty
  if (emailValue === "") {
    emailError.textContent = "This field must not be empty";
    emailInput.className = "invalid";
    return false;
  }

  // Must be a valid Email
  if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
    emailError.textContent = "Enter a valid email";
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

  // Rule 2: At least 1 Uppercase letter
  if (hasUppercase(passwordValue)) {
    r2.className = "req ok";
  } else {
    r2.className = "req";
  }

  // Rule 3: At least 1 Lowercase letter
  if (hasLowercase(passwordValue)) {
    r3.className = "req ok";
  } else {
    r3.className = "req";
  }

  //   Rule 4: At least 1 number
  if (hasNumber(passwordValue)) {
    r4.className = "req ok";
  } else {
    r4.className = "req";
  }

  // Rule 5: At least 1 special character (!@#$%^&* etc.)
  if (hasSpecialCharacter(passwordValue)) {
    r5.className = "req ok";
  } else {
    r5.className = "req";
  }
}

// Toggle Event listeners
togglePassword.addEventListener("click", () => {
  toggleVisibility(passwordInput, togglePassword);
});

toggleConfirmPassword.addEventListener("click", () => {
  toggleVisibility(confirmPasswordInput, toggleConfirmPassword);
});

// Confirm Password Validation
function validateConfirmPassword() {
  let passwordValue = passwordInput.value.trim();
  let confirmPasswordValue = confirmPasswordInput.value.trim();

  // Field should not be Empty
  if (confirmPasswordValue === "") {
    confirmPassworderror.textContent = "";
    confirmPasswordInput.className = "";
    return false;
  }

  // Passwords must match
  if (confirmPasswordValue !== passwordValue) {
    confirmPassworderror.textContent = "Passwords do not match";
    confirmPasswordInput.className = "invalid";
    return false;
  }

  // Passed all validations
  confirmPassworderror.textContent = "";
  confirmPasswordInput.className = "valid";

  return true;
}

//Enable Button
function canEnableButton() {
  let isFullnameValid = validateName();
  let isEmailValid = validateEmail();

  let passwordValue = passwordInput.value.trim();
  let isPasswordValid =
    passwordValue.length >= 8 &&
    hasUppercase(passwordValue) &&
    hasLowercase(passwordValue) &&
    hasNumber(passwordValue) &&
    hasSpecialCharacter(passwordValue);

  let isConfirmPasswordValid = validateConfirmPassword();

  button.disabled = !(
    isFullnameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  );
}

fullnameInput.addEventListener("input", () => {
  validateName();
  canEnableButton();
});

emailInput.addEventListener("input", () => {
  validateEmail();
  canEnableButton();
});

passwordInput.addEventListener("input", () => {
  validatePassword();
  canEnableButton();
});

confirmPasswordInput.addEventListener("input", () => {
  validateConfirmPassword();
  canEnableButton();
});
