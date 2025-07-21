document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".custom-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNavigation = document.querySelector(".main-navigation");

  // Adjust body margin for fixed header
  function adjustHeaderMargin() {
    if (header) {
      // Use CSS-defined heights that match media queries
      const isMobile = window.innerWidth <= 760;
      const headerHeight = isMobile ? 90 : 150;
      document.body.style.marginTop = headerHeight + "px";
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
        if (window.innerWidth <= 760) {
          e.preventDefault();
          const parentLi = this.parentElement;
          parentLi.classList.toggle("dropdown-open");
          
          // Debug logging
          console.log("Clicked menu item:", this.textContent);
          console.log("Parent element:", parentLi);
          console.log("Has dropdown-open class:", parentLi.classList.contains("dropdown-open"));
          console.log("Submenu found:", parentLi.querySelector(".sub-menu"));
        }
      });
    });

  // Run adjustments
  adjustHeaderMargin();
  window.addEventListener("resize", adjustHeaderMargin);

  // Close mobile menu on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760 && mainNavigation) {
      mainNavigation.classList.remove("active");
    }
  });
});
