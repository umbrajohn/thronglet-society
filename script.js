// Thronglet Society App JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form handling if contact form is added later
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    });

    // Add animation classes for CSS transitions
    const featureElements = document.querySelectorAll('.feature, .differentiator, .resource');
    featureElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
});

// Utility functions
const ThrongletSociety = {
    // Function to handle user interactions
    init: function() {
        console.log('Thronglet Society app initialized');
        this.setupEventListeners();
    },

    setupEventListeners: function() {
        // Add any additional event listeners here
        this.handleCTAClicks();
    },

    handleCTAClicks: function() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Add any special CTA handling here
                console.log('CTA button clicked');
            });
        });
    },

    // Function to get current status of the Thronglet society
    getStatus: function() {
        return {
            members: 'Growing',
            mission: 'Active',
            collaboration: 'Ongoing',
            blockchain: 'Integrated'
        };
    }
};

// Initialize the app
ThrongletSociety.init();