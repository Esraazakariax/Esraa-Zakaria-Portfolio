document.addEventListener("DOMContentLoaded", () => {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const texts = document.querySelectorAll(".slider-text");
    let index = 0;

    function slideUp() {
        index = (index + 1) % texts.length;
        sliderWrapper.style.transform = `translateY(-${index * 50}px)`; // Adjust to match height
    }

    setInterval(slideUp, 3000); // Change text every 3 seconds
});





let lastScrollY = window.scrollY;

// Restore visible elements from localStorage on page load
document.querySelectorAll('.scrolll').forEach((el, index) => {
  const wasVisible = localStorage.getItem(`scrolll-visible-${index}`);
  if (wasVisible === 'true') {
    el.classList.add('show');
    el.classList.remove('hide');
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    const el = entry.target;

    if (entry.isIntersecting) {
      if (window.scrollY > lastScrollY) {
        // Scrolling down — fade in + slide up
        el.classList.add('show');
        el.classList.remove('hide');

        // Save this element as visible
        const idx = Array.from(document.querySelectorAll('.scrolll')).indexOf(el);
        localStorage.setItem(`scrolll-visible-${idx}`, 'true');
      }
    } else {
      if (window.scrollY < lastScrollY) {
        // Scrolling up — fade out + slide down
        el.classList.remove('show');
        el.classList.add('hide');

        // Optionally remove it from saved state (optional)
        const idx = Array.from(document.querySelectorAll('.scrolll')).indexOf(el);
        localStorage.removeItem(`scrolll-visible-${idx}`);
      }
    }
  });

  lastScrollY = window.scrollY;
}, {
  root: null,
  rootMargin: '0px 0px -20% 0px',
  threshold: 0
});

document.querySelectorAll('.scrolll').forEach(el => {
  observer.observe(el);
});







const cursor = document.getElementById('cursor');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.1; // Adjust for smoothness (lower = smoother but slower)

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Optional: click animation
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});










window.addEventListener('load', () => {
  const SPEED = 60;           // pixels / second  (lower = faster)

  const track   = document.getElementById('track');

  /* 1️⃣  Measure one full copy before duplicating */
  const loopWidth = track.scrollWidth;      // 4 images × 30 px = 120 px here

  /* 2️⃣  Duplicate exactly once */
  track.appendChild(track.cloneNode(true));

  /* 3️⃣  Build the keyframes dynamically */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes marquee-right {
      0%   { transform: translateX(-${loopWidth}px); }
      100% { transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);

  /* 4️⃣  Set the animation on the track */
  const duration = loopWidth / SPEED;       // seconds = distance / speed
  track.style.animation = `marquee-right ${duration}s linear infinite`;
});














// Ultra Smooth + No Lag Scroll (for desktops/laptops)
(function () {
  let scrollY = window.scrollY;
  let currentY = window.scrollY;
  let isTicking = false;

  const easeFactor = 0.07;

  function smoothStep() {
    const diff = scrollY - currentY;
    currentY += diff * easeFactor;

    // Clamp to prevent over-scrolling
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    currentY = Math.max(0, Math.min(currentY, maxScroll));

    window.scrollTo(0, currentY);

    if (Math.abs(diff) > 0.5) {
      requestAnimationFrame(smoothStep);
    } else {
      isTicking = false;
    }
  }

  function scrollByAmount(amount) {
    scrollY += amount;

    // Clamp scroll target
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollY = Math.max(0, Math.min(scrollY, maxScroll));

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(smoothStep);
    }
  }

  // Mouse wheel or trackpad
  window.addEventListener("wheel", (e) => {
    e.preventDefault();
    scrollByAmount(e.deltaY);
  }, { passive: false });

  // Keyboard scrolling
  window.addEventListener("keydown", (e) => {
    const amount = 80;
    if (["ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      scrollByAmount(amount);
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      scrollByAmount(-amount);
    }
  });
})();









const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});
