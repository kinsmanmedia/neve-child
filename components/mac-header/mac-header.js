document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".custom-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");

  // Adjust body margin for fixed header
  function adjustHeaderMargin() {
    if (header) {
      document.body.style.marginTop = header.offsetHeight + "px";
    }
  }

  // Mobile menu toggle
  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      mainNavigation.classList.toggle("active");
      menuToggle.querySelector(".hamburger-icon")?.classList.toggle("active");
    });
  }

  // Mobile dropdown menus
  document
    .querySelectorAll(".menu-item-has-children a")
    .forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle("dropdown-open");
        }
      });
    });

  // Run adjustments
  adjustHeaderMargin();
  window.addEventListener("resize", adjustHeaderMargin);

  // Close mobile menu on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && mainNavigation) {
      mainNavigation.classList.remove("active");
    }
  });
});
