window.addEventListener('scroll', function() {
    let hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = -window.scrollY * 0.5 + 'px';
});
// Show/Hide Back to Top Button
window.addEventListener("scroll", function () {
    let backToTop = document.getElementById("backToTop");
    if (window.scrollY > 300) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

// Smooth Scroll to Top
document.getElementById("backToTop").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const texts = ["a Developer", "a Designer", "a Freelancer"]; // Add more titles if needed
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function typeEffect() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.getElementById("typing").textContent = letter;

    if (letter.length === currentText.length) {
        setTimeout(() => eraseEffect(), 1000); // Wait before erasing
    } else {
        setTimeout(typeEffect, 100); // Typing speed
    }
}

function eraseEffect() {
    letter = currentText.slice(0, --index);
    document.getElementById("typing").textContent = letter;

    if (letter.length === 0) {
        count++;
        setTimeout(typeEffect, 500); // Pause before retyping
    } else {
        setTimeout(eraseEffect, 50); // Erasing speed
    }
}

// Start Typing Effect When Page Loads
document.addEventListener("DOMContentLoaded", typeEffect);



const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function changeActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").slice(1) === currentSection) {
            link.classList.add("active");
            link.className('.bg1'); // Ensure the active class is applied correctly
        }
    });
}

window.addEventListener("scroll", changeActiveNav);




document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function animateProgressBars() {
        progressBars.forEach((bar) => {
            const targetWidth = bar.getAttribute("data-width");
            bar.style.width = targetWidth;
        });
    }

    function resetProgressBars() {
        progressBars.forEach((bar) => {
            bar.style.width = "0%";
        });
    }

    function highlightNavbar() {
        let scrollPosition = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(".nav-link.active")?.classList.remove("active");
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add("active");

                // Trigger animation ONLY when in the "Skills" section
                if (sectionId === "resume") {
                    animateProgressBars();
                } else {
                    resetProgressBars();
                }
            }
        });
    }

    window.addEventListener("scroll", highlightNavbar);
});


document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default submission
    const form = this;

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Message sent successfully!");
            form.reset(); // Clear all fields
        } else {
            alert("Something went wrong. Please try again.");
        }
    }).catch(error => {
        alert("Error: " + error);
    });
});
