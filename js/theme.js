// Theme management

export function initTheme(themeIcon) {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeIcon.textContent = "☀️";
    }
}

export function loadRememberedUser(username, rememberMeCheckbox) {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe === "true" && savedUsername) {
        username.value = savedUsername;
        rememberMeCheckbox.checked = true;
    }
}

export function toggleTheme(themeIcon, eyes) {
    document.body.classList.toggle("dark-theme");

    // Character blink reaction
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.add("blink");
    }

    setTimeout(() => {
        for (let i = 0; i < eyes.length; i++) {
            eyes[i].classList.remove("blink");
        }
    }, 300);

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}
