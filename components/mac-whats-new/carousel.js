/**
 * MAC What's New Carousel Functionality
 * Handles carousel navigation for 3 articles on desktop, 1 on mobile
 *
 * @package Neve Child
 * @since   1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.mac-whats-new .articles-carousel-container');
    
    carousels.forEach(initCarousel);
    
    function initCarousel(carouselContainer) {
        const track = carouselContainer.querySelector('.articles-track');
        const prevBtn = carouselContainer.querySelector('.carousel-prev');
        const nextBtn = carouselContainer.querySelector('.carousel-next');
        const dotsContainer = carouselContainer.querySelector('.carousel-dots');
        const articles = track.querySelectorAll('.article-card');
        
        if (!track || !prevBtn || !nextBtn || !dotsContainer || articles.length === 0) {
            console.warn('MAC What\'s New: Carousel elements not found');
            return;
        }
        
        let currentSlide = 0;
        let articlesPerView = getArticlesPerView();
        let totalSlides = Math.ceil(articles.length / articlesPerView);
        
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
                const newArticlesPerView = getArticlesPerView();
                if (newArticlesPerView !== articlesPerView) {
                    articlesPerView = newArticlesPerView;
                    totalSlides = Math.ceil(articles.length / articlesPerView);
                    currentSlide = Math.min(currentSlide, totalSlides - 1);
                    updateDotsForResponsive(); // Update dots first with new totalSlides
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
        
        // Dot navigation will be handled in updateDotsForResponsive
        
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
        
        function getArticlesPerView() {
            const width = window.innerWidth;
            if (width >= 1400) return 4;        // Large screens - 4 cards
            if (width >= 1025) return 3;        // Desktop - 3 cards
            if (width >= 601) return 2;         // Tablet - 2 cards
            return 1;                           // Mobile - 1 card
        }
        
        function updateCarousel() {
            let translateX;
            
            if (articlesPerView === 1) {
                // For mobile (1 card), account for gap between cards
                const cardWidth = track.offsetWidth;
                const gapSize = 20; // 20px gap from CSS
                const moveDistance = cardWidth + gapSize;
                translateX = -(currentSlide * moveDistance);
                track.style.transform = `translateX(${translateX}px)`;
            } else {
                // For multiple cards, use pixel-based calculation for better alignment
                const trackWidth = track.offsetWidth;
                const gapSize = getGapSize();
                const totalGapWidth = (articlesPerView - 1) * gapSize;
                const cardWidth = (trackWidth - totalGapWidth) / articlesPerView;
                const slideWidth = cardWidth + gapSize;
                translateX = -(currentSlide * slideWidth);
                track.style.transform = `translateX(${translateX}px)`;
            }
            
            // Remove any inline flex styles to let CSS media queries work
            articles.forEach(article => {
                article.style.removeProperty('flex');
            });
        }
        
        function getGapSize() {
            const width = window.innerWidth;
            if (width >= 1025) return 30; // Desktop gap
            if (width >= 601) return 20;  // Tablet gap
            return 20; // Mobile gap
        }
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.mac-carousel-dot');
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
                `Previous articles (${currentSlide === 0 ? 'disabled' : 'enabled'})`);
            nextBtn.setAttribute('aria-label', 
                `Next articles (${currentSlide === totalSlides - 1 ? 'disabled' : 'enabled'})`);
        }
        
        // Dynamic dot generation based on responsive needs
        function updateDotsForResponsive() {
            if (!dotsContainer) return;
            
            // Clear existing dots
            dotsContainer.innerHTML = '';
            
            // Create new dots based on current slides needed
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'mac-carousel-dot';
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
        
        // Removed duplicate resize event listener - now handled above
        
        // Initialize dots properly
        updateDotsForResponsive();
    }
});