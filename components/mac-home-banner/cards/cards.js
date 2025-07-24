/**
 * MAC Home Banner Cards - Animation and Carousel Functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".mac-home-banner-bottom .cards-container");
  const cards = document.querySelectorAll(".mac-home-banner-bottom .card");
  
  if (!cardsContainer || !cards.length) return;

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate container first
        if (entry.target === cardsContainer) {
          entry.target.classList.add("animate");
        }
        
        // Then animate individual cards with stagger
        if (entry.target.classList.contains("card")) {
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, Array.from(cards).indexOf(entry.target) * 150);
        }
      }
    });
  }, observerOptions);

  // Observe the container and all cards
  cardObserver.observe(cardsContainer);
  cards.forEach(card => cardObserver.observe(card));

  // Mobile carousel functionality
  function initMobileCarousel() {
    if (window.innerWidth <= 768) {
      // Add touch/swipe support for better mobile experience
      let isDown = false;
      let startX;
      let scrollLeft;

      cardsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        cardsContainer.style.cursor = 'grabbing';
        startX = e.pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
      });

      cardsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        cardsContainer.style.cursor = 'grab';
      });

      cardsContainer.addEventListener('mouseup', () => {
        isDown = false;
        cardsContainer.style.cursor = 'grab';
      });

      cardsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
      });

      // Touch events for mobile
      let touchStartX = 0;
      let touchScrollLeft = 0;

      cardsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchScrollLeft = cardsContainer.scrollLeft;
      }, { passive: true });

      cardsContainer.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const touchX = e.touches[0].clientX;
        const walk = (touchStartX - touchX) * 1.5;
        cardsContainer.scrollLeft = touchScrollLeft + walk;
      }, { passive: true });

      cardsContainer.addEventListener('touchend', () => {
        touchStartX = 0;
      }, { passive: true });

      // Snap to cards on scroll end
      let scrollTimeout;
      cardsContainer.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          snapToNearestCard();
        }, 150);
      });

      function snapToNearestCard() {
        const cardWidth = cards[0].offsetWidth + 16; // card width + gap
        const scrollPosition = cardsContainer.scrollLeft;
        const nearestCard = Math.round(scrollPosition / cardWidth);
        const targetScroll = nearestCard * cardWidth;
        
        cardsContainer.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }

  // Initialize mobile carousel
  initMobileCarousel();

  // Reinitialize on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initMobileCarousel();
    }, 250);
  });

  // Lazy loading for card images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all card images for lazy loading
  const cardImages = document.querySelectorAll(".mac-home-banner-bottom .card-image img");
  cardImages.forEach(img => imageObserver.observe(img));

  // Preload images on hover (desktop)
  if (window.innerWidth > 768) {
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img && img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
      });
    });
  }

  // Add keyboard navigation for accessibility
  cardsContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const cardWidth = cards[0].offsetWidth + 16;
      const currentScroll = cardsContainer.scrollLeft;
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const targetScroll = currentScroll + (cardWidth * direction);
      
      cardsContainer.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  });

  // Make container focusable for keyboard navigation
  cardsContainer.setAttribute('tabindex', '0');
  cardsContainer.style.outline = 'none';
});