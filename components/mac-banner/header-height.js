/**
 * Dynamic Header Height Calculator
 * Updates CSS custom property --header-height based on actual header element height
 */

(function() {
    'use strict';

    function updateHeaderHeight() {
        // Common header selectors for WordPress themes
        const headerSelectors = [
            'header',
            '.header',
            '#header',
            '.site-header',
            '.main-header',
            '.primary-header',
            '.masthead',
            '.navbar',
            '.nav-header',
            '.header-main',
            '.header-wrapper'
        ];

        let headerElement = null;
        
        // Find the header element
        for (let selector of headerSelectors) {
            headerElement = document.querySelector(selector);
            if (headerElement) {
                break;
            }
        }

        if (headerElement) {
            // Get the actual height of the header
            const headerHeight = headerElement.offsetHeight;
            
            // Update the CSS custom property
            document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
            
            console.log('Header height updated:', headerHeight + 'px');
        } else {
            console.warn('Header element not found. Using default height.');
        }
    }

    // Update on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeaderHeight);
    } else {
        updateHeaderHeight();
    }

    // Update on window resize (in case header height changes)
    window.addEventListener('resize', updateHeaderHeight);

    // Update on scroll (for sticky headers that might change height)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateHeaderHeight, 100);
    });

    // Observer for DOM changes (in case header is dynamically modified)
    if (window.MutationObserver) {
        const observer = new MutationObserver(function(mutations) {
            let shouldUpdate = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    // Check if the mutation affects the header
                    const target = mutation.target;
                    if (target.tagName === 'HEADER' || 
                        target.classList.contains('header') ||
                        target.classList.contains('site-header') ||
                        target.id === 'header') {
                        shouldUpdate = true;
                    }
                }
            });
            
            if (shouldUpdate) {
                setTimeout(updateHeaderHeight, 50);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
    }
})();