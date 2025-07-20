const titles = [
  "A Software Engineer",
  "An AI/ML Enthusiast",
  "A Data Storyteller",
  "A Full Stack Developer",
  "A Tech Explorer"
];
let titleIndex = 0;
let charIndex = 0;
const speed = 100;
const eraseSpeed = 50;
const delayBetween = 1500;
const textElement = document.getElementById("dynamic-text");
function type() {
  if (charIndex < titles[titleIndex].length) {
    textElement.textContent += titles[titleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, speed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    textElement.textContent = titles[titleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    titleIndex = (titleIndex + 1) % titles.length;   // ← fixed
    setTimeout(type, speed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setTimeout(type, 1000);
});

/* ========= Certificates carousel + modal ========= */
document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Splide carousel ---------- */
  const splide = new Splide('#certificate-carousel', {
    type: 'loop',
    perPage: 3,
    perMove: 1,                // ← move only 1 at a time
    gap: '1.5rem',
    breakpoints: {
      1024: { perPage: 2 },
      640: { perPage: 1 }
    },
    autoplay: true,             // auto-play enabled
    interval: 2000,             // 2-second interval
    pauseOnHover: true,
    pauseOnFocus: true,
    pagination: true,
    arrows: true,
    speed: 600
  });
  splide.mount();

  /* ---------- Full-size modal ---------- */
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-full-img');
  const closeBtn = document.querySelector('.cert-close');

  // --- open modal ---
  document.querySelectorAll('.cert-slide').forEach(slide => {
    slide.addEventListener('click', () => {
      // pick the *real* path: either <img>.src or data-img if you prefer
      const imgEl = slide.querySelector('img.cert-thumb');
      modalImg.src = imgEl.src;       // always the correct path
      modal.classList.add('open');
      splide.Components.Autoplay.pause();
    });
  });

  // --- close modal ---
  const closeModal = () => {
    modal.classList.remove('open');
    splide.Components.Autoplay.play();
  };
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Animate On Scroll (AOS) ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

/* ---------- Hamburger toggle ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('is-active');
});

/* Close menu on link click (mobile) */
document.querySelectorAll('.nav-link a').forEach(link =>
  link.addEventListener('click', () => navMenu.classList.remove('active'))
);

/* ---------- Theme switcher ---------- */
const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

applyTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});