// Script que controla a navegação entre as seções do site e o envio do formulário de contato.
window.addEventListener("load", function () {
  let loadSection = window.location.hash;

  showSectionInFirstLoad(loadSection);

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      let currentSection = window.location.hash;
      let newSection = event.target.getAttribute("href");
      if (currentSection === newSection) {
        return;
      }

      showSection(newSection);
    });
  });

  document.querySelector(".contact-form").addEventListener("submit", sendForm);

  function showSectionInFirstLoad(section) {
    if (!section) {
      window.location.hash = "#about-me";
      section = "#about-me";
    }

    document.querySelectorAll(".content > section").forEach(function (element) {
      element.style.opacity = 0;
      element.style.visibility = "hidden";
      element.style.position = "absolute";
      element.style.top = "0";
      element.style.left = "0";
    });

    let elementToShow = document.querySelector(section);
    elementToShow.style.top = "";
    elementToShow.style.left = "";
    elementToShow.style.position = "relative";
    elementToShow.style.visibility = "visible";
    elementToShow.style.opacity = 1;
  }

  function sendForm(event) {
    event.preventDefault();
    const button = document.querySelector(
      ".contact-form button[type='submit']"
    );

    if (!button) return;

    button.disabled = true;
    button.style.cursor = "wait";
    button.style.backgroundColor = "var(--button-wait-feedback)";

    const feedbackElement = document.querySelector(
      ".contact-form .contact-success-feedback"
    );

    feedbackElement.addEventListener(
      "animationend",
      function handleAnimationEnd() {
        feedbackElement.classList.remove("feedback-show");
        feedbackElement.removeEventListener("animationend", handleAnimationEnd);
      },
      { once: true }
    );

    setTimeout(() => {
      button.disabled = false;
      button.style.cursor = "pointer";
      button.style.backgroundColor = "var(--button-primary)";
      feedbackElement.classList.add("feedback-show");
    }, 2500);
  }

  function showSection(content) {
    let elementToShow = document.querySelector(content);
    document.querySelectorAll(".content > section").forEach(function (element) {
      element.style.opacity = 0;
      element.addEventListener("transitionend", function handleTransitionEnd() {
        if (element.style.opacity === "0") {
          element.style.visibility = "hidden";
          element.style.position = "absolute";
          element.style.top = "0";
          element.style.left = "0";
        }
        element.removeEventListener("transitionend", handleTransitionEnd);
      });
    });

    const interval = setInterval(() => {
      let sectionsAmount =
        document.querySelectorAll(".content > section").length;
      let sectionsHidden = Array.from(
        document.querySelectorAll(".content > section")
      ).filter((section) => {
        return (
          section.style.opacity === "0" && section.style.position === "absolute"
        );
      }).length;

      if (sectionsAmount === sectionsHidden) {
        elementToShow.style.visibility = "visible";
        elementToShow.style.position = "relative";
        elementToShow.style.top = "";
        elementToShow.style.left = "";
        elementToShow.style.opacity = 1;
        clearInterval(interval);
      }
    }, 50);
  }
});
