document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // MOBILE MENU
  // =========================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // =========================
  // DEMO NOTICE
  // =========================

  const closeDemo = document.getElementById("closeDemo");
  const demoBanner = document.querySelector(".demo-banner");

  if (closeDemo && demoBanner) {
    closeDemo.addEventListener("click", () => {
      demoBanner.style.display = "none";
    });
  }

  // =========================
  // ANIMATED STATISTICS
  // =========================

  const counters = document.querySelectorAll("[data-count]");

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;

          const target = Number(element.dataset.count);

          const duration = 1100;

          const startTime = performance.now();

          function animateCounter(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const current = Math.floor(progress * target);

            element.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            } else {
              element.textContent = target;
            }
          }

          requestAnimationFrame(animateCounter);

          counterObserver.unobserve(element);
        });
      },
      {
        threshold: 0.35,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // =========================
  // FAQ ACCORDION
  // =========================

  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;

      const answer = faqItem.querySelector(".faq-answer");

      const alreadyOpen = faqItem.classList.contains("open");

      // Close all FAQ items

      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("open");

        const itemAnswer = item.querySelector(".faq-answer");

        if (itemAnswer) {
          itemAnswer.style.maxHeight = null;
        }
      });

      // Open selected FAQ

      if (!alreadyOpen && answer) {
        faqItem.classList.add("open");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // =========================
  // INVESTMENT CALCULATOR
  // =========================

  const investment = document.getElementById("investment");

  const rate = document.getElementById("rate");

  const years = document.getElementById("years");

  const rateValue = document.getElementById("rateValue");

  const yearsValue = document.getElementById("yearsValue");

  const futureValue = document.getElementById("futureValue");

  function updateCalculator() {
    if (
      !investment ||
      !rate ||
      !years ||
      !rateValue ||
      !yearsValue ||
      !futureValue
    ) {
      return;
    }

    const principal = Math.max(Number(investment.value) || 0, 0);

    const annualRate = Number(rate.value) / 100;

    const numberOfYears = Number(years.value);

    rateValue.textContent = rate.value;

    yearsValue.textContent = years.value;

    const value = principal * Math.pow(1 + annualRate, numberOfYears);

    futureValue.textContent = value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  }

  if (investment && rate && years) {
    investment.addEventListener("input", updateCalculator);

    rate.addEventListener("input", updateCalculator);

    years.addEventListener("input", updateCalculator);

    updateCalculator();
  }

  // =========================
  // CONTACT FORM
  // =========================

  const contactForm = document.getElementById("contactForm");

  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("name");

      const name = nameInput ? nameInput.value.trim() : "";

      if (formMessage) {
        formMessage.textContent =
          `Thanks${name ? ", " + name : ""}. ` +
          "This demo form is ready to connect " +
          "to your backend or CRM.";
      }

      contactForm.reset();
    });
  }
});
