/* =============================================
   RAHMATHULLAH U — Portfolio JS
   Features: Particles, EmailJS, Animations,
             Form Validation, Loader
   =============================================

   ⚠️  EMAIL SETUP (Required for contact form):
   1. Sign up at https://www.emailjs.com/ (free)
   2. Create a Service (Gmail/Outlook etc.)
   3. Create an Email Template with these variables:
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Copy your Public Key from Account → API Keys
   5. Replace the three constants below:
*/

const EMAILJS_PUBLIC_KEY  = 'I-dFLzt38j1NyLGiC';   // ← Replace
const EMAILJS_SERVICE_ID  = 'service_mhomstv';   // ← Replace
const EMAILJS_TEMPLATE_ID = 'template_n66eqo5';  // ← Replace

(function () {
    'use strict';

    /* ---- Page Loader ---- */
    const loader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('loaded'), 600);
    });

    /* ---- EmailJS Init ---- */
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch(e) {
        console.warn('EmailJS not configured yet. Set your credentials in app.js');
    }

    /* ---- Navigation / Section Switching ---- */
    const controls = [...document.querySelectorAll('.control')];

    controls.forEach(btn => {
        btn.addEventListener('click', function () {
            const activeBtn = document.querySelector('.active-btn');
            if (activeBtn) activeBtn.classList.remove('active-btn');
            this.classList.add('active-btn');

            const activeSection = document.querySelector('.active');
            if (activeSection) activeSection.classList.remove('active');

            const target = document.getElementById(this.dataset.id);
            if (target) {
                target.classList.add('active');
                triggerRevealAnimations(target);
            }
        });
    });

    /* Public helper for in-page links */
    window.switchSection = function(id) {
        const btn = document.querySelector(`.control[data-id="${id}"]`);
        if (btn) btn.click();
    };

    /* Trigger on initial load for home section */
    triggerRevealAnimations(document.getElementById('home'));

    /* ---- Theme Toggle ---- */
    document.querySelector('.theme-btn').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    /* ---- Reveal Animations ---- */
    function triggerRevealAnimations(section) {
        if (!section) return;
        const items = section.querySelectorAll('.reveal-item');
        items.forEach((el, i) => {
            el.classList.remove('revealed');
            setTimeout(() => el.classList.add('revealed'), 80 + i * 90);
        });
    }

    /* ---- Neural Network Background Animation ---- */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const nodes = [];
const NODE_COUNT = 60;

class Node {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2.5 + 1;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.type = Math.random() > 0.7 ? 'hub' : 'node';
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        const glow = Math.sin(this.pulse) * 0.4 + 0.6;
        const r = this.type === 'hub' ? this.radius * 2 : this.radius;

        // Outer glow ring
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
        grad.addColorStop(0, `rgba(0, 198, 255, ${0.3 * glow})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = this.type === 'hub'
            ? `rgba(124, 58, 237, ${glow})`
            : `rgba(0, 198, 255, ${glow})`;
        ctx.fill();
    }
}

// Data packets traveling along edges
const packets = [];
class Packet {
    constructor(fromNode, toNode) {
        this.from = fromNode;
        this.to = toNode;
        this.progress = 0;
        this.speed = 0.008 + Math.random() * 0.012;
        this.color = Math.random() > 0.5 ? '0, 198, 255' : '124, 58, 237';
    }
    update() {
        this.progress += this.speed;
        return this.progress >= 1;
    }
    draw() {
        const x = this.from.x + (this.to.x - this.from.x) * this.progress;
        const y = this.from.y + (this.to.y - this.from.y) * this.progress;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.9)`;
        ctx.fill();

        // Trail
        const tx = this.from.x + (this.to.x - this.from.x) * Math.max(0, this.progress - 0.05);
        const ty = this.from.y + (this.to.y - this.from.y) * Math.max(0, this.progress - 0.05);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${this.color}, 0.4)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }
}

if (!isReducedMotion) {
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

    let frameCount = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frameCount++;

        // Draw edges between nearby nodes
        for (let a = 0; a < nodes.length; a++) {
            for (let b = a + 1; b < nodes.length; b++) {
                const dx = nodes[a].x - nodes[b].x;
                const dy = nodes[a].y - nodes[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 140;

                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.25;
                    // Gradient line
                    const grad = ctx.createLinearGradient(
                        nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y
                    );
                    grad.addColorStop(0, `rgba(0, 198, 255, ${alpha})`);
                    grad.addColorStop(1, `rgba(124, 58, 237, ${alpha})`);
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();

                    // Randomly spawn packets
                    if (frameCount % 90 === 0 && Math.random() > 0.97) {
                        packets.push(new Packet(nodes[a], nodes[b]));
                    }
                }
            }
        }

        // Update & draw packets
        for (let i = packets.length - 1; i >= 0; i--) {
            packets[i].draw();
            if (packets[i].update()) packets.splice(i, 1);
        }

        // Update & draw nodes
        nodes.forEach(n => { n.update(); n.draw(); });

        // Floating binary/data text
        if (frameCount % 180 === 0) {
            spawnDataText();
        }
        updateDataTexts();

        requestAnimationFrame(animate);
    }

    // Floating data labels
    const dataTexts = [];
    const dataWords = ['01', '10', 'ML', 'AI', 'SQL', '∑', 'df', 'λ', 'Σx', 'μ', 'σ', 'R²', '∇', 'GPU', 'ETL'];

    function spawnDataText() {
        dataTexts.push({
            text: dataWords[Math.floor(Math.random() * dataWords.length)],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            opacity: 0,
            life: 0,
            maxLife: 120,
            color: Math.random() > 0.5 ? '0,198,255' : '124,58,237'
        });
    }

    function updateDataTexts() {
        for (let i = dataTexts.length - 1; i >= 0; i--) {
            const t = dataTexts[i];
            t.life++;
            t.y -= 0.3;
            t.opacity = t.life < 30
                ? t.life / 30
                : t.life > 90
                    ? (t.maxLife - t.life) / 30
                    : 1;

            ctx.font = '11px monospace';
            ctx.fillStyle = `rgba(${t.color}, ${t.opacity * 0.35})`;
            ctx.fillText(t.text, t.x, t.y);

            if (t.life >= t.maxLife) dataTexts.splice(i, 1);
        }
    }

    animate();
}
    window.openDashboardPreview = function () {
        const lb = document.getElementById('lightboxOverlay');
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.closeDashboardPreview = function () {
        const lb = document.getElementById('lightboxOverlay');
        lb.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') window.closeDashboardPreview();
    });

    /* ---- Contact Form ---- */
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
        from_name:  { el: document.getElementById('from_name'),  err: document.getElementById('nameError')    },
        from_email: { el: document.getElementById('from_email'), err: document.getElementById('emailError')   },
        subject:    { el: document.getElementById('subject'),    err: document.getElementById('subjectError') },
        message:    { el: document.getElementById('message'),    err: document.getElementById('msgError')     },
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validate() {
        let valid = true;

        // Name
        if (!fields.from_name.el.value.trim()) {
            fields.from_name.err.textContent = 'Please enter your name.';
            valid = false;
        } else {
            fields.from_name.err.textContent = '';
        }

        // Email
        if (!fields.from_email.el.value.trim()) {
            fields.from_email.err.textContent = 'Please enter your email.';
            valid = false;
        } else if (!emailRegex.test(fields.from_email.el.value.trim())) {
            fields.from_email.err.textContent = 'Please enter a valid email address.';
            valid = false;
        } else {
            fields.from_email.err.textContent = '';
        }

        // Subject
        if (!fields.subject.el.value.trim()) {
            fields.subject.err.textContent = 'Please enter a subject.';
            valid = false;
        } else {
            fields.subject.err.textContent = '';
        }

        // Message
        if (!fields.message.el.value.trim() || fields.message.el.value.trim().length < 10) {
            fields.message.err.textContent = 'Message must be at least 10 characters.';
            valid = false;
        } else {
            fields.message.err.textContent = '';
        }

        return valid;
    }

    // Live validation
    Object.values(fields).forEach(f => {
        f.el.addEventListener('blur', validate);
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!validate()) return;

        const btn     = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');
        const status  = document.getElementById('formStatus');

        // Loading state
        btn.disabled = true;
        btn.classList.add('loading');
        btnText.textContent = 'Sending…';
        btnIcon.className = 'fas fa-spinner';
        status.className = 'form-status';
        status.textContent = '';

        // Basic anti-spam: honeypot approach (hidden field check handled server-side by EmailJS)
        if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
            // Demo mode - show instructions
            setTimeout(() => {
                status.className = 'form-status error';
                status.textContent = '⚠️ EmailJS not configured. Open app.js and set your EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID to activate this form.';
                resetBtn();
            }, 800);
            return;
        }

        try {
            const params = {
                from_name:  fields.from_name.el.value.trim(),
                from_email: fields.from_email.el.value.trim(),
                subject:    fields.subject.el.value.trim(),
                message:    fields.message.el.value.trim(),
                reply_to:   fields.from_email.el.value.trim(),
            };

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

            status.className = 'form-status success';
            status.textContent = '✅ Message sent! I\'ll get back to you soon.';
            form.reset();
            Object.values(fields).forEach(f => f.err.textContent = '');
        } catch (err) {
            console.error('EmailJS error:', err);
            status.className = 'form-status error';
            status.textContent = '❌ Something went wrong. Please email me directly at uprahmathullah2003@gmail.com';
        }

        resetBtn();

        function resetBtn() {
            btn.disabled = false;
            btn.classList.remove('loading');
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane';
        }
    });

})();
// ===============================
// Premium Smooth Cursor
// ===============================

const cursor = document.getElementById("cursor");

if (!cursor) {
    console.error("Cursor element not found!");
} else {

    let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

// Mouse Position
document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

// Smooth Animation
function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.09;
    cursorY += (mouseY - cursorY) * 0.09;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);

}

// Start Animation
animateCursor();


// ===============================
// Hover Effect
// ===============================

document.querySelectorAll("a, button, .control, .portfolio-item, .theme-btn").forEach((item) => {

    item.addEventListener("mouseenter", () => {

        cursor.style.width = "70px";
        cursor.style.height = "70px";
        cursor.style.opacity = "0.9";

    });

    item.addEventListener("mouseleave", () => {

        cursor.style.width = "34px";
        cursor.style.height = "34px";
        cursor.style.opacity = "1";

    });

});


// ===============================
// Click Animation
// ===============================

document.addEventListener("mousedown", () => {

    cursor.animate(

        [
            {
                transform: "translate(-50%, -50%) scale(1)"
            },
            {
                transform: "translate(-50%, -50%) scale(1.6)",
                opacity: 0.3
            },
            {
                transform: "translate(-50%, -50%) scale(1)"
            }
        ],

        {
            duration: 350
        }

    );

});

}
// ===============================
// Portfolio View Cursor
// ===============================

const cursorText = document.getElementById("cursorText");

document
    .querySelectorAll(".portfolio-item")
    .forEach((card) => {

        card.addEventListener("mouseenter", () => {

            cursor.style.width = "120px";
            cursor.style.height = "120px";
            cursor.style.borderRadius = "50%";

            cursorText.innerHTML = "VIEW";

        });

        card.addEventListener("mouseleave", () => {

            cursor.style.width = "34px";
            cursor.style.height = "34px";

            cursorText.innerHTML = "";

        });

    });
    // ===============================
// Magnetic Buttons
// ===============================

document
    .querySelectorAll(".main-btn, .control, .theme-btn")
    .forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.25}px, ${y * 0.25}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "translate(0px, 0px)";

        });

    });
    // ===============================
// Click Ripple Animation
// ===============================

document.addEventListener("mousedown", () => {

    cursor.animate(

        [
            {
                transform: "translate(-50%, -50%) scale(1)"
            },

            {
                transform: "translate(-50%, -50%) scale(1.7)",
                opacity: 0.3
            },

            {
                transform: "translate(-50%, -50%) scale(1)"
            }

        ],

        {
            duration: 400,
            easing: "ease-out"
        }

    );

});
// ===============================
// Premium 3D Tilt
// ===============================

document
    .querySelectorAll(".portfolio-item")
    .forEach((card) => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX =
                (y - rect.height / 2) / 15;

            const rotateY =
                (rect.width / 2 - x) / 15;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.04)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                scale(1)
            `;

        });

    });

