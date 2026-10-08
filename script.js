script.js
from pathlib import Path

js = r'''/* =========================================================
   Ahmad Raza Shah Portfolio - Advanced JavaScript
   Works with the existing index.html + style.css
   ========================================================= */

"use strict";

/* ---------- Helper Functions ---------- */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const showToast = (message, type = "success") => {
    let toast = $("#js-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "js-toast";
        document.body.appendChild(toast);

        Object.assign(toast.style, {
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: "99999",
            maxWidth: "360px",
            padding: "14px 18px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "600",
            fontFamily: "Arial, sans-serif",
            boxShadow: "0 10px 30px rgba(0,0,0,.2)",
            transform: "translateY(30px)",
            opacity: "0",
            transition: "all .3s ease"
        });
    }

    toast.textContent = message;
    toast.style.background =
        type === "error" ? "#dc2626" :
        type === "warning" ? "#d97706" : "#16a34a";

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(30px)";
    }, 3000);
};


/* ---------- 1. Dynamic Current Year ---------- */
const footerYear = $("footer p");
if (footerYear) {
    footerYear.innerHTML = `Personal HTML Project &copy; ${new Date().getFullYear()}`;
}


/* ---------- 2. Typing Effect ---------- */
const heroStrong = $("header strong");

if (heroStrong) {
    const typingText = heroStrong.textContent.trim();
    let typingIndex = 0;

    heroStrong.textContent = "";

    const typeEffect = () => {
        if (typingIndex < typingText.length) {
            heroStrong.textContent += typingText.charAt(typingIndex);
            typingIndex++;
            setTimeout(typeEffect, 80);
        }
    };

    typeEffect();
}


/* ---------- 3. Live Clock ---------- */
const clock = document.createElement("div");
clock.id = "live-clock";

Object.assign(clock.style, {
    marginTop: "12px",
    fontSize: "14px",
    opacity: "0.9"
});

const heroBox = $(".hero-box");
if (heroBox) {
    heroBox.appendChild(clock);
}

const updateClock = () => {
    const now = new Date();

    clock.textContent = now.toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "medium"
    });
};

updateClock();
setInterval(updateClock, 1000);


/* ---------- 4. Dark / Light Mode ---------- */
const themeButton = document.createElement("button");
themeButton.type = "button";
themeButton.id = "theme-toggle";
themeButton.textContent = "🌙 Dark Mode";

Object.assign(themeButton.style, {
    position: "fixed",
    right: "20px",
    top: "75px",
    zIndex: "2000",
    padding: "10px 15px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 5px 15px rgba(0,0,0,.2)"
});

document.body.appendChild(themeButton);

const darkStyle = document.createElement("style");
darkStyle.id = "dark-mode-style";
darkStyle.textContent = `
    body.dark-mode {
        background: #0f172a;
        color: #e5e7eb;
    }

    body.dark-mode section,
    body.dark-mode article,
    body.dark-mode aside {
        background: #1e293b;
        color: #e5e7eb;
    }

    body.dark-mode h2 {
        color: #60a5fa;
        border-color: #334155;
    }

    body.dark-mode h3 {
        color: #cbd5e1;
    }

    body.dark-mode .card {
        background: #263449;
    }

    body.dark-mode input,
    body.dark-mode select,
    body.dark-mode textarea {
        background: #0f172a;
        color: #fff;
        border-color: #475569;
    }

    body.dark-mode fieldset {
        border-color: #475569;
    }

    body.dark-mode blockquote {
        background: #263449;
    }

    body.dark-mode tr:nth-child(even) {
        background: #263449;
    }

    body.dark-mode td {
        border-color: #475569;
    }
`;

document.head.appendChild(darkStyle);

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeButton.textContent = "☀️ Light Mode";
}

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");

    themeButton.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
});


/* ---------- 5. Active Navigation ---------- */
const navLinks = $$("nav a");
const sections = $$("main section[id], header[id]");

const setActiveLink = () => {
    let currentId = "home";

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top <= 160) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = "0.7";

        if (link.getAttribute("href") === `#${currentId}`) {
            link.style.opacity = "1";
            link.style.color = "#60a5fa";
        }
    });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();


/* ---------- 6. Scroll Reveal Animation ---------- */
const revealStyle = document.createElement("style");

revealStyle.textContent = `
    .js-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity .7s ease, transform .7s ease;
    }

    .js-reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .js-progress {
        transition: width 1.5s ease;
    }
`;

document.head.appendChild(revealStyle);

const revealElements = $$("section, aside, .card");

revealElements.forEach(element => {
    element.classList.add("js-reveal");
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealElements.forEach(element => revealObserver.observe(element));


/* ---------- 7. Animated Skill Progress ---------- */
const progressBars = $$("progress");

progressBars.forEach(progress => {
    const finalValue = Number(progress.value);
    progress.value = 0;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            let value = 0;
            const step = Math.max(1, finalValue / 50);

            const animate = () => {
                value += step;

                if (value >= finalValue) {
                    progress.value = finalValue;
                    return;
                }

                progress.value = value;
                requestAnimationFrame(animate);
            };

            animate();
            observer.disconnect();
        }
    });

    observer.observe(progress);
});


/* ---------- 8. Show / Hide Password ---------- */
const passwordInput = $("#password");

if (passwordInput) {
    const passwordWrapper = document.createElement("div");

    passwordWrapper.style.position = "relative";
    passwordInput.parentNode.insertBefore(passwordWrapper, passwordInput);
    passwordWrapper.appendChild(passwordInput);

    const passwordButton = document.createElement("button");

    passwordButton.type = "button";
    passwordButton.textContent = "👁️ Show";
    
    Object.assign(passwordButton.style, {
        position: "absolute",
        right: "8px",
        top: "50%",
        transform: "translateY(-50%)",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontWeight: "bold"
    });

    passwordInput.style.paddingRight = "85px";
    passwordWrapper.appendChild(passwordButton);

    passwordButton.addEventListener("click", () => {
        const visible = passwordInput.type === "text";

        passwordInput.type = visible ? "password" : "text";
        passwordButton.textContent = visible ? "👁️ Show" : "🙈 Hide";
    });
}


/* ---------- 9. Password Strength ---------- */
if (passwordInput) {
    const strength = document.createElement("small");

    strength.style.display = "block";
    strength.style.marginTop = "5px";
    strength.style.fontWeight = "bold";

    passwordInput.parentNode.appendChild(strength);

    passwordInput.addEventListener("input", () => {
        const password = passwordInput.value;

        if (!password) {
            strength.textContent = "";
            return;
        }

        let score = 0;

        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            ["Very Weak", "#dc2626"],
            ["Weak", "#ef4444"],
            ["Fair", "#d97706"],
            ["Good", "#16a34a"],
            ["Strong", "#15803d"],
            ["Excellent", "#047857"]
        ];

        const [text, color] = levels[score];

        strength.textContent = `Password Strength: ${text}`;
        strength.style.color = color;
    });
}


/* ---------- 10. Real-Time Form Validation ---------- */
const form = $("#form form");

if (form) {
    const fields = {
        name: $("#name"),
        email: $("#email"),
        password: $("#password"),
        age: $("#age"),
        country: $("#country"),
        gender: $("#Gender"),
        message: $("#message")
    };

    const setFieldState = (field, valid) => {
        if (!field) return;

        field.style.borderColor = valid ? "#16a34a" : "#dc2626";
        field.style.outline = valid ? "none" : "2px solid rgba(220,38,38,.15)";
    };

    const validateField = (fieldName) => {
        const field = fields[fieldName];

        if (!field) return true;

        const value = field.value.trim();

        if (fieldName === "name") {
            const valid = value.length >= 3;
            setFieldState(field, valid);
            return valid;
        }

        if (fieldName === "email") {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setFieldState(field, valid);
            return valid;
        }

        if (fieldName === "password") {
            const valid = value.length >= 6;
            setFieldState(field, valid);
            return valid;
        }

        if (fieldName === "age") {
            const age = Number(value);
            const valid = !value || (age >= 10 && age <= 100);
            setFieldState(field, valid);
            return valid;
        }

        if (fieldName === "country") {
            const valid = value !== "";
            setFieldState(field, valid);
            return valid;
        }

        if (fieldName === "gender") {
            const valid = value !== "gender";
            setFieldState(field, valid);
            return valid;
        }

        return true;
    };

    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];

        if (field) {
            field.addEventListener("blur", () => validateField(fieldName));
            field.addEventListener("input", () => {
                if (fieldName !== "gender" && fieldName !== "country") {
                    validateField(fieldName);
                }
            });
        }
    });

    form.addEventListener("submit", event => {
        event.preventDefault();

        const validationResults = Object.keys(fields).map(validateField);
        const valid = validationResults.every(Boolean);

        if (!valid) {
            showToast("Please correct the highlighted fields.", "error");
            return;
        }

        showToast("✅ Form submitted successfully!");

        form.reset();

        Object.values(fields).forEach(field => {
            if (field) field.style.borderColor = "#cbd5e1";
        });
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            Object.values(fields).forEach(field => {
                if (field) field.style.borderColor = "#cbd5e1";
            });
        }, 0);

        showToast("Form has been reset.", "warning");
    });
}


/* ---------- 11. Favorite Color Changes Accent ---------- */
const colorInput = $("#color");

if (colorInput) {
    colorInput.addEventListener("input", () => {
        const selectedColor = colorInput.value;

        document.documentElement.style.setProperty(
            "--user-accent",
            selectedColor
        );

        localStorage.setItem("user-accent", selectedColor);
    });

    const savedColor = localStorage.getItem("user-accent");

    if (savedColor) {
        colorInput.value = savedColor;
        document.documentElement.style.setProperty("--user-accent", savedColor);
    }
}


/* ---------- 12. File Upload Information ---------- */
const fileInput = $("#file");

if (fileInput) {
    fileInput.addEventListener("change", () => {
        if (!fileInput.files.length) return;

        const file = fileInput.files[0];
        const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

        showToast(`📁 ${file.name} selected (${sizeMB} MB).`);
    });
}


/* ---------- 13. Character Counter for Message ---------- */
const messageInput = $("#message");

if (messageInput) {
    const counter = document.createElement("small");
    counter.style.display = "block";
    counter.style.textAlign = "right";
    counter.style.marginTop = "5px";

    messageInput.parentNode.appendChild(counter);

    const updateCounter = () => {
        counter.textContent = `${messageInput.value.length} characters`;
    };

    messageInput.addEventListener("input", updateCounter);
    updateCounter();
}


/* ---------- 14. Video Enhancement ---------- */
const video = $("video");

if (video) {
    video.addEventListener("play", () => {
        showToast("▶️ Video started.");
    });

    video.addEventListener("pause", () => {
        if (!video.ended) {
            showToast("⏸️ Video paused.", "warning");
        }
    });

    video.addEventListener("ended", () => {
        showToast("🎬 Video finished.");
    });
}


/* ---------- 15. Audio Enhancement ---------- */
const audio = $("audio");

if (audio) {
    audio.addEventListener("play", () => {
        showToast("🔊 Audio playing.");
    });

    audio.addEventListener("pause", () => {
        showToast("🔇 Audio paused.", "warning");
    });
}


/* ---------- 16. Back to Top Button ---------- */
const topButton = document.createElement("button");

topButton.type = "button";
topButton.textContent = "↑ Top";
topButton.setAttribute("aria-label", "Back to top");

Object.assign(topButton.style, {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    zIndex: "9998",
    padding: "10px 15px",
    border: "none",
    borderRadius: "25px",
    background: "#1d4ed8",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    opacity: "0",
    pointerEvents: "none",
    transition: "all .3s ease"
});

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    const show = window.scrollY > 500;

    topButton.style.opacity = show ? "1" : "0";
    topButton.style.pointerEvents = show ? "auto" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ---------- 17. Keyboard Shortcuts ---------- */
document.addEventListener("keydown", event => {
    // Ctrl + D = toggle dark mode
    if (event.ctrlKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        themeButton.click();
    }

    // Escape = stop media
    if (event.key === "Escape") {
        $$("video, audio").forEach(media => media.pause());
    }
});


/* ---------- 18. Smooth Navigation ---------- */
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const target = $(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});


/* ---------- 19. Prevent External Links From Losing Page ---------- */
$$('a[target="_blank"]').forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
});


/* ---------- 20. Welcome Message ---------- */
window.addEventListener("load", () => {
    setTimeout(() => {
        showToast("👋 Welcome to Ahmad Raza Shah's Portfolio!");
    }, 800);
});


/* ---------- 21. Online / Offline Detection ---------- */
const updateConnection = () => {
    if (navigator.onLine) {
        console.log("Internet connection: Online");
    } else {
        showToast("⚠️ You are currently offline.", "warning");
    }
};

window.addEventListener("online", () => {
    showToast("🌐 Internet connection restored.");
});

window.addEventListener("offline", () => {
    showToast("⚠️ Internet connection lost.", "warning");
});

updateConnection();


/* ---------- 22. Save Name ---------- */
const nameInput = $("#name");

if (nameInput) {
    const savedName = localStorage.getItem("visitor-name");

    if (savedName && nameInput.value === "") {
        nameInput.value = savedName;
    }

    nameInput.addEventListener("input", () => {
        if (nameInput.value.trim()) {
            localStorage.setItem("visitor-name", nameInput.value.trim());
        }
    });
}


/* ---------- 23. Console Welcome ---------- */
console.log(
    "%c Ahmad Raza Shah Portfolio ",
    "background:#2563eb;color:white;font-size:18px;padding:8px;border-radius:6px;"
);

console.log(
    "%cJavaScript loaded successfully!",
    "color:#16a34a;font-weight:bold;font-size:14px;"
);
'''

path = Path("/mnt/data/script.js")
path.write_text(js, encoding="utf-8")

print(f"Created: {path}")
print(f"Lines: {len(js.splitlines())}")
