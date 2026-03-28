document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerMenu && navMenu) {
    hamburgerMenu.addEventListener('click', () => {
      const expanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
      hamburgerMenu.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerMenu.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    return;
  }

  const responseMessage = document.getElementById('responseMessage');
  const submitBtn = document.getElementById('submitBtn');

  const validators = {
    name(value) {
      if (!value || value.trim().length < 2) {
        return 'Name must be at least 2 characters.';
      }
      return '';
    },
    email(value) {
      if (!value || !isValidEmail(value.trim())) {
        return 'Please enter a valid email address.';
      }
      return '';
    },
    phone(value) {
      if (!value) {
        return '';
      }
      if (!/^[0-9+()\-\s]{7,20}$/.test(value.trim())) {
        return 'Please enter a valid phone number.';
      }
      return '';
    },
    message(value) {
      if (!value || value.trim().length < 10) {
        return 'Message must be at least 10 characters.';
      }
      return '';
    }
  };

  const fieldIds = ['name', 'email', 'phone', 'message'];

  function showFieldError(fieldId, error) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (!input || !errorEl) return;

    if (error) {
      input.classList.add('error');
      errorEl.textContent = error;
    } else {
      input.classList.remove('error');
      errorEl.textContent = '';
    }
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return true;
    const error = validators[fieldId](input.value);
    showFieldError(fieldId, error);
    return !error;
  }

  function validateForm() {
    return fieldIds.map(validateField).every(Boolean);
  }

  fieldIds.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    input.addEventListener('blur', () => {
      validateField(fieldId);
    });

    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(fieldId);
      }
      if (responseMessage) {
        responseMessage.textContent = '';
      }
    });
  });

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (responseMessage) {
      responseMessage.textContent = '';
    }

    const honeypot = contactForm.querySelector('input[name="_hp"]');
    if (honeypot && honeypot.value !== '') {
      return;
    }

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    if (!submitBtn) {
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    const data = new URLSearchParams();
    for (const [key, value] of formData) {
      data.append(key, String(value));
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch('/__forms/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const basePath = document.querySelector('meta[name="astro-base"]')?.getAttribute('content') || '/';
      const thankYouPath = `${basePath.replace(/\/$/, '')}/thank-you/`;
      window.location.href = thankYouPath;
    } catch (error) {
      console.error('Form submission failed:', error);
      submitBtn.setAttribute('aria-busy', 'false');
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      if (responseMessage) {
        responseMessage.textContent = 'Server error. Please try again.';
      }
    } finally {
      clearTimeout(timeoutId);
    }
  });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
