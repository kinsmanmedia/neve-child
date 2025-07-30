// Import main styles
import '../scss/main.scss'

// Import component scripts
import '../components/header/script.js'

// Global JavaScript functionality
console.log('Neve child theme loaded with Vite!')

// Global event handlers
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, components initialized')

    // Add any global JavaScript functionality here
    // Example: smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault()
            const target = document.querySelector(this.getAttribute('href'))
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                })
            }
        })
    })
})

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept()
}