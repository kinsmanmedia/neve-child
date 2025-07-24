/**
 * MAC Custom Carousel Functionality
 * Handles carousel navigation with responsive card display
 *
 * @package Neve Child
 * @since   1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.mac-custom-carousel .custom-carousel-container');
    
    carousels.forEach(initCarousel);
    
    function initCarousel(carouselContainer) {
        const track = carouselContainer.querySelector('.custom-track');
        const prevBtn = carouselContainer.querySelector('.custom-carousel-prev');
        const nextBtn = carouselContainer.querySelector('.custom-carousel-next');
        const dotsContainer = carouselContainer.querySelector('.custom-carousel-dots');
        const cards = track.querySelectorAll('.custom-card');
        
        if (!track || !prevBtn || !nextBtn || !dotsContainer || cards.length === 0) {
            console.warn('MAC Custom Carousel: Carousel elements not found');
            return;
        }
        
        let currentSlide = 0;
        let cardsPerView = getCardsPerView();
        let totalSlides = Math.ceil(cards.length / cardsPerView);
        
        // Initialize dots first
        updateDotsForResponsive();
        
        // Initialize carousel
        updateCarousel();
        updateDots();
        updateButtons();
        
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                const newCardsPerView = getCardsPerView();
                if (newCardsPerView !== cardsPerView) {
                    cardsPerView = newCardsPerView;
                    totalSlides = Math.ceil(cards.length / cardsPerView);
                    currentSlide = Math.min(currentSlide, totalSlides - 1);
                    updateCarousel();
                    updateDots();
                    updateButtons();
                }
            }, 250);
        });
        
        // Navigation event listeners
        prevBtn.addEventListener('click', function() {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
                updateDots();
                updateButtons();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
                updateDots();
                updateButtons();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        track.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        track.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const deltaX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0 && currentSlide < totalSlides - 1) {
                    // Swipe left - next slide
                    currentSlide++;
                } else if (deltaX < 0 && currentSlide > 0) {
                    // Swipe right - previous slide
                    currentSlide--;
                }
                
                updateCarousel();
                updateDots();
                updateButtons();
            }
        }, { passive: true });
        
        // Auto-play functionality (optional)
        let autoPlayInterval;
        const autoPlayDelay = 5000; // 5 seconds
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(function() {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0; // Loop back to start
                }
                updateCarousel();
                updateDots();
                updateButtons();
            }, autoPlayDelay);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }
        
        // Start auto-play on load, pause on interaction
        startAutoPlay();
        
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        carouselContainer.addEventListener('touchstart', stopAutoPlay);
        
        // Keyboard navigation
        carouselContainer.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' && currentSlide > 0) {
                currentSlide--;
                updateCarousel();
                updateDots();
                updateButtons();
            } else if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
                currentSlide++;
                updateCarousel();
                updateDots();
                updateButtons();
            }
        });
        
        // Make carousel focusable for keyboard navigation
        carouselContainer.setAttribute('tabindex', '0');
        
        function getCardsPerView() {
            const width = window.innerWidth;
            if (width >= 1025) return 4;        // Desktop and up - 4 cards
            if (width >= 769) return 3;         // Tablet landscape - 3 cards
            if (width >= 601) return 2;         // Tablet portrait - 2 cards
            return 1;                           // Mobile - 1 card
        }
        
        function updateCarousel() {
            const translateX = -(currentSlide * (100 / cardsPerView));
            track.style.transform = `translateX(${translateX}%)`;
            
            // Remove any inline flex styles to let CSS media queries work
            cards.forEach(card => {
                card.style.removeProperty('flex');
            });
        }
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.mac-custom-carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-pressed', 'true');
                } else {
                    dot.classList.remove('active');
                    dot.setAttribute('aria-pressed', 'false');
                }
            });
        }
        
        function updateButtons() {
            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === totalSlides - 1;
            
            // Update aria labels
            prevBtn.setAttribute('aria-label', 
                `Previous cards (${currentSlide === 0 ? 'disabled' : 'enabled'})`);
            nextBtn.setAttribute('aria-label', 
                `Next cards (${currentSlide === totalSlides - 1 ? 'disabled' : 'enabled'})`);
        }
        
        // Dynamic dot generation based on responsive needs
        function updateDotsForResponsive() {
            if (!dotsContainer) return;
            
            // Clear existing dots
            dotsContainer.innerHTML = '';
            
            // Create new dots based on current slides needed
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'mac-custom-carousel-dot';
                dot.setAttribute('data-slide', i);
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                
                if (i === currentSlide) {
                    dot.classList.add('active');
                    dot.setAttribute('aria-pressed', 'true');
                } else {
                    dot.setAttribute('aria-pressed', 'false');
                }
                
                dot.addEventListener('click', function() {
                    currentSlide = i;
                    updateCarousel();
                    updateDots();
                    updateButtons();
                });
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update dots on resize as well
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateDotsForResponsive();
            }, 250);
        });
        
        // Initialize dots properly
        updateDotsForResponsive();
    }
});