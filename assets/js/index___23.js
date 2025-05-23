function skillAnimation() {
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
}

(async function () {
  "use strict";
  skillAnimation();
  animateHeroSection();

  sessionStorage.clear();
  await getIncId();
  await getGeneric();
  await loadData();
})()

function animateHeroSection() {
  let typing = select('.typing');
  if (typing) {
    new Typed(".typing", {
      strings: ["WEB DEVELOPER", "GRAPHIC DESIGNER",],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }
}

async function getIncId() {
  const url = `assets/incId.txt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('404');
  const incId = await res.json();
  sessionStorage.setItem(`incId`, JSON.stringify(incId));
}


async function getGeneric() {
  const incId = sessionStorage.getItem('incId');
  const url = `assets/project/generic___${incId.toString()}.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('404');
  const generic = await res.json();
  sessionStorage.setItem(`generic`, JSON.stringify(generic));

  let containerCategory = document.querySelector('#portfolio-flters');
  containerCategory.innerHTML =  `<li onclick="selectetdCategory('all')" class="filter-active filter"><span>All</span></li>`;
  if(containerCategory){
    generic.category.forEach(item => {
      const htmlCategory = `<li class="filter" onclick="selectetdCategory('${item.toLowerCase().replace(' ', '_')}')"><span>${item}</span></li>`
      containerCategory.innerHTML += htmlCategory;
    })
  }
}

async function loadData() {
  let id = 0;
  let continua = true;
  const incId = sessionStorage.getItem('incId');
  const containerPortfolio = document.querySelector('#portfolio-container');
  const containerDropDown = document.querySelector('#list-dropdown');

  while (continua && containerPortfolio && containerDropDown) {
    try {
      const config_url = `assets/project/project_${id.toString()}/prj${id.toString()}_config___${incId.toString()}.json`;
      const img_url = `assets/project/project_${id.toString()}/prj${id.toString()}_portfolio___${incId.toString()}.jpg`;

      const res_config = await fetch(config_url);
      if (!res_config.ok) throw new Error('config non trovata');

      const projectConfig = await res_config.json();
      sessionStorage.setItem(`config_${id.toString()}`, JSON.stringify(projectConfig));

      const htmlPortfolio = `
        <div class="col-lg-4 col-md-6 portfolio-item filter-${projectConfig.category.toLowerCase().replace(' ', '_')}">
          <a href="${projectConfig.redirectUrl}" onclick="saveIdProject(${id.toString()})" style="position: relative">
            <div class="portfolio-img"><img src="${img_url}" class="img-fluid" alt="${projectConfig.name} img ${id}"></div>
            <div class="overlay">
              <h4 class="overlay-text">${projectConfig.name}</h4>
            </div>
          </a>
        </div>`;
      containerPortfolio.innerHTML += htmlPortfolio;

      const htmlDropDown = `<li><a class="dropdown-item" href="${projectConfig.redirectUrl}" onclick="saveIdProject(${id.toString()})">${projectConfig.name}</a></li>`
      containerDropDown.innerHTML += htmlDropDown;

      id++;
    } catch (error) {
      continua = false;
    }
  }
  removeLoading();
}

function selectetdCategory(category){
  const filter = document.getElementsByClassName('filter');
  for(let x of filter){
    x.innerHTML.toLowerCase().replace(' ', '_') == `<span>${category}</span>` ? x.classList.add("filter-active") : x.classList.remove("filter-active");
  }

  const all = document.getElementsByClassName('portfolio-item');
  for(let x of all){
    x.style.display = category == 'all' ? 'block' : 'none';
  }

  const elements = document.getElementsByClassName('filter-' + category);
  for(let x of elements){
    x.style.display = 'block';
  }
}