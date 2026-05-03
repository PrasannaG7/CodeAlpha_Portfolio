/* =====================================================
   MODERN DARK THEME PORTFOLIO
   Professional Developer Portfolio JavaScript
   ===================================================== */

// ===== DOM ELEMENTS =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const navToggle = document.querySelector('.nav-toggle');
const navLinksItems = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.querySelector('.back-to-top') || createBackToTopButton();
const sections = document.querySelectorAll('.section');
const header = document.querySelector('.header');

// ===== UTILITY FUNCTIONS =====

/**
 * Create and append the back-to-top button if it doesn't exist
 */
function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    return button;
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Add scroll listener with debounce
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ===== NAVBAR STICKY & ACTIVE LINK HIGHLIGHTING =====

/**
 * Update navbar styling on scroll
 */
function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Highlight active nav link based on scroll position
    updateActiveNavLink();
}

/**
 * Update which nav link is active based on current scroll position
 */
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== MOBILE MENU TOGGLE =====

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
}

// Create hamburger menu icon if it doesn't exist
function createHamburgerMenu() {
    if (!navToggle) {
        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Toggle menu');
        document.querySelector('.nav-content').appendChild(toggle);
        return toggle;
    }
}

// ===== SMOOTH SCROLL NAVIGATION =====

/**
 * Handle smooth scroll for all anchor links
 */
function setupSmoothScroll() {
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                closeMobileMenu();
                
                // Smooth scroll to target
                smoothScrollTo(targetSection);
                
                // Update active link
                setTimeout(() => updateActiveNavLink(), 300);
            }
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

/**
 * Reveal elements as they come into view
 */
function revealOnScroll() {
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('active');
        }
    });

    // Reveal skill categories and project cards
    const revealElements = document.querySelectorAll('.skill-category, .project-card');
    revealElements.forEach(el => {
        if (isElementInViewport(el)) {
            el.style.animation = 'slideIn 0.6s ease-out forwards';
        }
    });
}

// ===== BACK TO TOP BUTTON =====

/**
 * Show/hide back-to-top button based on scroll position
 */
function toggleBackToTopBtn() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

/**
 * Handle back-to-top button click
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== INTERACTIVE ELEMENT ENHANCEMENTS =====

/**
 * Add click ripple effect to buttons and cards
 */
function addRippleEffect() {
    const buttons = document.querySelectorAll('.social-link, .skill-list li');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
        });
    });
}

/**
 * Add scroll animation to skill items
 */
function animateSkillItems() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.05}s`;
        item.style.animation = 'slideIn 0.5s ease-out forwards';
    });
}

/**
 * Add stagger animation to project cards
 */
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.animation = 'slideIn 0.6s ease-out forwards';
    });
}

// ===== TYPING ANIMATION IN HERO (OPTIONAL) =====

/**
 * Typing animation for hero section title
 */
function setupTypingAnimation() {
    const heroTitle = document.querySelector('h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    const typingSpeed = 50;
    
    // Only apply animation if not already animated
    if (!heroTitle.dataset.animated) {
        heroTitle.textContent = '';
        heroTitle.style.animation = 'none';
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        
        // Start typing animation
        typeChar();
        heroTitle.dataset.animated = 'true';
    }
}

// ===== HEADER IMAGE PARALLAX (OPTIONAL) =====

/**
 * Parallax effect on hero section
 */
function parallaxEffect() {
    if (header) {
        const scrollY = window.scrollY;
        header.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    }
}

// ===== KEYBOARD NAVIGATION =====

/**
 * Add keyboard navigation support
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
        
        // Ctrl+Home to go to top
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// ===== INITIALIZATION =====

/**
 * Initialize all features
 */
function init() {
    console.log('Portfolio initialized');
    
    // Create hamburger menu
    createHamburgerMenu();
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll setup
    setupSmoothScroll();
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateNavbarOnScroll();
        revealOnScroll();
        toggleBackToTopBtn();
        parallaxEffect();
    });
    
    // Back to top button
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Keyboard navigation
    setupKeyboardNavigation();
    
    // Initial scroll check
    updateNavbarOnScroll();
    revealOnScroll();
    toggleBackToTopBtn();
    
    // Add animations
    animateSkillItems();
    animateProjectCards();
    
    // Type animation (uncomment to enable)
    // setupTypingAnimation();
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== UTILITY: PERFORMANCE MONITORING =====

/**
 * Log performance metrics (optional, comment out in production)
 */
function logPerformanceMetrics() {
    window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        }
    });
}

// Uncomment to enable performance logging
// logPerformanceMetrics();

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrollTo,
        toggleBackToTopBtn,
        updateActiveNavLink,
        revealOnScroll
    };
}
