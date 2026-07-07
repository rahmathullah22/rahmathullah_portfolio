// ==========================================
// PREMIUM CURSOR
// ==========================================

const cursor = document.getElementById("cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function animateCursor() {

    const dx = mouseX - currentX;
    const dy = mouseY - currentY;

    currentX += dx * 0.12;
    currentY += dy * 0.12;

    const speed = Math.sqrt(dx * dx + dy * dy);

    const stretch = Math.min(speed * 0.03, 0.35);

    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    cursor.style.left = currentX + "px";
    cursor.style.top = currentY + "px";

    cursor.style.transform = `
        translate(-50%, -50%)
        rotate(${angle}deg)
        scaleX(${1 + stretch})
        scaleY(${1 - stretch})
    `;

    requestAnimationFrame(animateCursor);

}

animateCursor();
// ==========================================
// Cursor Hover Effect
// ==========================================

const hoverElements = document.querySelectorAll(
    "a, button, .main-btn, .control, .theme-btn"
);

function updateCursorTheme() {

    const styles = getComputedStyle(document.body);

    return {
        bg: styles.getPropertyValue("--cursor-bg").trim(),
        hover: styles.getPropertyValue("--cursor-hover").trim(),
        s1: styles.getPropertyValue("--cursor-shadow1").trim(),
        s2: styles.getPropertyValue("--cursor-shadow2").trim(),
        s3: styles.getPropertyValue("--cursor-shadow3").trim()
    };

}

hoverElements.forEach((item) => {

    item.addEventListener("mouseenter", () => {

        const theme = updateCursorTheme();

        cursor.style.width = "60px";
        cursor.style.height = "60px";

        cursor.style.borderRadius = "50%";

        cursor.style.background = theme.hover;

        cursor.style.boxShadow = `
            0 0 20px ${theme.s1},
            0 0 50px ${theme.s2},
            0 0 100px ${theme.s3}
        `;

    });

    item.addEventListener("mouseleave", () => {

        const theme = updateCursorTheme();

        cursor.style.width = "20px";
        cursor.style.height = "20px";

        cursor.style.background = theme.bg;

        cursor.style.boxShadow = `
            0 0 15px ${theme.s1},
            0 0 30px ${theme.s2},
            0 0 60px ${theme.s3}
        `;

    });

});

