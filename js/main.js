/* =========================================================
   Rodel Donadillo Portfolio
   File: js/main.js
   Purpose:
   - Smooth helper behavior
   - Hero hover state support
   - Contact form mailto fallback
   - Small UI polish
========================================================= */

(function () {
  "use strict";

  const SELECTORS = {
    hero: "#hero",
    nav: "#nav",
    leftPanel: "#panelLeft",
    rightPanel: "#panelRight",
    contactForm: "#contactForm"
  };

  const hero = document.querySelector(SELECTORS.hero);
  const nav = document.querySelector(SELECTORS.nav);
  const leftPanel = document.querySelector(SELECTORS.leftPanel);
  const rightPanel = document.querySelector(SELECTORS.rightPanel);
  const contactForm = document.querySelector(SELECTORS.contactForm);

  /* =========================================================
     HERO STATE
     Adds classes that mirror the CSS :has() hover behavior.
     This is useful as a fallback and makes later image switching easier.
  ========================================================= */
  function setHeroState(state) {
    if (!hero) return;

    hero.classList.remove("hero--developer", "hero--manager", "hero--neutral");

    if (state === "developer") {
      hero.classList.add("hero--developer");
    } else if (state === "manager") {
      hero.classList.add("hero--manager");
    } else {
      hero.classList.add("hero--neutral");
    }
  }

  if (hero && leftPanel && rightPanel) {
    setHeroState("neutral");

    leftPanel.addEventListener("mouseenter", () => setHeroState("developer"));
    rightPanel.addEventListener("mouseenter", () => setHeroState("manager"));

    hero.addEventListener("mouseleave", () => setHeroState("neutral"));

    leftPanel.addEventListener("focusin", () => setHeroState("developer"));
    rightPanel.addEventListener("focusin", () => setHeroState("manager"));

    hero.addEventListener("focusout", (event) => {
      if (!hero.contains(event.relatedTarget)) {
        setHeroState("neutral");
      }
    });
  }

  /* =========================================================
     NAV SCROLL STATE
  ========================================================= */
  function updateNavState() {
    if (!nav) return;

    if (window.scrollY > 24) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
  }

  window.addEventListener("scroll", updateNavState, { passive: true });
  updateNavState();

  /* =========================================================
     SMOOTH ANCHOR SCROLL
  ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  /* =========================================================
     CONTACT FORM
     Static-site friendly mailto fallback.
  ========================================================= */
  function buildEmailBody(formData) {
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const service = formData.get("service") || "Not selected";
    const message = formData.get("message") || "";

    return [
      "Hi Rodel,",
      "",
      "I found your portfolio and would like to discuss a project.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Service needed: ${service}`,
      "",
      "Business / project details:",
      message,
      "",
      "Thank you."
    ].join("\n");
  }

  function showFormNotice(text, type = "success") {
    if (!contactForm) return;

    let notice = contactForm.querySelector(".form__notice");

    if (!notice) {
      notice = document.createElement("p");
      notice.className = "form__notice";
      contactForm.appendChild(notice);
    }

    notice.textContent = text;
    notice.dataset.type = type;

    window.setTimeout(() => {
      if (notice) {
        notice.textContent = "";
        delete notice.dataset.type;
      }
    }, 6000);
  }

  window.handleSubmit = function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const subject = "Portfolio Inquiry — Rodel Donadillo";
    const body = buildEmailBody(formData);

    const mailtoUrl =
      "mailto:rodeldonadillo2@gmail.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    showFormNotice(
      "Your email app should open with a prepared message. If it does not, email me directly at rodeldonadillo2@gmail.com.",
      "success"
    );

    form.reset();
  };

  /* =========================================================
     REVEAL ON SCROLL
  ========================================================= */
  const revealItems = document.querySelectorAll(
    ".section__header, .service-card, .tool-badge, .about__text, .about__stats, .contact__form, .work-card, .work__github"
  );

  if ("IntersectionObserver" in window && revealItems.length > 0) {
    revealItems.forEach((item) => item.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("reveal--visible"));
  }
})();