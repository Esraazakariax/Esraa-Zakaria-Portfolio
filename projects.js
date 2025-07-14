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










