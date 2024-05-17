window.addEventListener("load", function () {
  let currentContent = window.location.hash;

  if (!currentContent) {
    window.location.hash = "#about-me";
    currentContent = "#about-me";
  }

  if (currentContent) {
    document.querySelectorAll(".content > div").forEach(function (content) {
      content.style.opacity = 0;
      content.style.visibility = "hidden";
      content.style.position = "absolute";
      content.style.top = "0";
      content.style.left = "0";
    });

    let elementToShow = document.querySelector(currentContent);
    elementToShow.style.top = "";
    elementToShow.style.left = "";
    elementToShow.style.position = "relative";
    elementToShow.style.visibility = "visible";
    elementToShow.style.opacity = 1;
  }

  document.querySelectorAll(".menu-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      let currentContent = window.location.hash;
      let newContent = event.target.getAttribute("href");

      if (currentContent === newContent) {
        return;
      }

      showContent(newContent);
    });
  });

  function showContent(content) {
    let elementToShow = document.querySelector(content);
    document.querySelectorAll(".content > div").forEach(function (element) {
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
      let divsAmount = document.querySelectorAll(".content > div").length;
      let divsHidden = Array.from(
        document.querySelectorAll(".content > div")
      ).filter((div) => {
        return div.style.opacity === "0" && div.style.position === "absolute";
      }).length;

      if (divsAmount === divsHidden) {
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
