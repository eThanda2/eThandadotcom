/**
 * eThanda Technologies - Modern Web Shell Logic
 * Core interactions, animations, and form validations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initScrollAnimations();
  initCareersModal();
  initForms();
  highlightActiveLink();
});

/* ==========================================
   NAVIGATION BAR EFFECT
   ========================================== */
function initNavbar() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   MOBILE NAVIGATION MENU
   ========================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = toggleBtn.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      const spans = toggleBtn.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

/* ==========================================
   INTERSECTION OBSERVER SCROLL REVEALS
   ========================================== */
function initScrollAnimations() {
  // Elements to reveal on scroll
  const revealElements = document.querySelectorAll('.service-card, .stat-card, .location-card, .detail-card, .role-card, .timeline-item, .cta-panel, .meaning-block, .contact-grid');
  
  if (revealElements.length === 0) return;

  // Add initial reveal styles
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   CAREERS RECRUITMENT APPLY MODAL
   ========================================== */
function initCareersModal() {
  const modal = document.getElementById('applyModal');
  const applyButtons = document.querySelectorAll('.btn-apply');
  const closeBtn = document.querySelector('.modal-close');
  const jobTitleInput = document.getElementById('jobTitleInput');

  if (!modal || applyButtons.length === 0 || !closeBtn) return;

  applyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const jobName = btn.getAttribute('data-job');
      if (jobTitleInput && jobName) {
        jobTitleInput.value = jobName;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================
   FORMS & REALTIME VALDATION
   ========================================== */
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending message...';
      
      // Simulate form submission
      setTimeout(() => {
        showSuccessNotification('Message Sent Successfully!', 'Thank you for contacting eThanda Technologies. We will get back to you shortly.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }

  // Application Form
  const applicationForm = document.getElementById('applicationForm');
  if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const modal = document.getElementById('applyModal');
      const submitBtn = applicationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting application...';
      
      // Simulate submission
      setTimeout(() => {
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
        showSuccessNotification('Application Submitted!', 'Thank you for applying to eThanda Technologies. Our recruitment team will review your profile.');
        applicationForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1800);
    });
  }
}

/* ==========================================
   DYNAMIC POPUP SUCCESS TOAST
   ========================================== */
function showSuccessNotification(title, message) {
  const toast = document.createElement('div');
  
  // Style toast dynamically
  toast.style.position = 'fixed';
  toast.style.bottom = '30px';
  toast.style.right = '30px';
  toast.style.background = 'hsl(222, 40%, 12%)';
  toast.style.border = '1px solid hsl(184, 100%, 50%)';
  toast.style.boxShadow = '0 8px 32px 0 rgba(0, 242, 254, 0.25)';
  toast.style.borderRadius = '12px';
  toast.style.padding = '1.5rem 2rem';
  toast.style.zIndex = '3000';
  toast.style.maxWidth = '380px';
  toast.style.opacity = '0';
  toast.style.transform = 'translateY(20px)';
  toast.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  toast.style.backdropFilter = 'blur(12px)';
  toast.style.webkitBackdropFilter = 'blur(12px)';

  toast.innerHTML = `
    <h4 style="color: hsl(184, 100%, 50%); font-family: Outfit, sans-serif; font-size: 1.15rem; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      ${title}
    </h4>
    <p style="color: hsl(210, 20%, 95%); font-size: 0.85rem; line-height: 1.4;">${message}</p>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Remove notification after 5 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 5000);
}

/* ==========================================
   HIGHLIGHT ACTIVE PAGE NAVIGATION
   ========================================== */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  const navItems = document.querySelectorAll('.nav-links > li');
  if (navItems.length === 0) return;

  navItems.forEach(item => {
    item.classList.remove('active');
    
    const link = item.querySelector('a');
    if (!link) return;
    
    const linkHref = link.getAttribute('href');
    
    // Check main links
    if (pageName === '' && linkHref === 'index.html') {
      item.classList.add('active');
    } else if (pageName && linkHref === pageName) {
      item.classList.add('active');
    } else if (item.classList.contains('dropdown')) {
      // Check sub-menu links for corporate dropdown
      const subLinks = item.querySelectorAll('.dropdown-menu a');
      subLinks.forEach(subLink => {
        if (subLink.getAttribute('href') === pageName) {
          item.classList.add('active');
        }
      });
    }
  });
}
