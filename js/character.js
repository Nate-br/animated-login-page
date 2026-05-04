// Character animation functions

// Audio setup
export function setupAudio(whistleAudio, winkAudio, rotationAudio) {
    whistleAudio.volume = 0.2;
    winkAudio.volume = 0.2;
    rotationAudio.volume = 0.2;
}

// Character state
export let isWhistling = false;

export function setWhistling(value) {
    isWhistling = value;
}

// Eye and pupil animations
export function focus(pupils) {
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].style.left = "15px";
        pupils[i].style.bottom = "10px";
    }
}

export function whistleEye(pupils) {
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].style.transition = 'none';
        pupils[i].style.left = "7px";
        pupils[i].style.bottom = "18px";
        pupils[i].offsetHeight; // Force reflow
        pupils[i].style.transition = '';
    }
}

export function follow(username, pupils) {
    var len = username.value.length;
    if (len > 50) len = 50;
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].style.left = 15 + (len / 10) + "px";
        pupils[i].style.bottom = 0 + "px";
    }
}

export function followPassword(password, pupils) {
    var len = password.value.length;
    if (len > 50) len = 50;
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].style.left = 15 + (len / 10) + "px";
        pupils[i].style.bottom = 0 + "px";
    }
}

// Whistling animation
export function whisle(pupils, mouth, whistleAudio) {
    whistleEye(pupils);

    // Remove any other mouth states first
    mouth.classList.remove('thinking', 'happy', 'sad');

    // Add whistle state
    mouth.classList.add('emoji-mouth-whistle');
    whistleAudio.play();

    // Add whistling animation to pupils
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.add('whistling');
    }
}

export function removeWhistle(pupils, mouth) {
    mouth.classList.remove('emoji-mouth-whistle');

    // Remove whistling animation from pupils
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove('whistling');
    }
}

// Eye blinking
export function closeEyes(pupils, eyes) {
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.add('emoji-pupil-closed');
    }
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.add('emoji-eye-closed');
    }
}

export function openEyes(pupils, eyes) {
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove('emoji-pupil-closed');
    }
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.remove('emoji-eye-closed');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function closeOpenEyes(pupils, eyes, winkAudio, head, loginButton) {
    // Don't blink if any animation is active or user is interacting
    if (head.classList.contains('bounce') ||
        head.classList.contains('shake') ||
        head.classList.contains('surprised') ||
        loginButton.classList.contains('loading')) {
        return;
    }

    closeEyes(pupils, eyes);
    await sleep(100);
    winkAudio.play();
    openEyes(pupils, eyes);
}

// Head rotation
let flag = 1;

export function rotate(head, rotationAudio) {
    if (flag) {
        head.style.transform = "rotate(360deg)";
        flag = 0;
    } else {
        head.style.transform = "rotate(-360deg)";
        flag = 1;
    }
    rotationAudio.play();
}

// Emotion animations
export function showHappyFace(eyes, pupils, mouth) {
    // Clean up any previous mouth states
    mouth.classList.remove('emoji-mouth-whistle', 'thinking', 'sad');

    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.remove('sad');
        eyes[i].classList.add("happy");
    }
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove('whistling', 'thinking', 'sad');
        pupils[i].classList.add("happy");
    }
    mouth.classList.add("happy");
}

export function removeHappyFace(eyes, pupils, mouth) {
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.remove("happy");
    }
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove("happy");
    }
    mouth.classList.remove("happy");
}

export function showSadFace(eyes, pupils, mouth) {
    // Clean up any previous mouth states
    mouth.classList.remove('emoji-mouth-whistle', 'thinking', 'happy');

    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.remove('happy');
        eyes[i].classList.add("sad");
    }
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove('whistling', 'thinking', 'happy');
        pupils[i].classList.add("sad");
    }
    mouth.classList.add("sad");
}

export function removeSadFace(eyes, pupils, mouth) {
    for (let i = 0; i < eyes.length; i++) {
        eyes[i].classList.remove("sad");
    }
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove("sad");
    }
    mouth.classList.remove("sad");
}

export function showThinkingFace(pupils, mouth) {
    // Clean up any previous mouth states
    mouth.classList.remove('emoji-mouth-whistle', 'happy', 'sad');

    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove('whistling', 'happy', 'sad');
        pupils[i].classList.add("thinking");
    }
    mouth.classList.add("thinking");
}

export function removeThinkingFace(pupils, mouth) {
    for (let i = 0; i < pupils.length; i++) {
        pupils[i].classList.remove("thinking");
    }
    mouth.classList.remove("thinking");
}
