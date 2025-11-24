// script.js — move your navbar/night-mode JS here
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('modeToggle');
  const navbar = document.getElementById('navbar');
  const wrapper = document.getElementById('contentWrapper'); // optional, only if present
  const html = document.documentElement;

  function applyDark() {
    html.setAttribute('data-bs-theme', 'dark');
    if (wrapper) {
      wrapper.style.background = "url('pics/fuji_night.jpg') no-repeat center center fixed";
      wrapper.style.backgroundSize = 'cover';
    }
    if (navbar) {
      navbar.style.background = "rgba(0, 0, 0, 0.4)";
      navbar.style.border = "1px solid rgba(255,255,255,0.2)";
    }
    if (button) button.textContent = '☀️ Light';
  }

  function applyLight() {
    html.setAttribute('data-bs-theme', 'light');
    if (wrapper) {
      wrapper.style.background = "url('pics/fuji_morning.jpg') no-repeat center center fixed";
      wrapper.style.backgroundSize = 'cover';
    }
    if (navbar) {
      navbar.style.background = "rgba(255, 255, 255, 0.6)";
      navbar.style.border = "1px solid rgba(255,255,255,0.3)";
    }
    if (button) button.textContent = '🌙 Night';
  }

  // Initialize theme from localStorage
  if (localStorage.getItem('theme') === 'dark') {
    applyDark();
  } else {
    applyLight();
  }

  // Toggle on button click
  if (button) {
    button.addEventListener('click', () => {
      const isLight = html.getAttribute('data-bs-theme') === 'light';
      if (isLight) applyDark();
      else applyLight();
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
  }
});