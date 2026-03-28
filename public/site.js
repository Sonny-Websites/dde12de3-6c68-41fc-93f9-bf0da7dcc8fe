// Set dynamic copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Mobile hamburger menu toggle
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous error messages
            ['name', 'email', 'message'].forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const errorSpan = document.getElementById(fieldId + 'Error');
                if (field) {
                    field.classList.remove('error');
                    if (errorSpan) {
                        errorSpan.textContent = '';
                    }
                }
            });

            // Validate form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;

            if (!name) {
                document.getElementById('name').classList.add('error');
                document.getElementById('nameError').textContent = 'Name is required';
                isValid = false;
            }

            if (!email) {
                document.getElementById('email').classList.add('error');
                document.getElementById('emailError').textContent = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email').classList.add('error');
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }

            if (!message) {
                document.getElementById('message').classList.add('error');
                document.getElementById('messageError').textContent = 'Message is required';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('message').classList.add('error');
                document.getElementById('messageError').textContent = 'Message must be at least 10 characters long';
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            // Honeypot check
            if (document.querySelector('input[name="_hp"]').value !== '') {
                return;
            }

            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.textContent;
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Prepare form data
            const formData = new FormData(this);
            const data = new URLSearchParams();
            for (let [key, value] of formData) {
                data.append(key, value);
            }

            // Submit form (use current origin for static deploy)
            const thankYouUrl = new URL('/thank-you/', window.location.origin).pathname;
            fetch('/__forms/contact', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: data
            })
            .then(response => response.json())
            .then(result => {
                window.location.href = thankYouUrl;
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.setAttribute('aria-busy', 'false');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                document.getElementById('responseMessage').innerHTML = '<p style="color: #e74c3c;">Sorry, there was an error sending your message. Please try again.</p>';
            });
        });
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (!email || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.disabled = true;

            // Reset after 2 seconds
            setTimeout(() => {
                emailInput.value = '';
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
    }
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll animation observer
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(element => {
        observer.observe(element);
    });
}

// Call scroll animation on page load
document.addEventListener('DOMContentLoaded', animateOnScroll);
