// ==================================================
// GET ELEMENTS
// ==================================================

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const navLinks = document.querySelectorAll(".nav-link");


// ==================================================
// HAMBURGER MENU
// ==================================================

menuToggle.addEventListener("click", function () {

    const isOpen = sidebar.classList.toggle("open");

    menuToggle.classList.toggle("active");

    overlay.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    } else {
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

});


// ==================================================
// CLOSE SIDEBAR
// ==================================================

function closeSidebar() {

    sidebar.classList.remove("open");

    menuToggle.classList.remove("active");

    overlay.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


// ==================================================
// CLOSE WHEN CLICKING OVERLAY
// ==================================================

overlay.addEventListener("click", function () {

    closeSidebar();

});


// ==================================================
// CLOSE MENU AFTER CLICKING NAVIGATION
// ==================================================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        closeSidebar();

        // Remove active class from all links
        navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
        });

        // Add active class to selected link
        this.classList.add("active");

    });

});


// ==================================================
// DARK / LIGHT MODE
// ==================================================

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        themeIcon.textContent = "☀";

        themeText.textContent = "Light Mode";

        localStorage.setItem("theme", "light");

    } else {

        themeIcon.textContent = "☾";

        themeText.textContent = "Dark Mode";

        localStorage.setItem("theme", "dark");

    }

});


// ==================================================
// LOAD SAVED THEME
// ==================================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeIcon.textContent = "☀";

    themeText.textContent = "Light Mode";

} else {

    document.body.classList.remove("light-mode");

    themeIcon.textContent = "☾";

    themeText.textContent = "Dark Mode";

}

// ================================
// EMAILJS CONTACT FORM
// ================================

//emailjs.init({
  //  publicKey: "CXPSUE3fIJ4LMbp7w"
//});

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "CXPSUE3fIJ4LMbp7w"
    });

} else {

    console.error("EmailJS SDK did not load.");

}

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const contactTime = document.getElementById("contact-time");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Add the current date and time
        contactTime.value = new Date().toLocaleString();

        const submitButton = contactForm.querySelector(".contact-submit");

        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span>Sending...</span>
            <span>⏳</span>
        `;

        contactStatus.textContent = "";
        contactStatus.className = "contact-status";

        emailjs.sendForm(
            "service_74euskt",
            "template_7gprvxo",
            contactForm
        )
        .then(function () {

            contactStatus.textContent =
    "Message sent successfully! I'll get back to you soon.";

contactStatus.className =
    "contact-status success";

contactForm.reset();

setTimeout(function () {
    contactStatus.textContent = "";
    contactStatus.className = "contact-status";
}, 2000);

        })
        .catch(function (error) {

            console.error("EmailJS Error:", error);

            contactStatus.textContent =
                "Something went wrong. Please try again.";

            contactStatus.className =
                "contact-status error";

        })
        .finally(function () {

            submitButton.disabled = false;

            submitButton.innerHTML = `
                <span>Send Message</span>
                <span>→</span>
            `;

        });

    });
  }

