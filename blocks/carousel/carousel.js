/**
 * Carousel functionality for the carousel block
 */

document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.neve-carousel-block');

    carousels.forEach(function (carousel) {
        const slidesContainer = carousel.querySelector('.neve-carousel-slides');
        const slides = carousel.querySelectorAll('.neve-carousel-slide');
        const prevBtn = carousel.querySelector('.neve-carousel-prev');
        const nextBtn = carousel.querySelector('.neve-carousel-next');
        const dots = carousel.querySelectorAll('.neve-carousel-dot');
        const totalSlides = parseInt(carousel.dataset.totalSlides);

        if (totalSlides <= 1) {
            return; // No need for carousel functionality with single slide
        }

        let currentPage = 0;
        let slidesPerPage = window.innerWidth <= 768 ? 1 : 3;
        let totalPages = Math.ceil(totalSlides / slidesPerPage);

        function updateSlidesPerPage() {
            slidesPerPage = window.innerWidth <= 768 ? 1 : 3;
            totalPages = Math.ceil(totalSlides / slidesPerPage);

            // Reset to first page if current page is out of bounds
            if (currentPage >= totalPages) {
                currentPage = 0;
            }

            updateCarousel();
        }

        function updateCarousel() {
            const slideWidth = window.innerWidth <= 768 ? 100 : 33.333;
            const gap = window.innerWidth <= 768 ? 1 : 2; // rem
            const gapInPercent = window.innerWidth <= 768 ? 0 : (gap / (carousel.offsetWidth / 100));

            const translateX = currentPage * (slideWidth * slidesPerPage + gapInPercent * (slidesPerPage - 1));
            slidesContainer.style.transform = `translateX(-${translateX}%)`;

            // Update dots
            dots.forEach(function (dot, index) {
                dot.classList.toggle('active', index === currentPage);
            });

            // Update button states
            if (prevBtn) {
                prevBtn.disabled = currentPage === 0 || totalPages <= 1;
                prevBtn.style.opacity = (currentPage === 0 || totalPages <= 1) ? '0.5' : '1';
            }
            if (nextBtn) {
                nextBtn.disabled = currentPage >= totalPages - 1 || totalPages <= 1;
                nextBtn.style.opacity = (currentPage >= totalPages - 1 || totalPages <= 1) ? '0.5' : '1';
            }

            // Hide navigation if only one page on desktop or mobile
            const shouldHideNav = (window.innerWidth <= 768 && totalSlides <= 1) ||
                (window.innerWidth > 768 && totalSlides <= 3);

            if (prevBtn && nextBtn) {
                prevBtn.style.display = shouldHideNav ? 'none' : 'flex';
                nextBtn.style.display = shouldHideNav ? 'none' : 'flex';
            }
        }

        function nextPage() {
            if (currentPage < totalPages - 1) {
                currentPage++;
                updateCarousel();
            }
        }

        function prevPage() {
            if (currentPage > 0) {
                currentPage--;
                updateCarousel();
            }
        }

        function goToPage(page) {
            if (page >= 0 && page < totalPages) {
                currentPage = page;
                updateCarousel();
            }
        }

        // Add event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextPage);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevPage);
        }

        // Dot navigation
        dots.forEach(function (dot, index) {
            dot.addEventListener('click', function () {
                goToPage(index);
            });
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                prevPage();
            } else if (e.key === 'ArrowRight') {
                nextPage();
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance for swipe
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextPage(); // Swipe left - next page
                } else {
                    prevPage(); // Swipe right - previous page
                }
            }
        }

        // Handle window resize
        window.addEventListener('resize', updateSlidesPerPage);

        // Initialize carousel
        updateCarousel();
    });
});