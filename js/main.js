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
  /* =========================================================
     BELT CAROUSEL
  ========================================================= */
  const belt = document.querySelector(".work__grid");

  if (belt) {
    let beltInterval = null;
    let beltPaused = false;
    const beltSpeed = 1.2; // pixels per frame (~60fps → ~72px/s)

    function beltScroll() {
      if (beltPaused) return;
      const maxScroll = belt.scrollWidth - belt.clientWidth;
      if (maxScroll <= 0) return;
      belt.scrollLeft += beltSpeed;
      if (belt.scrollLeft >= maxScroll) {
        belt.scrollLeft = 0;
      }
    }

    function beltStart() {
      if (beltInterval) return;
      beltInterval = setInterval(beltScroll, 16);
    }

    function beltStop() {
      if (beltInterval) {
        clearInterval(beltInterval);
        beltInterval = null;
      }
    }

    if (window.innerWidth > 1000) {
      beltStart();
    }

    belt.addEventListener("mouseenter", () => { beltPaused = true; beltStop(); });
    belt.addEventListener("mouseleave", () => {
      beltPaused = false;
      if (window.innerWidth > 1000) beltStart();
    });

    // Arrow buttons
    const arrowLeft = document.querySelector(".work__arrow--left");
    const arrowRight = document.querySelector(".work__arrow--right");

    if (arrowLeft) {
      arrowLeft.addEventListener("click", () => {
        belt.scrollBy({ left: -340, behavior: "smooth" });
      });
    }
    if (arrowRight) {
      arrowRight.addEventListener("click", () => {
        belt.scrollBy({ left: 340, behavior: "smooth" });
      });
    }

    // Re-evaluate on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1000 && !beltPaused) beltStart();
      else beltStop();
    });
  }

  /* =========================================================
     PROJECT TAB PANEL
  ========================================================= */
  const tabPanel = document.getElementById("workTabPanel");
  const tabImg = tabPanel.querySelector(".work__tab-image img");
  const tabTitle = tabPanel.querySelector(".work__tab-title");
  const tabTags = tabPanel.querySelector(".work__tab-tags");
  const tabSectionTitle = tabPanel.querySelector(".work__tab-section-title");
  const tabSectionText = tabPanel.querySelector(".work__tab-section-text");
  const tabCounter = tabPanel.querySelector(".work__tab-counter");
  const tabPrev = tabPanel.querySelector(".work__tab-nav-btn--prev");
  const tabNext = tabPanel.querySelector(".work__tab-nav-btn--next");
  const tabLinks = tabPanel.querySelector(".work__tab-links");

  let activeProject = null;
  let currentSection = 0;

  const projectData = [
    {
      title: "Project Name",
      tags: ["React", "Node.js", "CSS"],
      liveUrl: "Place_the_LIVE_URL_HERE",
      sourceUrl: "https://github.com/rodeldonadillo2",
      sections: [
        {
          title: "Overview",
          text: "Explain the project at a high level — what it does, who it's for, and why you built it.",
          image: "images/p1-overview.svg"
        },
        {
          title: "Telegram Order Notifications",
          text: "Describe how you integrated Telegram bot API for real-time order alerts. Mention the automation flow, triggers, and how it reduced response time for the client.",
          image: "images/p1-telegram-alerts.svg"
        },
        {
          title: "Excel Automation Scripts",
          text: "Walk through the automated scripts that process Excel reports — data extraction, formatting, scheduling, and how it eliminated manual data entry.",
          image: "images/p1-excel-automation.svg"
        }
      ]
    },
    {
      title: "Project Name",
      tags: ["HTML / CSS / JS", "API"],
      liveUrl: "Place_the_LIVE_URL_HERE",
      sourceUrl: "https://github.com/rodeldonadillo2",
      sections: [
        {
          title: "Overview",
          text: "Explain the project at a high level — what it does, who it's for, and why you built it.",
          image: "images/p2-overview.svg"
        },
        {
          title: "Section Name",
          text: "Detailed breakdown of a specific feature or implementation detail.",
          image: "images/p2-feature.svg"
        }
      ]
    },
    {
      title: "Project Name",
      tags: ["React", "CRM Integration", "AI"],
      liveUrl: "Place_the_LIVE_URL_HERE",
      sourceUrl: "https://github.com/rodeldonadillo2",
      sections: [
        {
          title: "Overview",
          text: "Explain the project at a high level — what it does, who it's for, and why you built it.",
          image: "images/p3-overview.svg"
        },
        {
          title: "Section Name",
          text: "Detailed breakdown of a specific feature or implementation detail.",
          image: "images/p3-feature.svg"
        },
        {
          title: "Another Feature",
          text: "Continue explaining more features — each section can show a different screenshot.",
          image: "images/p3-another.svg"
        }
      ]
    }
  ];

  function renderSection() {
    const data = projectData[activeProject];
    if (!data) return;
    const section = data.sections[currentSection];
    if (!section) return;

    tabImg.src = section.image;
    tabImg.alt = `${data.title} — ${section.title}`;
    tabSectionTitle.textContent = section.title;
    tabSectionText.textContent = section.text;
    tabCounter.textContent = `${currentSection + 1} / ${data.sections.length}`;

    tabPrev.disabled = currentSection === 0;
    tabNext.disabled = currentSection === data.sections.length - 1;
  }

  function showProjectTab(index) {
    const data = projectData[index];
    if (!data) return;

    // Same project clicked — close
    if (activeProject === index && tabPanel.classList.contains("work__tab-panel--open")) {
      tabPanel.classList.remove("work__tab-panel--open");
      tabPanel.addEventListener("transitionend", function handler(e) {
        if (e.propertyName === "opacity") {
          if (!tabPanel.classList.contains("work__tab-panel--open")) {
            tabPanel.style.display = "none";
          }
          tabPanel.removeEventListener("transitionend", handler);
        }
      });
      activeProject = null;
      return;
    }

    activeProject = index;
    currentSection = 0;

    tabTitle.textContent = data.title;

    tabTags.innerHTML = data.tags.map(t =>
      `<span class="work-card__tag">${t}</span>`
    ).join("");

    tabLinks.innerHTML = `
      <a href="${data.liveUrl}" target="_blank" rel="noopener" class="work-card__btn">Live site →</a>
      <a href="${data.sourceUrl}" target="_blank" rel="noopener" class="work-card__btn work-card__btn--gh">Source ↗</a>
    `;

    renderSection();

    // Reveal panel with transition
    tabPanel.style.display = "block";
    tabPanel.getBoundingClientRect(); // force reflow so transition plays
    tabPanel.classList.add("work__tab-panel--open");

    setTimeout(() => {
      tabPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }

  function goToPrevSection() {
    if (currentSection > 0) {
      currentSection--;
      renderSection();
    }
  }

  function goToNextSection() {
    const data = projectData[activeProject];
    if (data && currentSection < data.sections.length - 1) {
      currentSection++;
      renderSection();
    }
  }

  tabPrev.addEventListener("click", goToPrevSection);
  tabNext.addEventListener("click", goToNextSection);

  // Card click → open tab
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const index = parseInt(card.dataset.project, 10) - 1;
      showProjectTab(index);
    });
  });

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