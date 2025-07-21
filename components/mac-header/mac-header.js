document.addEventListener('DOMContentLoaded', function() {
    // Ensure sticky header functionality
    const header = document.querySelector('.custom-header');
    const body = document.body;
    
    if (header) {
        // Test if sticky is supported and working
        const testSticky = function() {
            const headerRect = header.getBoundingClientRect();
            const windowScrollY = window.scrollY || window.pageYOffset;
            
            // If we've scrolled and header isn't at top, force fixed positioning
            if (windowScrollY > 100 && headerRect.top !== 0) {
                header.classList.add('header-sticky-fallback');
                body.classList.add('header-sticky-padding');
            } else if (windowScrollY <= 10) {
                header.classList.remove('header-sticky-fallback');
                body.classList.remove('header-sticky-padding');
            }
        };
        
        // Check on scroll
        window.addEventListener('scroll', testSticky);
        
        // Initial check
        testSticky();
    }
    
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.querySelector('.primary-menu');
    
    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle aria-expanded attribute
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle menu visibility
            primaryMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
            if (hamburgerIcon) {
                hamburgerIcon.classList.toggle('active');
            }
        });
    }
    
    // Enhanced dropdown functionality for touch devices
    const menuItems = document.querySelectorAll('.menu-item-has-children');
    
    menuItems.forEach(function(menuItem) {
        const link = menuItem.querySelector('a');
        const submenu = menuItem.querySelector('.sub-menu');
        
        if (link && submenu) {
            // Add click handler for touch devices
            link.addEventListener('click', function(e) {
                // On mobile, prevent default and toggle dropdown
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Close other open dropdowns
                    menuItems.forEach(function(otherItem) {
                        if (otherItem !== menuItem) {
                            otherItem.classList.remove('dropdown-open');
                        }
                    });
                    
                    // Toggle current dropdown
                    menuItem.classList.toggle('dropdown-open');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!menuItem.contains(e.target)) {
                    menuItem.classList.remove('dropdown-open');
                }
            });
        }
    });
    
    // Keyboard accessibility for dropdowns
    menuItems.forEach(function(menuItem) {
        const link = menuItem.querySelector('a');
        const submenu = menuItem.querySelector('.sub-menu');
        
        if (link && submenu) {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    menuItem.classList.toggle('dropdown-open');
                }
                
                if (e.key === 'Escape') {
                    menuItem.classList.remove('dropdown-open');
                    link.blur();
                }
            });
        }
    });
    
    // Close dropdowns on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuItems.forEach(function(menuItem) {
                menuItem.classList.remove('dropdown-open');
            });
            
            if (primaryMenu) {
                primaryMenu.classList.remove('active');
            }
            
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
                const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
                if (hamburgerIcon) {
                    hamburgerIcon.classList.remove('active');
                }
            }
        }
    });
});