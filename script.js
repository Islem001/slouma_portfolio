
// ==========================
// 1. TYPING ANIMATION
// ==========================

const words = [
    "Networks & IoT Student",
    "Robotics Enthusiast",
    "Creative Developer",
    "A Girl in STEM ♡"
];

const typingText = document.getElementById("typingText");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function type() {

    const currentWord = words[wordIndex];

    if (deleting) {
        letterIndex--;
    } else {
        letterIndex++;
    }

    typingText.textContent =
        currentWord.substring(0, letterIndex);

    let speed = deleting ? 45 : 90;

    if (!deleting && letterIndex === currentWord.length) {

        speed = 1800;
        deleting = true;

    } else if (deleting && letterIndex === 0) {

        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 300;
    }

    setTimeout(type, speed);
}

if (!reducedMotion) {
    type();
}


// ==========================
// 2. DARK AND LIGHT MODE
// ==========================

const themeBtn = document.getElementById("themeBtn");

function updateThemeIcon() {

    if (document.body.classList.contains("dark")) {

        themeBtn.innerHTML =
            '<i class="fa-regular fa-sun"></i>';

        themeBtn.setAttribute("aria-label", "Use light mode");

    } else {

        themeBtn.innerHTML =
            '<i class="fa-regular fa-moon"></i>';

        themeBtn.setAttribute("aria-label", "Use dark mode");
    }
}

// Load saved theme

try {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

} catch (error) {
    // Continue if local storage is unavailable.
}

updateThemeIcon();

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    updateThemeIcon();

    const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        // Theme still works for the current visit.
    }
});


// ==========================
// 3. MOBILE MENU
// ==========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {

    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.innerHTML =
            '<i class="fa-solid fa-bars"></i>';
    });
});


// ==========================
// 4. SCROLL ANIMATIONS
// ==========================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reducedMotion) {

    document.body.classList.add("js");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.1
    });

    revealElements.forEach(function (element) {

        observer.observe(element);
    });
}


// ==========================
// 5. PROJECT FILTERS
// ==========================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {

    button.setAttribute(
        "aria-pressed",
        button.classList.contains("active")
    );

    button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        const filter = button.dataset.filter;

        projectCards.forEach(function (card) {

            if (filter === "all" ||
                card.dataset.category === filter) {

                card.hidden = false;
                card.classList.add("show");

            } else {

                card.hidden = true;
            }
        });
    });
});


// ==========================
// 6. PROJECT INFORMATION
// ==========================

const projects = {

    terrain: {

        title: "All-Terrain Robot",

        description:
            "An all-terrain mobile robot controlled remotely " +
            "using a smartphone or gamepad. The project combines " +
            "real-time wireless communication and differential " +
            "drive control to enable navigation on uneven surfaces.",

        technologies: [
            "ESP32",
            "BTS7960",
            "Wireless Communication",
            "Embedded Systems"
        ]
    },

    line: {

        title: "Line-Following Robot",

        description:
            "An autonomous robot capable of following a path " +
            "using QTR infrared sensors. It continuously analyzes " +
            "its position and corrects its trajectory using " +
            "closed-loop control.",

        technologies: [
            "Arduino Mega",
            "QTR Sensors",
            "L298N",
            "Closed-Loop Control"
        ]
    },

    distance: {

        title: "Distance Detection System",

        description:
            "A distance monitoring device that measures proximity " +
            "using an ultrasonic sensor, displays the measurements " +
            "on an LCD screen and activates visual and audible " +
            "alerts according to different distance thresholds.",

        technologies: [
            "Arduino Uno",
            "HC-SR04",
            "I2C LCD",
            "Sensor Integration"
        ]
    },

    alert: {

        title: "Alert System",

        description:
            "A directional detection system that scans the " +
            "environment using an ultrasonic sensor mounted on " +
            "a servo motor. The system identifies obstacles " +
            "and triggers alerts depending on their position.",

        technologies: [
            "Arduino Uno",
            "HC-SR04",
            "SG90 Servo Motor"
        ]
    },

    weather: {

        title: "IoT Weather Station",

        description:
            "A connected weather station designed to measure " +
            "temperature, humidity and atmospheric pressure. " +
            "Environmental data is displayed in real time and " +
            "transmitted wirelessly to a monitoring interface.",

        technologies: [
            "ESP32",
            "DHT22",
            "BMP280",
            "IoT"
        ]
    },

    smartbudget: {

        title: "SmartBudget",

        description:
            "An Android application currently being developed " +
            "to simplify personal budget and expense management. " +
            "The project focuses on creating an intuitive interface " +
            "and practical financial management features.",

        technologies: [
            "Java",
            "XML",
            "Android Studio"
        ]
    },

    cri: {

        title: "CRI Robotics Club Website",

        description:
            "A web development project for the ISIMM Robotics Club. " +
            "The website presents the club, its activities, events " +
            "and robotics projects.",

        technologies: [
            "HTML5",
            "CSS3",
            "Web Design"
        ]
    }
};


// ==========================
// 7. PROJECT POPUP
// ==========================

const modal = document.getElementById("projectModal");

const modalTitle = document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalTags = document.getElementById("modalTags");

const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".project-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        const project = projects[button.dataset.project];

        if (!project) {
            return;
        }

        modalTitle.textContent = project.title;

        modalDescription.textContent = project.description;

        modalTags.innerHTML = "";

        project.technologies.forEach(function (technology) {

            const tag = document.createElement("span");

            tag.textContent = technology;

            modalTags.appendChild(tag);
        });

        modal.showModal();
    });
});

closeModal.addEventListener("click", function () {

    modal.close();
});

modal.addEventListener("click", function (event) {

    if (event.target === modal) {
        modal.close();
    }
});


// ==========================
// 8. ACTIVE NAVIGATION
// ==========================

const navigationLinks =
    document.querySelectorAll(".nav-links a");

const navigationSections =
    document.querySelectorAll(
        "#home, #about, #education, #projects, " +
        "#skills, #experience, #contact"
    );

function updateNavigation() {

    let currentSection = "home";

    navigationSections.forEach(function (section) {

        const position = section.getBoundingClientRect().top;

        if (position <= 160) {

            currentSection = section.id;
        }
    });

    navigationLinks.forEach(function (link) {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentSection
        );
    });
}

window.addEventListener("scroll", updateNavigation);

updateNavigation();


// ==========================
// 9. BACK TO TOP
// ==========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    backToTop.classList.toggle(
        "visible",
        window.scrollY > 500
    );
});

backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });
});


// ==========================
// 10. PROFILE PICTURE
// ==========================

const profilePicture = document.querySelector(".photo-frame img");

profilePicture.addEventListener("error", function () {

    profilePicture.hidden = true;
});

if (profilePicture.complete &&
    profilePicture.naturalWidth === 0) {

    profilePicture.hidden = true;
}


// ==========================
// 11. COPYRIGHT YEAR
// ==========================

document.getElementById("year").textContent =
    new Date().getFullYear();
