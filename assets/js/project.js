(async function () {
  await loadImgProject();
  await loadDropDown();

  const projectId = sessionStorage.getItem('projectId');
  const projectName = JSON.parse(sessionStorage.getItem(`config_${projectId}`)).name

  changeText('project-name-title', projectName);
  changeText('project-name-breadcrumb', projectName);

  removeLoading();
})()

async function loadImgProject() {
    let id = 0;
    let continua = true;
    const container = document.querySelector('#project-container');
    const projectId = sessionStorage.getItem('projectId');
  
    while (continua && container) {
      try {
        const url = `assets/project/project_${projectId.toString()}/prj${projectId.toString()}_img${id.toString()}.jpg`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Immagine non trovata');
        const html = `
          <div class="col-lg-12 portfolio-item">
            <img src="${url}" class="img-fluid" alt="">
          </div>`;
        container.innerHTML += html;
        id++;
      } catch (error) {
        continua = false; 
      }
    }
}

async function loadDropDown() {
  let id = 0;
  let continua = true;
  const containerDropDown = document.querySelector('#list-dropdown');
  const projectId = sessionStorage.getItem('projectId');
  
  while (continua && containerDropDown) {
    try {
      const projectName = JSON.parse(sessionStorage.getItem(`config_${id.toString()}`)).name;
      if (!projectName) throw new Error('config non trovata');
      const htmlDropDown = `<li><a class="dropdown-item ${id.toString() == projectId ? 'active' : ''}" href="project.html" onclick="saveIdProject(${id.toString()})">${projectName}</a></li>`
      containerDropDown.innerHTML += htmlDropDown;
      id++;
    } catch (error) {
      continua = false;
    }
  }
}

function changeText (id, text) {
  document.getElementById(id).innerHTML = text;
}