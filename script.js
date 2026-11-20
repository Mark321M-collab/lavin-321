
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

const universe = document.querySelector(".universe");
const envelope = document.getElementById("envelope");
const particles = document.getElementById("love-particles");
const intro = document.getElementById("intro");
const clickText = document.getElementById("click-text");
const proposal = document.getElementById("proposal-screen");
const waitMessage = document.getElementById("wait-message");

const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const spiral = document.createElement("div");
spiral.className = "spiral-container";
universe.appendChild(spiral);

let stars = [];
let opened = false;
let endingStarted = false;

// =================================
// STAR BACKGROUND
// =================================

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.4,
        opacity: Math.random()
    }));

    if (spiral.style.display === "block") {
        positionSpiral();
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.opacity += (Math.random() - 0.5) * 0.025;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

// =================================
// HEART POSITION
// =================================

function heartPosition() {
    const scale = Math.min(
        canvas.width * 0.023,
        canvas.height * 0.019
    );

    const t = Math.random() * Math.PI * 2;
    const fill = Math.sqrt(Math.random());

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: canvas.width / 2 + x * scale * fill,
        y: canvas.height / 2 - y * scale * fill
    };
}

// =================================
// LOVE WORDS FORM HEART
// =================================

function createLoveWords() {
    const total = 650;
    const originX = canvas.width / 2;
    const originY = canvas.height * 0.55;

    for (let i = 0; i < total; i++) {
        const word = document.createElement("span");
        word.className = "love-word";
        word.textContent = "LOVE YOU";

        const target = heartPosition();

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() * 350;

        const scatterX = originX + Math.cos(angle) * distance;
        const scatterY = originY + Math.sin(angle) * distance;

        word.style.left = originX + "px";
        word.style.top = originY + "px";

        particles.appendChild(word);

        word.animate([
            {
                left: originX + "px",
                top: originY + "px",
                opacity: 0
            },
            {
                left: scatterX + "px",
                top: scatterY + "px",
                opacity: 1,
                offset: 0.32
            },
            {
                left: target.x + "px",
                top: target.y + "px",
                opacity: 1
            }
        ], {
            duration: 4000 + Math.random() * 1800,
            delay: Math.random() * 900,
            easing: "cubic-bezier(0.2, 0.7, 0.3, 1)",
            fill: "forwards"
        });
    }
}

// =================================
// SPIRAL POSITION
// =================================

function positionSpiral() {
    const scale = Math.min(
        canvas.width * 0.023,
        canvas.height * 0.019
    );

    const bottomX = canvas.width / 2;
    const bottomY = canvas.height / 2 + 17 * scale;

    spiral.style.left = `${bottomX}px`;
    spiral.style.top = `${bottomY}px`;
}

// =================================
// START ROMANTIC SPIRAL
// =================================

function startRomanticSpiral() {
    const romanticWords = [
        "FOREVER",
        "MY LOVE",
        "ONLY YOU",
        "MY HEART",
        "ALWAYS",
        "SWEETHEART",
        "I LOVE YOU",
        "MY WORLD",
        "MY ANGEL",
        "BE MINE"
    ];

    positionSpiral();
    spiral.innerHTML = "";

    for (let i = 0; i < 18; i++) {
        const word = document.createElement("span");

        word.className = "spiral-word";
        word.textContent = romanticWords[i % romanticWords.length];

        word.style.setProperty("--angle", `${i * 20}deg`);
        word.style.animationDelay = `${i * -0.16}s`;

        spiral.appendChild(word);
    }

    spiral.style.display = "block";
    spiral.style.opacity = "1";

    setTimeout(showWaitMessage, 5000);
}

// =================================
// WAIT LAVIN MESSAGE
// =================================

function showWaitMessage() {
    particles.style.opacity = "0";
    spiral.style.opacity = "0";

    setTimeout(() => {
        particles.style.display = "none";
        spiral.style.display = "none";

        waitMessage.style.display = "flex";

        requestAnimationFrame(() => {
            waitMessage.style.opacity = "1";
        });

        setTimeout(() => {
            waitMessage.style.opacity = "0";

            setTimeout(() => {
                waitMessage.style.display = "none";
                showProposal();
            }, 1000);

        }, 4000);

    }, 1500);
}

// =================================
// PROPOSAL SCREEN
// =================================

function showProposal() {
    proposal.style.display = "flex";

    requestAnimationFrame(() => {
        proposal.style.opacity = "1";
    });
}

// =================================
// NO BUTTON RUNS AWAY
// =================================

function moveNoButton() {
    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const margin = 20;

    const maxX = Math.max(
        margin,
        window.innerWidth - buttonWidth - margin
    );

    const maxY = Math.max(
        margin,
        window.innerHeight - buttonHeight - margin
    );

    const newX = margin + Math.random() * (maxX - margin);
    const newY = margin + Math.random() * (maxY - margin);

    noButton.style.position = "fixed";
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
    noButton.style.zIndex = "100";
}

noButton.addEventListener("pointerenter", moveNoButton);

noButton.addEventListener("pointerdown", event => {
    event.preventDefault();
    moveNoButton();
});

noButton.addEventListener("click", event => {
    event.preventDefault();
    moveNoButton();
});

// =================================
// CREATE ALIEN ENDING SCENE
// =================================

function createAlienEnding() {
    const scene = document.createElement("div");
    scene.className = "ending-screen";
    scene.id = "ending-screen";

    // Background planets
    const planets = ["🪐", "🌍", "🌕", "🔴", "🪐"];

    planets.forEach((planet, i) => {
        const item = document.createElement("div");

        item.textContent = planet;
        item.style.position = "absolute";
        item.style.left = `${8 + i * 20}%`;
        item.style.top = `${15 + Math.random() * 65}%`;
        item.style.fontSize = `${30 + Math.random() * 30}px`;
        item.style.filter = "drop-shadow(0 0 15px #987cff)";

        item.className = "ending-planet";
        scene.appendChild(item);
    });

    // Stars
    for (let i = 0; i < 65; i++) {
        const star = document.createElement("div");

        star.className = "ending-star";
        star.textContent = Math.random() > 0.5 ? "✦" : "·";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;

        scene.appendChild(star);
    }

    // Teenagers
    const boy = document.createElement("div");
    boy.className = "teenager teen-boy";
    boy.textContent = "👦🏻";

    const girl = document.createElement("div");
    girl.className = "teenager teen-girl";
    girl.textContent = "👧🏻";

    // Aliens
    const alienOne = document.createElement("div");
    alienOne.className = "alien alien-one";
    alienOne.textContent = "👽";

    const alienTwo = document.createElement("div");
    alienTwo.className = "alien alien-two";
    alienTwo.textContent = "👽";

    // Spaceship
    const ufo = document.createElement("div");
    ufo.className = "ufo";
    ufo.textContent = "🛸";

    // Tractor beam
    const beam = document.createElement("div");
    beam.className = "ufo-beam";

    scene.appendChild(boy);
    scene.appendChild(girl);
    scene.appendChild(alienOne);
    scene.appendChild(alienTwo);
    scene.appendChild(ufo);
    scene.appendChild(beam);

    universe.appendChild(scene);

    return {
        scene,
        boy,
        girl,
        alienOne,
        alienTwo,
        ufo,
        beam
    };
}

// =================================
// SMALL ANIMATION HELPER
// =================================

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// =================================
// ALIEN ABDUCTION STORY
// =================================

async function startAlienEnding() {
    if (endingStarted) return;

    endingStarted = true;

    // Hide proposal
    proposal.style.opacity = "0";

    await wait(1500);

    proposal.style.display = "none";

    // Create and reveal space scene
    const ending = createAlienEnding();

    ending.scene.style.display = "block";

    requestAnimationFrame(() => {
        ending.scene.style.opacity = "1";
    });

    await wait(1000);

    // Teenagers begin running around space
    const boyRun = ending.boy.animate([
        { transform: "translate(0, 0) rotate(0deg)" },
        { transform: "translate(100px, -60px) rotate(15deg)" },
        { transform: "translate(220px, 0) rotate(-15deg)" },
        { transform: "translate(350px, -90px) rotate(15deg)" },
        { transform: "translate(500px, 0) rotate(0deg)" }
    ], {
        duration: 4500,
        iterations: 1,
        fill: "forwards",
        easing: "ease-in-out"
    });

    const girlRun = ending.girl.animate([
        { transform: "translate(0, 0) rotate(0deg)" },
        { transform: "translate(-100px, -90px) rotate(-15deg)" },
        { transform: "translate(-220px, 0) rotate(15deg)" },
        { transform: "translate(-350px, -70px) rotate(-15deg)" },
        { transform: "translate(-500px, 0) rotate(0deg)" }
    ], {
        duration: 4500,
        iterations: 1,
        fill: "forwards",
        easing: "ease-in-out"
    });

    // Planets and stars follow their movement
    ending.scene.querySelectorAll(".ending-planet").forEach((planet, i) => {
        planet.animate([
            {
                transform: "translate(0, 0) rotate(0deg)"
            },
            {
                transform: `translate(${i % 2 ? -100 : 100}px, -80px) rotate(180deg)`
            },
            {
                transform: "translate(0, 0) rotate(360deg)"
            }
        ], {
            duration: 3000 + i * 250,
            iterations: 2,
            easing: "ease-in-out"
        });
    });

    await wait(2200);

    // UFO arrives
    ending.ufo.classList.add("arrive");

    await wait(2500);

    // Aliens approach
    ending.alienOne.animate([
        { transform: "translate(0, 0)" },
        { transform: "translate(100px, 180px)" }
    ], {
        duration: 1800,
        fill: "forwards"
    });

    ending.alienTwo.animate([
        { transform: "translate(0, 0)" },
        { transform: "translate(-100px, 180px)" }
    ], {
        duration: 1800,
        fill: "forwards"
    });

    await wait(1800);

    // Tractor beam catches the teenagers
    ending.beam.classList.add("active");

    await wait(700);

    ending.boy.classList.add("abducted");
    ending.girl.classList.add("abducted");

    await wait(3000);

    // Spaceship takes off
    ending.ufo.classList.add("depart");

    await wait(2500);

    // Everything disappears
    ending.scene.style.opacity = "0";

    await wait(1500);

    ending.scene.remove();

    // Return to original envelope
    universe.classList.add("final-state"); showFinalEnvelope();
}

// =================================
// FINAL ENVELOPE
// =================================

function showFinalEnvelope() {
    // Restore the original envelope
    envelope.classList.remove("open");
    envelope.style.opacity = "1";
    envelope.style.display = "block";

    // Keep the opening introduction hidden
    intro.style.display = "none";
    clickText.style.display = "none";

    // Create final message
    const finalMessage = document.createElement("div");
    finalMessage.className = "ending-message";
    finalMessage.style.display = "flex";

    finalMessage.innerHTML = `
        <h1>THAT WAS THE LETTER FOR YOU ❤️</h1>
        <p>WITH LOVE, MARK</p>
    `;

    universe.appendChild(finalMessage);

    requestAnimationFrame(() => {
        finalMessage.style.opacity = "1";
    });
}

// =================================
// YES BUTTON
// =================================

yesButton.addEventListener("click", startAlienEnding);

// =================================
// ENVELOPE OPENING
// =================================

envelope.addEventListener("click", () => {
    if (opened) return;

    opened = true;

    envelope.classList.add("open");
    clickText.style.opacity = "0";

    setTimeout(() => {
        intro.style.opacity = "0";
        envelope.style.opacity = "0";

        createLoveWords();

        setTimeout(startRomanticSpiral, 7000);

    }, 1300);
});

// =================================
// COSMIC SOUND SYSTEM
// =================================

let audioContext;
let ambientStarted = false;

function startCosmicSound() {
    if (ambientStarted) return;

    audioContext = new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

    audioContext.resume();
    ambientStarted = true;

    const master = audioContext.createGain();
    master.gain.value = 0.35;
    master.connect(audioContext.destination);

    [55, 82.4, 110].forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = [0.045, 0.018, 0.012][index];

        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start();
    });

    const melody = [220, 261.63, 329.63, 392, 329.63, 261.63];
    let note = 0;

    function playMelody() {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = melody[note];

        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.055,
            audioContext.currentTime + 0.4
        );
        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 2.5
        );

        oscillator.connect(gain);
        gain.connect(master);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2.6);

        note = (note + 1) % melody.length;
        setTimeout(playMelody, 1100);
    }

    playMelody();
}

envelope.addEventListener("click", startCosmicSound);

// =================================
// START
// =================================

window.addEventListener("resize", resize);

resize();
drawStars();
