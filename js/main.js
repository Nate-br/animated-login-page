// Main application logic
import * as Character from './character.js';
import * as Auth from './auth.js';
import * as Theme from './theme.js';

// DOM Elements
const eyes = document.getElementsByClassName("emoji-eye");
const pupils = document.getElementsByClassName("emoji-pupil");
const username = document.getElementById("login-form-username");
const password = document.getElementById("login-form-password");
const togglePasswordBtn = document.getElementById("toggle-password");
const loginButton = document.getElementById("login-button");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const rememberMeCheckbox = document.getElementById("remember-me");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const mouth = document.getElementById("emoji-mouth");
const whistleAudio = document.getElementById("whistle-audio");
const winkAudio = document.getElementById("wink-audio");
const rotationAudio = document.getElementById("rotation-audio");
const head = document.getElementById("emoji");

let isPasswordVisible = false;
let isMouseTracking = true;

// Initialize
window.addEventListener("DOMContentLoaded", function () {
    Character.setupAudio(whistleAudio, winkAudio, rotationAudio);
    Theme.initTheme(themeIcon);
    Theme.loadRememberedUser(username, rememberMeCheckbox);
});

// Username field events
username.addEventListener("keydown", function (e) {
    Character.follow(username, pupils);

    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        password.focus();
    }
});

username.addEventListener("blur", function () {
    Character.focus(pupils);
});

username.addEventListener("focus", function () {
    Character.follow(username, pupils);
});

username.addEventListener("input", function () {
    if (username.classList.contains("error")) {
        username.classList.remove("error");
        usernameError.classList.remove("show");
    }
});

// Password field events
password.addEventListener("focus", function () {
    Character.setWhistling(true);
    mouth.classList.remove('thinking', 'happy', 'sad');

    if (isPasswordVisible) {
        Character.followPassword(password, pupils);
    } else {
        Character.whisle(pupils, mouth, whistleAudio);
    }
});

password.addEventListener("blur", function () {
    Character.setWhistling(false);
    Character.removeWhistle(pupils, mouth);
    Character.focus(pupils);
    whistleAudio.pause();
});

password.addEventListener("input", function () {
    if (password.classList.contains("error")) {
        password.classList.remove("error");
        passwordError.classList.remove("show");
    }

    if (isPasswordVisible) {
        Character.followPassword(password, pupils);
    }
});

password.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        e.preventDefault();
        loginButton.click();
    }
});

// Toggle password visibility
togglePasswordBtn.addEventListener("click", function () {
    isPasswordVisible = !isPasswordVisible;

    if (isPasswordVisible) {
        password.type = "text";
        togglePasswordBtn.textContent = "Hide";

        if (document.activeElement === password) {
            whistleAudio.pause();
            Character.removeWhistle(pupils, mouth);
            Character.followPassword(password, pupils);
        }

        password.focus();
    } else {
        password.type = "password";
        togglePasswordBtn.textContent = "Show";

        if (document.activeElement === password) {
            Character.whisle(pupils, mouth, whistleAudio);
        }

        password.focus();
    }
});

// Login button
loginButton.addEventListener("click", function () {
    // Blur any focused input to clean up animations
    if (document.activeElement === password) {
        password.blur();
    }
    if (document.activeElement === username) {
        username.blur();
    }

    if (Auth.validateForm(username, password, usernameError, passwordError)) {
        loginButton.classList.add("loading");
        loginButton.disabled = true;

        Character.showThinkingFace(pupils, mouth);

        setTimeout(() => {
            Character.removeThinkingFace(pupils, mouth);

            if (Auth.checkCredentials(username, password)) {
                loginButton.classList.remove("loading");
                loginButton.disabled = false;
                head.classList.add("bounce");

                Character.showHappyFace(eyes, pupils, mouth);

                setTimeout(() => {
                    head.classList.remove("bounce");

                    Auth.saveRememberMe(rememberMeCheckbox, username);

                    alert("Login successful! Welcome!");

                    Character.removeHappyFace(eyes, pupils, mouth);
                }, 600);
            } else {
                loginButton.classList.remove("loading");
                loginButton.disabled = false;
                head.classList.add("shake");

                Character.showSadFace(eyes, pupils, mouth);

                passwordError.textContent = "Incorrect username or password";
                passwordError.classList.add("show");
                password.classList.add("error");

                setTimeout(() => {
                    head.classList.remove("shake");

                    setTimeout(() => {
                        Character.removeSadFace(eyes, pupils, mouth);
                    }, 2000);
                }, 500);
            }
        }, 1000);
    } else {
        head.classList.add("shake");
        loginButton.blur();
        setTimeout(() => {
            head.classList.remove("shake");
        }, 500);
    }
});

// Theme toggle
themeToggle.addEventListener("click", function () {
    Theme.toggleTheme(themeIcon, eyes);
});

// Mouse tracking
document.addEventListener("mousemove", function (e) {
    if (document.activeElement !== username &&
        document.activeElement !== password &&
        !Character.isWhistling &&
        isMouseTracking) {

        const emojiRect = head.getBoundingClientRect();
        const emojiCenterX = emojiRect.left + emojiRect.width / 2;
        const emojiCenterY = emojiRect.top + emojiRect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const deltaX = mouseX - emojiCenterX;
        const deltaY = mouseY - emojiCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 500) {
            const angle = Math.atan2(deltaY, deltaX);
            const maxMove = 12;

            const moveX = Math.cos(angle) * Math.min(distance / 40, maxMove);
            const moveY = Math.sin(angle) * Math.min(distance / 40, maxMove);

            for (let i = 0; i < pupils.length; i++) {
                if (!pupils[i].classList.contains('whistling') &&
                    !pupils[i].classList.contains('happy') &&
                    !pupils[i].classList.contains('sad') &&
                    !pupils[i].classList.contains('thinking')) {
                    const newLeft = Math.max(0, Math.min(21, 15 + moveX));
                    const newBottom = Math.max(0, Math.min(21, 10 - moveY));
                    pupils[i].style.left = newLeft + "px";
                    pupils[i].style.bottom = newBottom + "px";
                }
            }
        }
    }
});

// Idle animations
setInterval(function () {
    if (document.activeElement !== username &&
        document.activeElement !== password &&
        Math.round((Math.random() * 1) + 1) % 2) {
        Character.closeOpenEyes(pupils, eyes, winkAudio, head, loginButton);
    }
}, 3000);

setInterval(function () {
    if (document.activeElement !== username &&
        document.activeElement !== password &&
        Math.round((Math.random() * 1) + 1) % 2) {
        Character.rotate(head, rotationAudio);
    }
}, 5000);
