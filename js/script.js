/* ==============================================
   PESONA MALUKU - SCRIPT.JS
   Vanilla JavaScript ES6+
   Fitur: Mobile Menu, Sticky Navbar, Smooth Scroll,
          FAQ Accordion, Form Validation, Scroll Reveal,
          Back to Top
   ============================================== */

'use strict';

/* ==============================================
   1. MOBILE MENU TOGGLE
   ============================================== */
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

// Buat overlay element untuk mobile
const overlay = document.createElement('div');
overlay.classList.add('navbar-overlay');
document.body.appendChild(overlay);

navbarToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
  overlay.classList.toggle('active');

  // Ganti icon hamburger / close
  const icon = navbarToggle.querySelector('i');
  if (navbarMenu.classList.contains('active')) {
    icon.className = 'fas fa-times';
  } else {
    icon.className = 'fas fa-bars';
  }
});

// Tutup menu saat overlay diklik
overlay.addEventListener('click', () => {
  navbarMenu.classList.remove('active');
  overlay.classList.remove('active');
  navbarToggle.querySelector('i').className = 'fas fa-bars';
});

// Tutup menu saat link diklik (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navbarMenu.classList.remove('active');
    overlay.classList.remove('active');
    navbarToggle.querySelector('i').className = 'fas fa-bars';
  });
});

/* ==============================================
   2. STICKY NAVBAR
   ============================================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ==============================================
   3. SMOOTH SCROLLING (fallback untuk browser lama)
   ============================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ==============================================
   4. FAQ ACCORDION
   ============================================== */
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');

    // Tutup semua FAQ lain
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
    });

    // Buka FAQ yang diklik jika sebelumnya tertutup
    if (!isActive) {
      faqItem.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ==============================================
   5. FORM VALIDATION
   ============================================== */
const form = document.getElementById('kontakForm');

// Elemen form
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const pesanInput = document.getElementById('pesan');
const namaError = document.getElementById('namaError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const pesanError = document.getElementById('pesanError');

// Helper: tampilkan error
function showError(input, errorEl) {
  input.classList.add('error');
  errorEl.classList.add('show');
}

// Helper: sembunyikan error
function hideError(input, errorEl) {
  input.classList.remove('error');
  errorEl.classList.remove('show');
}

// Validasi real-time saat user mengetik
namaInput.addEventListener('input', () => {
  if (namaInput.value.trim().length >= 3) {
    hideError(namaInput, namaError);
  }
});

emailInput.addEventListener('input', () => {
  if (emailInput.value.includes('@') && emailInput.value.includes('.')) {
    hideError(emailInput, emailError);
  }
});

phoneInput.addEventListener('input', () => {
  const phone = phoneInput.value.replace(/\D/g, '');
  if (phone.length >= 10 && phone.length <= 15) {
    hideError(phoneInput, phoneError);
  }
});

pesanInput.addEventListener('input', () => {
  if (pesanInput.value.trim().length >= 10) {
    hideError(pesanInput, pesanError);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  // Validasi nama (min 3 karakter)
  const nama = namaInput.value.trim();
  if (nama.length < 3) {
    showError(namaInput, namaError);
    isValid = false;
  } else {
    hideError(namaInput, namaError);
  }

  // Validasi email (harus mengandung @ dan .)
  const email = emailInput.value.trim();
  if (!email.includes('@') || !email.includes('.')) {
    showError(emailInput, emailError);
    isValid = false;
  } else {
    hideError(emailInput, emailError);
  }

  // Validasi no handphone (10-15 digit angka)
  const phone = phoneInput.value.replace(/\D/g, '');
  if (phone.length < 10 || phone.length > 15) {
    showError(phoneInput, phoneError);
    isValid = false;
  } else {
    hideError(phoneInput, phoneError);
  }

  // Validasi pesan (min 10 karakter)
  const pesan = pesanInput.value.trim();
  if (pesan.length < 10) {
    showError(pesanInput, pesanError);
    isValid = false;
  } else {
    hideError(pesanInput, pesanError);
  }

  // Jika semua valid, tampilkan pesan sukses
  if (isValid) {
    const formContainer = document.querySelector('.kontak-form');
    formContainer.innerHTML = `
      <div class="form-success" style="display: block;">
        <i class="fas fa-check-circle"></i>
        <h3>Pesan Terkirim!</h3>
        <p>Terima kasih telah menghubungi Pesona Maluku.<br />Tim kami akan merespon pesan Anda dalam 1x24 jam.</p>
      </div>
    `;
  }
});

/* ==============================================
   6. SCROLL REVEAL ANIMATION
   ============================================== */
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Tambah delay bertahap untuk elemen berurutan
      const siblings = entry.target.parentElement.querySelectorAll('.scroll-reveal');
      const index = Array.from(siblings).indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.1}s`;

      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==============================================
   7. BACK TO TOP BUTTON
   ============================================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
