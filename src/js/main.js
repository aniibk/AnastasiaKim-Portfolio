document.addEventListener("DOMContentLoaded", function () {
  // Ensure the default language is English if none is saved
  let savedLang = localStorage.getItem("language");
  if (!savedLang) {
    savedLang = "en";
    localStorage.setItem("language", savedLang);
  }

  loadLanguage(savedLang);
  updateActiveLanguage(savedLang);

  // Handle active state for menu items
  document.querySelectorAll(".ryzn, .ipr, .rehab-center").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});

// Load language and update UI
function loadLanguage(lang) {
  fetch("../src/assets/translations/translations.json")
    .then((response) => response.json())
    .then((data) => {
      const translations = data[lang] || {}; // Use an empty object if translations don't exist

      document.querySelectorAll("[data-lang-key]").forEach((element) => {
        const key = element.getAttribute("data-lang-key");

        // Store original text only once
        if (!element.dataset.originalText) {
          element.dataset.originalText = element.textContent.trim();
        }

        // If English is selected, restore the original text
        if (lang === "en") {
          element.textContent = element.dataset.originalText;
        } else {
          // Apply translation if available
          if (translations[key]) {
            element.textContent = translations[key];
          }
        }
      });

      // Handle typewriter effect separately
      const greetingElement = document.querySelector(
        "[data-lang-key='greeting']"
      );
      if (greetingElement) {
        const greetingText =
          lang === "en"
            ? greetingElement.dataset.originalText
            : translations["greeting"];
        startTypewriterEffect(greetingText);
      }

      localStorage.setItem("language", lang);
      updateActiveLanguage(lang);
    })
    .catch((error) => console.error("Error loading translations:", error));
}

// Change language and update styles
function changeLanguage(lang) {
  loadLanguage(lang);
}

// Highlight selected language
function updateActiveLanguage(lang) {
  document.querySelectorAll(".language-menu li").forEach((item) => {
    item.classList.remove("active");
  });

  document
    .querySelectorAll(`.language-menu li[data-lang="${lang}"]`)
    .forEach((item) => {
      item.classList.add("active");
    });
}

// Typewriter Effect with Dynamic Text
let typewriterTimeout; // Store timeout reference

function startTypewriterEffect(text) {
  const typewriterElement = document.getElementById("typewriter");
  if (!typewriterElement) return;

  // Clear previous content and stop any running timeouts
  typewriterElement.textContent = "";
  clearTimeout(typewriterTimeout);

  let i = 0;
  const speed = 150;

  function typeWriter() {
    if (i < text.length) {
      typewriterElement.textContent += text.charAt(i);
      i++;
      typewriterTimeout = setTimeout(typeWriter, speed);
    }
  }

  // Start after a small delay
  typewriterTimeout = setTimeout(typeWriter, 500);
}

//
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".ryzn, .ipr, .rehab-center").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "en";
  loadLanguage(savedLang);
});

//Side Menu
document.addEventListener("DOMContentLoaded", function() {
  const openButton = document.querySelector(".menu-button.open"); // Open button (☰)
  const closeButton = document.querySelector(".menu-button.close"); // Close button (☰)

  // Add event listener to the open button
  openButton.addEventListener("click", function() {
    // When open button is clicked, add the active class
    openButton.classList.add("active"); // Open button turns red
  });

  // Add event listener to the close button
  closeButton.addEventListener("click", function() {
    // When close button is clicked, remove the active class from the open button
    closeNav(); // Call the closeNav function which will reset the button color
  });
});

function openNav() {
  document.getElementById("side-nav").style.width = "70px";
  const elements = document.getElementsByClassName("container");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.marginLeft = "70px";
  }
}

function closeNav() {
  // Close the side nav
  document.getElementById("side-nav").style.width = "0";
  const elements = document.getElementsByClassName("container");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.marginLeft = "16px";
  }
  
  // Reset the open button color by removing the "active" class
  const openButton = document.querySelector(".menu-button.open");
  openButton.classList.remove("active"); // Return the button to its original color
}

