document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('modeToggle');
  const navbar = document.getElementById('navbar');
  const wrapper = document.getElementById('contentWrapper');
  const html = document.documentElement;

  // --- NIGHT/LIGHT MODE ---
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
    if (button) button.textContent = '☀️';
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
    if (button) button.textContent = '🌑';
  }

  if (localStorage.getItem('theme') === 'dark') applyDark();
  else applyLight();

  if (button) {
    button.addEventListener('click', () => {
      const isLight = html.getAttribute('data-bs-theme') === 'light';
      if (isLight) applyDark();
      else applyLight();
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
  }

  // --- HUMAN CHARACTERS ---
  fetch('characters.json')
    .then(response => response.json())
    .then(characters => {
      const container = document.getElementById("characters");
      characters.forEach((char, i) => {
        const collapseId = `humanSpoiler${i}`;
        container.innerHTML += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div class="card shadow-sm" style="width: 500px; height: 500px;">
              <img src="${char.image}" class="card-img-top" alt="${char.name}" style="height:300px; object-fit:cover;">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${char.name}</h5>
                  <p class="card-text">${char.gender}, ${char.role}</p>
                </div>
                <button class="btn btn-warning mt-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                  Spoiler
                </button>
                <div class="collapse mt-2" id="${collapseId}">
                  <div class="card card-body">
                    <p>${char.spoiler}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => console.error('Error loading Humans:', error));

  // --- TITANS ---
  fetch('titans.json')
    .then(response => response.json())
    .then(titans => {
      const container = document.getElementById("titans-container");
      titans.forEach((titan, i) => {
        const collapseId = `titanSpoiler${i}`;
        container.innerHTML += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div class="card shadow-sm" style="width: 500px; height: 500px;">
              <img src="${titan.image}" class="card-img-top" alt="${titan.name}" style="height:300px; object-fit:cover;">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${titan.name}</h5>
                  <p class="card-text">${titan.type}</p>
                </div>
                <button class="btn btn-warning mt-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                  Spoiler (Holder)
                </button>
                <div class="collapse mt-2" id="${collapseId}">
                  <div class="card card-body">
                    <p>Holder: ${titan.holder}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    })
    .catch(error => console.error('Error loading Titans:', error));
});
