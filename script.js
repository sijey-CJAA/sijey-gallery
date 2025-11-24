document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('modeToggle');
  const navbar = document.getElementById('navbar');
  const wrapper = document.getElementById('contentWrapper');
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

  // --- CHARACTER CARDS WITH NAME, GENDER, ROLE, AND SPOILER COLLAPSE ---
  fetch('characters.json')
    .then(response => response.json())
    .then(characters => {
      var container = document.getElementById("characters");
      for (var i = 0; i < characters.length; i++) {
        const collapseId = `spoiler${i}`;
        container.innerHTML += `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
            <div class="card shadow-sm" style="width: 500px; height: 500px;">
              <img src="${characters[i].image}" class="card-img-top" alt="${characters[i].name}" 
                   style="height: 300px; object-fit: cover;">
              <div class="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 class="card-title">${characters[i].name}</h5>
                  <p class="card-text">${characters[i].gender}, ${characters[i].role}</p>
                </div>
                <button class="btn btn-warning mt-2" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                  Spoiler
                </button>
                <div class="collapse mt-2" id="${collapseId}">
                  <div class="card card-body">
                    <p>${characters[i].spoiler}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch(error => console.error('MAY MALI:', error));
});
