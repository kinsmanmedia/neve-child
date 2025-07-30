/**
 * MAC Header JavaScript
 * Enhanced functionality for the Mississauga Arts Council header
 */

class MACHeader {
  constructor() {
    this.header = document.querySelector(".mac-header");
    this.menuToggle = document.querySelector(".menu-toggle");
    this.mainNavigation = document.querySelector(".main-navigation");

    // Debug logging
    console.log("Header found:", !!this.header);
    console.log("Menu toggle found:", !!this.menuToggle);
    console.log("Main navigation found:", !!this.mainNavigation);
    this.body = document.body;
    this.isMenuOpen = false;
    this.breakpoint = 760;

    this.init();
  }

  init() {
    if (!this.header) return;

    this.setupEventListeners();
    this.adjustHeaderMargin();
    this.setupDropdownToggles();
    this.setupAccessibility();
  }

  setupEventListeners() {
    // Mobile menu toggle
    if (this.menuToggle && this.mainNavigation) {
      this.menuToggle.addEventListener("click", (e) =>
        this.toggleMobileMenu(e)
      );
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.adjustHeaderMargin();
        this.handleResize();
      }, 150);
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isMenuOpen && !this.header.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  setupDropdownToggles() {
    // Setup custom dropdown toggles for better mobile experience
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = toggle.closest(".menu-item-has-children");
        const isOpen = parentLi.classList.contains("dropdown-open");

        // Close all other open dropdowns at the same level
        const siblings = parentLi.parentElement.querySelectorAll(
          ".menu-item-has-children"
        );
        siblings.forEach((sibling) => {
          if (sibling !== parentLi) {
            sibling.classList.remove("dropdown-open");
            const siblingToggle = sibling.querySelector(".dropdown-toggle");
            if (siblingToggle) {
              siblingToggle.setAttribute("aria-expanded", "false");
            }
          }
        });

        // Toggle current dropdown
        parentLi.classList.toggle("dropdown-open");
        toggle.setAttribute("aria-expanded", !isOpen);

        console.log(
          "Dropdown toggled:",
          toggle.closest("a").textContent,
          "Open:",
          !isOpen
        );
      });
    });

    // Fallback for menu items without custom walker
    const menuLinks = document.querySelectorAll(".menu-item-has-children > a");
    menuLinks.forEach((link) => {
      // Only add click handler if there's no dropdown toggle button
      if (!link.parentElement.querySelector(".dropdown-toggle")) {
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= this.breakpoint) {
            e.preventDefault();

            const parentLi = link.parentElement;
            const isOpen = parentLi.classList.contains("dropdown-open");

            // Close other dropdowns
            document
              .querySelectorAll(".menu-item-has-children.dropdown-open")
              .forEach((openItem) => {
                if (openItem !== parentLi) {
                  openItem.classList.remove("dropdown-open");
                }
              });

            // Toggle current dropdown
            parentLi.classList.toggle("dropdown-open");

            console.log(
              "Menu item clicked:",
              link.textContent,
              "Open:",
              !isOpen
            );
          }
        });
      }
    });
  }

  setupAccessibility() {
    // Add proper ARIA labels and roles
    const menuItems = document.querySelectorAll(".menu-item-has-children");

    menuItems.forEach((item, index) => {
      const link = item.querySelector("a");
      const submenu = item.querySelector(".sub-menu");

      if (link && submenu) {
        const submenuId = `submenu-${index}`;
        submenu.setAttribute("id", submenuId);
        link.setAttribute("aria-haspopup", "true");
        link.setAttribute("aria-expanded", "false");
        link.setAttribute("aria-controls", submenuId);
      }
    });
  }

  toggleMobileMenu(e) {
    e.preventDefault();

    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mainNavigation.classList.add("active");
    this.menuToggle.querySelector(".hamburger-icon")?.classList.add("active");
    this.menuToggle.setAttribute("aria-expanded", "true");
    this.body.classList.add("menu-open");
    this.isMenuOpen = true;

    // Focus management
    const firstMenuItem = this.mainNavigation.querySelector("a");
    if (firstMenuItem) {
      firstMenuItem.focus();
    }

    console.log("Mobile menu opened");
  }

  closeMobileMenu() {
    this.mainNavigation.classList.remove("active");
    this.menuToggle
      .querySelector(".hamburger-icon")
      ?.classList.remove("active");
    this.menuToggle.setAttribute("aria-expanded", "false");
    this.body.classList.remove("menu-open");
    this.isMenuOpen = false;

    // Close all open dropdowns
    document.querySelectorAll(".dropdown-open").forEach((item) => {
      item.classList.remove("dropdown-open");
    });

    // Return focus to menu toggle
    this.menuToggle.focus();

    console.log("Mobile menu closed");
  }

  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth > this.breakpoint && this.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Reset dropdown states on resize
    document.querySelectorAll(".dropdown-open").forEach((item) => {
      item.classList.remove("dropdown-open");
    });
  }

  adjustHeaderMargin() {
    if (!this.header) return;

    // Get actual header height instead of using fixed values
    const headerHeight = this.header.offsetHeight;
    this.body.style.marginTop = headerHeight + "px";

    console.log("Header margin adjusted:", headerHeight + "px");
  }

  // Public method to refresh header calculations
  refresh() {
    this.adjustHeaderMargin();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.macHeader = new MACHeader();
});

// Re-initialize on Neve theme events (for compatibility)
document.addEventListener("neve-header-updated", () => {
  if (window.macHeader) {
    window.macHeader.refresh();
  }
});
