// Form validation and authentication logic

export function validateForm(username, password, usernameError, passwordError) {
    let isValid = true;

    // Clear previous errors
    usernameError.textContent = "";
    usernameError.classList.remove("show");
    username.classList.remove("error");

    passwordError.textContent = "";
    passwordError.classList.remove("show");
    password.classList.remove("error");

    // Validate username
    if (username.value.trim() === "") {
        usernameError.textContent = "Username is required";
        usernameError.classList.add("show");
        username.classList.add("error");
        isValid = false;
    }

    // Validate password
    if (password.value.trim() === "") {
        passwordError.textContent = "Password is required";
        passwordError.classList.add("show");
        password.classList.add("error");
        isValid = false;
    }

    return isValid;
}

export function checkCredentials(username, password) {
    // Check if credentials match (demo: admin/password)
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "admin" && passwordValue === "password") {
        return true;
    }
    return false;
}

export function saveRememberMe(rememberMeCheckbox, username) {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedUsername", username.value);
        localStorage.setItem("rememberMe", "true");
    } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberMe");
    }
}
