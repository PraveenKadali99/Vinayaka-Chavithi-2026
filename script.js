/* =====================================================
   VINAYAKA CHAVITHI 2026
   PREMIUM JAVASCRIPT & SCROLL FIXES
===================================================== */


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader =
            document.getElementById("loader");

        if (loader) {
            loader.classList.add("hide");
        }

    }, 1200);

});


/* =====================================================
   SAFE SCROLL PROGRESS (FIXED SCROLL STUCK ISSUE)
===================================================== */

window.addEventListener("scroll", () => {

    const scrollFill = document.getElementById("scrollFill");
    const navbar = document.getElementById("navbar");

    if (scrollFill) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (scrollHeight > 0) {
            const percentage = (scrollTop / scrollHeight) * 100;
            scrollFill.style.width = percentage + "%";
        }
    }

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

});


/* =====================================================
   FLOATING GLOBAL PARTICLES
===================================================== */

const particleContainer =
    document.getElementById("particles");

const particleEmojis = [
    "🌸",
    "🌺",
    "🌼",
    "✨",
    "🌟",
    "🍃",
    "✦"
];


if (particleContainer) {

    for (let i = 0; i < 18; i++) {

        const span =
            document.createElement("span");

        span.textContent =
            particleEmojis[
                Math.floor(
                    Math.random() *
                    particleEmojis.length
                )
            ];


        const size =
            14 + Math.random() * 14;

        const duration =
            9 + Math.random() * 8;

        const delay =
            Math.random() * 12;

        const left =
            Math.random() * 100;


        span.style.left =
            left + "vw";

        span.style.fontSize =
            size + "px";

        span.style.animationDuration =
            duration + "s";

        span.style.animationDelay =
            delay + "s";


        particleContainer.appendChild(
            span
        );

    }

}


/* =====================================================
   LANGUAGE SYSTEM
===================================================== */

const teluguBtn =
    document.getElementById("teluguBtn");

const englishBtn =
    document.getElementById("englishBtn");


function setLanguage(language) {

    document.documentElement.lang =
        language === "te"
            ? "te"
            : "en";


    document
        .querySelectorAll("[data-te]")
        .forEach(element => {

            const text =
                element.getAttribute(
                    language === "te"
                        ? "data-te"
                        : "data-en"
                );


            if (text) {

                element.textContent =
                    text;

            }

        });


    if (language === "te") {

        teluguBtn?.classList
            .add("active-language");

        englishBtn?.classList
            .remove("active-language");

    } else {

        englishBtn?.classList
            .add("active-language");

        teluguBtn?.classList
            .remove("active-language");

    }


    localStorage.setItem(
        "vinayakaLanguage",
        language
    );

}


teluguBtn?.addEventListener(
    "click",
    () => setLanguage("te")
);


englishBtn?.addEventListener(
    "click",
    () => setLanguage("en")
);


const savedLanguage =
    localStorage.getItem(
        "vinayakaLanguage"
    );


setLanguage(
    savedLanguage || "te"
);


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn?.addEventListener(
    "click",
    () => {

        navMenu?.classList.toggle(
            "show"
        );

    }
);


document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu?.classList
                    .remove("show");

            }
        );

    });


/* =====================================================
   COUNTDOWN TIMER
===================================================== */

const festivalDate = new Date("September 14, 2026 00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = festivalDate - now;

    if (distance > 0) {

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days"))
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        if (document.getElementById("hours"))
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        if (document.getElementById("minutes"))
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        if (document.getElementById("seconds"))
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    }

}

setInterval(updateCountdown, 1000);
updateCountdown();


/* =====================================================
   SCROLL REVEAL ANIMATIONS
===================================================== */

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });

}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
});


/* =====================================================
   UPI COPY & DIRECT PAY FUNCTIONALITY
===================================================== */

function copyUPI() {

    const upiId = document.getElementById("upiId")?.innerText || "9581318959@axl";

    navigator.clipboard.writeText(upiId).then(() => {
        alert("UPI ID Copied Successfully: " + upiId);
    }).catch(err => {
        alert("UPI ID: " + upiId);
    });

}

function openPaymentApp(e) {
    
    // Direct UPI Schema Intent for Mobile Apps
    const upiString = "upi://pay?pa=9581318959@axl&pn=Vinayaka%20Chavithi%20Committee&cu=INR";
    
    // Attempt redirect
    window.location.href = upiString;

}


/* =====================================================
   LIGHTBOX FOR GALLERY
===================================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery-item img").forEach(img => {

    img.addEventListener("click", () => {
        if (lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add("show");
        }
    });

});

closeLightbox?.addEventListener("click", () => {
    lightbox?.classList.remove("show");
});

lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});


/* =====================================================
   CANVAS SPARKS (HERO BG)
===================================================== */

const canvas = document.getElementById("sparkCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const sparks = [];

    for (let i = 0; i < 35; i++) {
        sparks.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 1,
            speedY: Math.random() * 1 + 0.3,
            opacity: Math.random()
        });
    }

    function animateSparks() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks.forEach(p => {

            p.y -= p.speedY;

            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = `rgba(255, 215, 90, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

        });

        requestAnimationFrame(animateSparks);

    }

    animateSparks();

}