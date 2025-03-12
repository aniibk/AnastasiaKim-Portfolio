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
    .then(response => response.json())
    .then(data => {
      const translations = data[lang] || {}; // Use an empty object if translations don't exist

      document.querySelectorAll("[data-lang-key]").forEach(element => {
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
      const greetingElement = document.querySelector("[data-lang-key='greeting']");
      if (greetingElement) {
        const greetingText = lang === "en" 
          ? greetingElement.dataset.originalText 
          : translations["greeting"];
        startTypewriterEffect(greetingText);
      }

      localStorage.setItem("language", lang);
      updateActiveLanguage(lang);
    })
    .catch(error => console.error("Error loading translations:", error));
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

  const selectedLang = document.querySelector(
    `.language-menu li[data-lang="${lang}"]`
  );
  if (selectedLang) {
    selectedLang.classList.add("active");
  }
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
