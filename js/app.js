/**
 * APP.JS - Master Application Controller
 * Micro-interactions, Paweł grid cursor glow, scroll reveals, live clock, 1-click email copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Scroll-Triggered Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-init');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 2. Active Nav Link on Scroll
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 180;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
    });

    mobileNavDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileNavDrawer.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Paweł-Style Hero Grid Cursor Spotlight Tracking
  // --------------------------------------------------------------------------
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--mouse-x', `${x}px`);
      heroSection.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Bento Box Cursor Spotlight Tracking
  // --------------------------------------------------------------------------
  const bentoCards = document.querySelectorAll('.bento-card');
  bentoCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // --------------------------------------------------------------------------
  // 6. Live Clock (Raipur / IST - GMT+5:30)
  // --------------------------------------------------------------------------
  const clockElement = document.getElementById('status-clock');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    clockElement.textContent = `${now.toLocaleTimeString('en-US', options)} IST`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // --------------------------------------------------------------------------
  // 7. 1-Click Copy Email with Tactile Feedback
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'akshatgupta1306@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--cyan-signature);"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Copied to Clipboard!</span>
        `;
        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = originalContent;
        }, 2200);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 8. Portrait Slider
  // --------------------------------------------------------------------------
  const sliderImages = document.querySelectorAll('.portrait-slider img');
  if (sliderImages.length > 0) {
    let currentImg = 0;
    setInterval(() => {
      sliderImages[currentImg].classList.remove('active');
      currentImg = (currentImg + 1) % sliderImages.length;
      sliderImages[currentImg].classList.add('active');
    }, 4000);
  }

  // --------------------------------------------------------------------------
  // 9. Contact Form Modal
  // --------------------------------------------------------------------------
  const contactModal = document.getElementById('contact-modal');
  const openModalBtns = document.querySelectorAll('.open-contact-modal');
  const closeModalBtn = document.querySelector('.close-modal-btn');

  if (contactModal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('show');
      });
    });

    closeModalBtn.addEventListener('click', () => {
      contactModal.classList.remove('show');
    });

    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('show');
      }
    });

    const contactForm = document.getElementById('contact-form-internal');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzP9YlvSPL9O0BYKT31qMUUB2TtcwdLuIxCzIBilC8J9E7Hl5D-UqyA3G8RmkYOqEh3iQ/exec';
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
          .then(response => {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;

            // Trigger Confetti Burst (The "Party Balloons" effect)
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                zIndex: 10001,
                colors: ['#00E5FF', '#ffffff', '#A8B5B9']
              });
            }

            setTimeout(() => {
              alert('Thank you! Your message has been sent successfully.');
              contactForm.reset();
              contactModal.classList.remove('show');
            }, 400);
          })
          .catch(error => {
            console.error('Error!', error.message);
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            alert('Oops! Something went wrong. Please try again.');
          });
      });
    }
  }
});
