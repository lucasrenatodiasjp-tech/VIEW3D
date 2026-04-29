const DEFAULT_PROJECTS = [
  {
    id: Date.now(),
    title: "MÓDULO ALPHA-01",
    description: "ESTRUTURA DE ALTA RESISTÊNCIA PARA AMBIENTES CORPORATIVOS. ACABAMENTO EM FIBRA DE CARBONO E POLÍMERO DE ALTA DENSIDADE.",
    measures: "200x90x110cm",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    imageUrl: "https://placehold.co/1200x800/000000/00f3ff?text=PLANTA+TECNICA+A1",
    extraAttributes: 'camera-orbit="45deg 75deg 2.5m" auto-rotate',
    exposure: 1,
    shadowIntensity: 1
  }
];

let projects = JSON.parse(localStorage.getItem('view3d_projects')) || DEFAULT_PROJECTS;

function saveProjects() {
  localStorage.setItem('view3d_projects', JSON.stringify(projects));
}

// --- CORE FUNCTIONS ---

function createProjectItem(project) {
  const item = document.createElement('div');
  item.className = 'product-item';
  item.dataset.id = project.id;
  
  // Create a template for model-viewer to safely inject attributes
  const viewerHtml = `
    <model-viewer 
      id="viewer-${project.id}"
      src="${project.modelUrl}" 
      alt="${project.title}" 
      camera-controls 
      ar
      ar-modes="webxr scene-viewer quick-look"
      environment-image="neutral"
      exposure="${project.exposure || 1}"
      shadow-intensity="${project.shadowIntensity || 1}"
      ${project.extraAttributes || ''}
    >
      <button slot="ar-button" class="ar-button">VIEW IN AR [MOBILE]</button>
    </model-viewer>
  `;

  item.innerHTML = `
    <div class="viewer-wrapper">
      <div class="content-frame">
        ${viewerHtml}
        <img src="${project.imageUrl}" class="measure-image" id="img-${project.id}" alt="ESQUEMA TÉCNICO">
        
        <button class="expand-btn" title="FULLSCREEN VIEW">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </button>
      </div>
      
      <div class="nav-arrows">
        <button class="arrow-btn prev-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button class="arrow-btn next-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
    
    <div class="product-info">
      <h2>${project.title}</h2>
      <p class="description">${project.description}</p>
      <div class="specs">
        <div class="spec-row">
          <span class="spec-label">COORDINATES / DIMENSIONS</span>
          <span class="spec-value">${project.measures}</span>
        </div>
        <div class="spec-row">
          <span class="spec-label">SYSTEM_STATUS</span>
          <span class="spec-value">OPERATIONAL</span>
        </div>
      </div>
      <div style="margin-top: 2rem; display: flex; gap: 1rem;">
        <button class="edit-btn" style="background: transparent; border: 1px solid var(--accent); color: var(--accent); cursor: pointer; font-family: 'Roboto Mono', monospace; font-size: 0.6rem; padding: 5px 15px;">[EDIT_PROJECT]</button>
        <button class="delete-btn" style="background: transparent; border: 1px solid #333; color: #333; cursor: pointer; font-family: 'Roboto Mono', monospace; font-size: 0.6rem; padding: 5px 15px;">[TERMINATE]</button>
      </div>
    </div>
  `;
  
  // Elements
  const prevBtn = item.querySelector('.prev-btn');
  const nextBtn = item.querySelector('.next-btn');
  const expandBtn = item.querySelector('.expand-btn');
  const viewer = item.querySelector('model-viewer');
  const img = item.querySelector('.measure-image');
  
  let show3D = true;
  function toggle() {
    show3D = !show3D;
    viewer.classList.toggle('hidden', !show3D);
    img.classList.toggle('active', !show3D);
  }
  
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
  
  // Dedicated Fullscreen Button
  expandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (show3D) {
      openFullscreen(project.modelUrl, '3d', project.extraAttributes, project.exposure, project.shadowIntensity);
    } else {
      openFullscreen(project.imageUrl, 'image');
    }
  });

  // Edit project
  item.querySelector('.edit-btn').addEventListener('click', () => {
    populateFormForEdit(project);
  });

  // Delete project
  item.querySelector('.delete-btn').addEventListener('click', () => {
    if (confirm('TERMINATE PROJECT DATA?')) {
      projects = projects.filter(p => p.id !== project.id);
      saveProjects();
      renderGallery();
    }
  });
  
  return item;
}

const gallery = document.getElementById('gallery');

function renderGallery() {
  gallery.innerHTML = '';
  projects.forEach(p => gallery.appendChild(createProjectItem(p)));
}

// --- FULLSCREEN LOGIC ---
const fsOverlay = document.getElementById('fullscreen-overlay');
const fsContainer = document.getElementById('fs-container');
const closeFs = document.getElementById('close-fs');

function openFullscreen(url, type, extraAttributes = '', exposure = 1, shadowIntensity = 1) {
  if (type === '3d') {
    fsContainer.innerHTML = `
      <model-viewer 
        src="${url}" 
        camera-controls 
        style="width: 100%; height: 100%;"
        exposure="${exposure}"
        shadow-intensity="${shadowIntensity}"
        environment-image="neutral"
        ${extraAttributes}
      ></model-viewer>
    `;
  } else {
    fsContainer.innerHTML = `
      <img src="${url}" style="width: 100%; height: 100%; object-fit: contain; padding: 2rem;">
    `;
  }
  fsOverlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

closeFs.addEventListener('click', () => {
  fsOverlay.classList.add('hidden');
  document.body.style.overflow = 'auto';
  fsContainer.innerHTML = '';
});

// --- ADMIN LOGIC ---
const toggleAdmin = document.getElementById('toggle-admin');
const adminPanel = document.getElementById('admin-panel');
const addForm = document.getElementById('add-project-form');
const adminTitle = adminPanel.querySelector('h2');
const submitBtn = addForm.querySelector('.submit-btn');

let editingProjectId = null;

toggleAdmin.addEventListener('click', () => {
  resetForm();
  adminPanel.classList.toggle('hidden');
});

function populateFormForEdit(project) {
  editingProjectId = project.id;
  document.getElementById('p-title').value = project.title;
  document.getElementById('p-desc').value = project.description;
  document.getElementById('p-measures').value = project.measures;
  document.getElementById('p-glb-url').value = project.modelUrl.startsWith('data:') ? '' : project.modelUrl;
  document.getElementById('p-img-url').value = project.imageUrl.startsWith('data:') ? '' : project.imageUrl;
  document.getElementById('p-extra').value = project.extraAttributes || '';
  document.getElementById('p-exposure').value = project.exposure || 1;
  document.getElementById('p-shadow').value = project.shadowIntensity || 1;
  
  // Update labels
  document.querySelector('.exp-val').innerText = project.exposure || 1;
  document.querySelector('.shd-val').innerText = project.shadowIntensity || 1;

  adminTitle.innerText = "EDIT PROJECT";
  submitBtn.innerText = "UPDATE PROJECT";
  adminPanel.classList.remove('hidden');
  adminPanel.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
  editingProjectId = null;
  addForm.reset();
  document.querySelector('.exp-val').innerText = "1";
  document.querySelector('.shd-val').innerText = "1";
  adminTitle.innerText = "ADD NEW PROJECT";
  submitBtn.innerText = "REGISTER PROJECT";
}

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const title = document.getElementById('p-title').value;
  const desc = document.getElementById('p-desc').value;
  const measures = document.getElementById('p-measures').value;
  const extraAttributes = document.getElementById('p-extra').value;
  const exposure = parseFloat(document.getElementById('p-exposure').value);
  const shadowIntensity = parseFloat(document.getElementById('p-shadow').value);
  
  const glbFile = document.getElementById('p-glb').files[0];
  const glbUrl = document.getElementById('p-glb-url').value;
  const imgFile = document.getElementById('p-img').files[0];
  const imgUrl = document.getElementById('p-img-url').value;

  let finalGlb = glbUrl;
  let finalImg = imgUrl;

  // Preserve existing if not changed and it was data URL
  if (editingProjectId) {
    const existing = projects.find(p => p.id === editingProjectId);
    if (!finalGlb && existing.modelUrl.startsWith('data:')) finalGlb = existing.modelUrl;
    if (!finalImg && existing.imageUrl.startsWith('data:')) finalImg = existing.imageUrl;
  }

  if (!finalGlb && !glbFile) finalGlb = "https://modelviewer.dev/shared-assets/models/Astronaut.glb";
  if (!finalImg && !imgFile) finalImg = "https://placehold.co/1200x800/000000/00f3ff?text=PLANTA+TECNICA";

  if (glbFile) finalGlb = await fileToBase64(glbFile);
  if (imgFile) finalImg = await fileToBase64(imgFile);

  const projectData = { 
    title, 
    description: desc, 
    measures, 
    modelUrl: finalGlb, 
    imageUrl: finalImg, 
    extraAttributes,
    exposure,
    shadowIntensity
  };

  if (editingProjectId) {
    const index = projects.findIndex(p => p.id === editingProjectId);
    projects[index] = { ...projects[index], ...projectData };
  } else {
    projects.push({ id: Date.now(), ...projectData });
  }

  saveProjects();
  renderGallery();
  resetForm();
  adminPanel.classList.add('hidden');
});

// Slider values feedback
document.getElementById('p-exposure').addEventListener('input', (e) => {
  document.querySelector('.exp-val').innerText = e.target.value;
});
document.getElementById('p-shadow').addEventListener('input', (e) => {
  document.querySelector('.shd-val').innerText = e.target.value;
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Initial Render
renderGallery();
console.log('VIEW3D SYSTEM INITIALIZED [CORE_V1]');
