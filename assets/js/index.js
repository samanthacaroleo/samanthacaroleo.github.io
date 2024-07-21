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

async function getGeneric() {
  const url = `assets/project/generic.json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('404');
  const generic = await res.json();
  sessionStorage.setItem(`generic`, JSON.stringify(generic));

  let containerCategory = document.querySelector('#portfolio-flters');
  containerCategory.innerHTML =  `<li onclick="selectetdCategory('all')" class="filter-active filter">All</li>`;
  if(containerCategory){
    generic.category.forEach(item => {
      const htmlCategory = `<li class="filter" onclick="selectetdCategory('${item.toLowerCase().replace(' ', '_')}')">${item}</li>`
      containerCategory.innerHTML += htmlCategory;
    })
  }
}

async function loadData() {
  sessionStorage.clear();
  let id = 0;
  let continua = true;
  const containerPortfolio = document.querySelector('#portfolio-container');
  const containerDropDown = document.querySelector('#list-dropdown');

  while (continua && containerPortfolio && containerDropDown) {
    try {
      const img_url = `assets/project/project_${id.toString()}/_prj${id.toString()}_portfolio.jpg`;
      const config_url = `assets/project/project_${id.toString()}/_prj${id.toString()}_config.json`;

      const res_img = await fetch(img_url);
      if (!res_img.ok) throw new Error('Immagine non trovata');

      const res_config = await fetch(config_url);
      if (!res_config.ok) throw new Error('config non trovata');

      const projectConfig = await res_config.json();
      sessionStorage.setItem(`config_${id.toString()}`, JSON.stringify(projectConfig));

      const htmlPortfolio = `
        <div class="col-lg-4 col-md-6 portfolio-item filter-${projectConfig.category.toLowerCase().replace(' ', '_')}">
          <a href="project.html" onclick="saveIdProject(${id.toString()})" style="position: relative">
            <div class="portfolio-img"><img src="${img_url}" class="img-fluid" alt=""></div>
            <div class="overlay">
              <h4 class="overlay-text">${projectConfig.name}</h4>
            </div>
          </a>
        </div>`;
      containerPortfolio.innerHTML += htmlPortfolio;

      const htmlDropDown = `<li><a class="dropdown-item" href="project.html" onclick="saveIdProject(${id.toString()})">${projectConfig.name}</a></li>`
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
    x.innerHTML.toLowerCase().replace(' ', '_') == category ? x.classList.add("filter-active") : x.classList.remove("filter-active");
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