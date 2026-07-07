// ======================================
// MAGNETIC BUTTON EFFECT
// ======================================

const magneticElements = document.querySelectorAll(
    ".main-btn, .control, .theme-btn"
);

magneticElements.forEach((element) => {

    element.addEventListener("mousemove", (e) => {

        const rect = element.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        element.style.transform = `
            translate(${x * 0.20}px, ${y * 0.20}px)
            scale(1.05)
        `;

        element.style.transition = "transform 0.15s ease";

    });

    element.addEventListener("mouseleave", () => {

        element.style.transform = "translate(0, 0) scale(1)";

        element.style.transition =
            "transform 0.35s cubic-bezier(.22,1,.36,1)";

    });

});
// ======================================
// Mouse Spotlight
// ======================================

const spotlight = document.querySelector(".spotlight");

document.addEventListener("mousemove", (e) => {

    spotlight.animate(

        {

            left: e.clientX + "px",
            top: e.clientY + "px"

        },

        {

            duration: 250,
            fill: "forwards"

        }

    );

});
const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(section=>{

observer.observe(section);

});