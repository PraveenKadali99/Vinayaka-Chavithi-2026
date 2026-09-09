/* =====================================================
   VINAYAKA CHAVITHI 2026
   PREMIUM JAVASCRIPT
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
   COUNTDOWN
===================================================== */

const festivalStart =
    new Date(
        "September 14, 2026 00:00:00"
    ).getTime();


const festivalEnd =
    new Date(
        "September 22, 2026 23:59:59"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    let distance;


    if (now < festivalStart) {

        distance =
            festivalStart - now;

    }

    else if (now <= festivalEnd) {

        distance =
            festivalEnd - now;

    }

    else {

        distance = 0;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    const dayEl =
        document.getElementById("days");

    const hourEl =
        document.getElementById("hours");

    const minuteEl =
        document.getElementById("minutes");

    const secondEl =
        document.getElementById("seconds");


    if (dayEl)
        dayEl.textContent =
            String(days).padStart(2, "0");


    if (hourEl)
        hourEl.textContent =
            String(hours).padStart(2, "0");


    if (minuteEl)
        minuteEl.textContent =
            String(minutes).padStart(2, "0");


    if (secondEl)
        secondEl.textContent =
            String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   PREMIUM GOLDEN SPARK FIELD

   NOTE (PERFORMANCE FIX):
   This canvas used to run requestAnimationFrame
   forever, for the entire lifetime of the page,
   even while the hero section was scrolled far out
   of view. Combined with the blurred radial-gradient
   draw per spark, that constant off-screen redraw
   is what was making scrolling feel "stuck" / janky,
   especially on phones.

   Fix: only run the animation loop while the hero
   section is actually visible on screen, using an
   IntersectionObserver. It pauses automatically the
   moment you scroll away and resumes when you scroll
   back up.
===================================================== */

const sparkCanvas =
    document.getElementById(
        "sparkCanvas"
    );


let sparkAnimationId = null;

let sparksRunning = false;


if (sparkCanvas) {

    const ctx =
        sparkCanvas.getContext("2d");

    let sparks = [];


    function resizeSparkCanvas() {

        const rect =
            sparkCanvas.getBoundingClientRect();


        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        sparkCanvas.width =
            rect.width * dpr;

        sparkCanvas.height =
            rect.height * dpr;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }


    function createSpark() {

        const width =
            sparkCanvas.clientWidth;

        const height =
            sparkCanvas.clientHeight;


        return {

            x:
                Math.random() *
                width,

            y:
                Math.random() *
                height,

            radius:
                Math.random() * 1.8 + .4,

            speed:
                Math.random() * .45 + .15,

            drift:
                (Math.random() - .5) * .35,

            alpha:
                Math.random() * .7 + .25,

            pulse:
                Math.random() * .03 + .01,

            phase:
                Math.random() *
                Math.PI * 2

        };

    }


    function initializeSparks() {

        const count =
            window.innerWidth < 600
                ? 55
                : 115;


        sparks = [];


        for (
            let i = 0;
            i < count;
            i++
        ) {

            sparks.push(
                createSpark()
            );

        }

    }


    function drawSpark(spark) {

        const pulse =
            spark.alpha +
            Math.sin(
                spark.phase
            ) * .25;


        const gradient =
            ctx.createRadialGradient(
                spark.x,
                spark.y,
                0,
                spark.x,
                spark.y,
                spark.radius * 7
            );


        gradient.addColorStop(
            0,
            `rgba(
                255,
                240,
                160,
                ${pulse}
            )`
        );


        gradient.addColorStop(
            .35,
            `rgba(
                255,
                180,
                50,
                ${pulse * .6}
            )`
        );


        gradient.addColorStop(
            1,
            "rgba(255,120,20,0)"
        );


        ctx.beginPath();

        ctx.fillStyle =
            gradient;

        ctx.arc(
            spark.x,
            spark.y,
            spark.radius * 7,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.beginPath();

        ctx.fillStyle =
            `rgba(
                255,
                245,
                190,
                ${Math.max(
                    pulse,
                    .3
                )}
            )`;

        ctx.arc(
            spark.x,
            spark.y,
            spark.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    function animateSparks() {

        if (!sparksRunning) {
            return;
        }


        const width =
            sparkCanvas.clientWidth;

        const height =
            sparkCanvas.clientHeight;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        sparks.forEach(spark => {

            spark.y -=
                spark.speed;


            spark.x +=
                spark.drift +
                Math.sin(
                    spark.phase
                ) * .15;


            spark.phase +=
                spark.pulse;


            if (
                spark.y < -20
            ) {

                spark.y =
                    height + 20;

                spark.x =
                    Math.random() *
                    width;

            }


            if (
                spark.x < -20
            ) {

                spark.x =
                    width + 20;

            }


            if (
                spark.x >
                width + 20
            ) {

                spark.x = -20;

            }


            drawSpark(spark);

        });


        sparkAnimationId =
            requestAnimationFrame(
                animateSparks
            );

    }


    function startSparks() {

        if (sparksRunning) {
            return;
        }


        sparksRunning = true;

        animateSparks();

    }


    function stopSparks() {

        sparksRunning = false;


        if (sparkAnimationId) {

            cancelAnimationFrame(
                sparkAnimationId
            );

            sparkAnimationId = null;

        }

    }


    resizeSparkCanvas();

    initializeSparks();


    const heroSection =
        document.getElementById(
            "home"
        );


    if (
        heroSection &&
        "IntersectionObserver" in window
    ) {

        const heroObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                startSparks();

                            } else {

                                stopSparks();

                            }

                        }
                    );

                },
                {
                    threshold: 0
                }
            );


        heroObserver.observe(
            heroSection
        );

    } else {

        startSparks();

    }


    window.addEventListener(
        "resize",
        () => {

            resizeSparkCanvas();

            initializeSparks();

        }
    );

}


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


const galleryPrev =
    document.getElementById(
        "galleryPrev"
    );


const galleryNext =
    document.getElementById(
        "galleryNext"
    );


let currentImage = 0;


function openGallery(index) {

    if (!galleryImages.length)
        return;


    currentImage = index;


    lightboxImage.src =
        galleryImages[
            currentImage
        ].src;


    lightbox.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


galleryImages.forEach(
    (image, index) => {

        image.parentElement
            .addEventListener(
                "click",
                () => openGallery(index)
            );

    }
);


function nextImage() {

    if (!galleryImages.length)
        return;


    currentImage++;


    if (
        currentImage >=
        galleryImages.length
    ) {

        currentImage = 0;

    }


    lightboxImage.src =
        galleryImages[
            currentImage
        ].src;

}


function previousImage() {

    if (!galleryImages.length)
        return;


    currentImage--;


    if (currentImage < 0) {

        currentImage =
            galleryImages.length - 1;

    }


    lightboxImage.src =
        galleryImages[
            currentImage
        ].src;

}


galleryNext?.addEventListener(
    "click",
    nextImage
);


galleryPrev?.addEventListener(
    "click",
    previousImage
);


function closeGallery() {

    lightbox?.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


closeLightbox?.addEventListener(
    "click",
    closeGallery
);


lightbox?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   KEYBOARD GALLERY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox?.classList.contains(
                "show"
            )
        ) {
            return;
        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousImage();

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGallery();

        }

    }
);


/* =====================================================
   TOUCH SWIPE
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


lightbox?.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


lightbox?.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        const difference =
            touchStartX -
            touchEndX;


        if (
            difference > 50
        ) {

            nextImage();

        }

        else if (
            difference < -50
        ) {

            previousImage();

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   UPI COPY
===================================================== */

function copyUPI() {

    const upiElement =
        document.getElementById(
            "upiId"
        );


    if (!upiElement)
        return;


    const upi =
        upiElement.textContent.trim();


    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(upi)
            .then(() => {

                showToast(
                    "UPI ID copied successfully! 🙏"
                );

            })
            .catch(() => {

                fallbackCopy(
                    upi
                );

            });

    }

    else {

        fallbackCopy(
            upi
        );

    }

}


function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    document.body.appendChild(
        textarea
    );


    textarea.select();

    document.execCommand(
        "copy"
    );


    textarea.remove();


    showToast(
        "UPI ID copied successfully! 🙏"
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    let toast =
        document.getElementById(
            "customToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "customToast";


        toast.style.position =
            "fixed";

        toast.style.left =
            "50%";

        toast.style.bottom =
            "30px";

        toast.style.transform =
            "translateX(-50%)";

        toast.style.zIndex =
            "999999";

        toast.style.padding =
            "12px 22px";

        toast.style.borderRadius =
            "30px";

        toast.style.background =
            "linear-gradient(135deg,#8d1708,#e18b16)";

        toast.style.color =
            "white";

        toast.style.fontWeight =
            "700";

        toast.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.3)";

        toast.style.transition =
            "opacity .3s";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.style.opacity =
        "1";


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(() => {

            toast.style.opacity =
                "0";

        }, 2200);

}


/* =====================================================
   SCROLL SYSTEM

   NOTE (PERFORMANCE FIX):
   The scroll handler previously ran its full body
   (reading layout metrics + writing styles) on every
   single native "scroll" event, which fires far more
   often than the screen can actually repaint. That
   layout-thrashing is a second cause of the "stuck"
   scrolling feeling. It's now wrapped in
   requestAnimationFrame so the work only happens once
   per rendered frame.
===================================================== */

const navbar =
    document.getElementById(
        "navbar"
    );


const backToTop =
    document.getElementById(
        "backToTop"
    );


const scrollFill =
    document.getElementById(
        "scrollFill"
    );


let scrollTicking = false;


function onScroll() {

    const scrollTop =
        window.scrollY;


    const docHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    const progress =
        docHeight > 0
            ? (
                scrollTop /
                docHeight
            ) * 100
            : 0;


    if (scrollFill) {

        scrollFill.style.width =
            progress + "%";

    }


    navbar?.classList.toggle(
        "scrolled",
        scrollTop > 40
    );


    if (backToTop) {

        backToTop.style.display =
            scrollTop > 500
                ? "block"
                : "none";

    }


    scrollTicking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!scrollTicking) {

            scrollTicking = true;

            requestAnimationFrame(
                onScroll
            );

        }

    },
    {
        passive: true
    }
);


onScroll();


backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"

        });

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealTargets =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "in-view"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );


    revealTargets.forEach(
        target => {

            revealObserver.observe(
                target
            );

        }
    );

}

else {

    revealTargets.forEach(
        target => {

            target.classList.add(
                "in-view"
            );

        }
    );

}


/* =====================================================
   VISARJAN
===================================================== */

const festivalEndTime =
    new Date(
        "September 22, 2026 23:59:59"
    ).getTime();


const visarjanDate =
    new Date(
        "September 22, 2026 18:00:00"
    ).getTime();


function checkVisarjan() {

    const now =
        new Date().getTime();


    /*
       AUTOMATIC VISARJAN EFFECT

       Uncomment the following block
       when you want it to activate
       automatically on Sept 22.

    */

    /*
    if (
        now >= visarjanDate &&
        now <= festivalEndTime
    ) {

        document
            .getElementById(
                "visarjanMessage"
            )
            .classList.add(
                "show"
            );

    }
    */

}


checkVisarjan();


/* =====================================================
   IMAGE ERROR HANDLING
===================================================== */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                if (
                    image.classList.contains(
                        "ganesha-image"
                    )
                ) {

                    image.style.display =
                        "none";


                    const placeholder =
                        document.querySelector(
                            ".ganesha-placeholder"
                        );


                    if (placeholder) {

                        placeholder.style.display =
                            "flex";

                    }

                }

            }
        );

    });


/* =====================================================
   PREVENT IMAGE DRAG
===================================================== */

document
    .querySelectorAll(
        ".ganesha-image, .gallery-item img"
    )
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c🙏 Vinayaka Chavithi Celebrations 2026 🙏",
    "color:#f4b942;font-size:18px;font-weight:bold;"
);

console.log(
    "%cKadali Vari Palem • Komaragiripatnam",
    "color:#a11d0a;font-size:14px;"
);