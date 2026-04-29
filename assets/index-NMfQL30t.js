(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:Date.now(),title:`MÓDULO ALPHA-01`,description:`ESTRUTURA DE ALTA RESISTÊNCIA PARA AMBIENTES CORPORATIVOS. ACABAMENTO EM FIBRA DE CARBONO E POLÍMERO DE ALTA DENSIDADE.`,measures:`200x90x110cm`,modelUrl:`https://modelviewer.dev/shared-assets/models/Astronaut.glb`,imageUrl:`https://placehold.co/1200x800/000000/00f3ff?text=PLANTA+TECNICA+A1`}],t=JSON.parse(localStorage.getItem(`view3d_projects`))||e;function n(){localStorage.setItem(`view3d_projects`,JSON.stringify(t))}function r(e){let r=document.createElement(`div`);r.className=`product-item`,r.dataset.id=e.id,r.innerHTML=`
    <div class="viewer-wrapper">
      <div class="content-frame">
        <model-viewer 
          id="viewer-${e.id}"
          src="${e.modelUrl}" 
          alt="${e.title}" 
          auto-rotate 
          camera-controls 
          ar
          ar-modes="webxr scene-viewer quick-look"
          shadow-intensity="1"
          environment-image="neutral"
          exposure="1"
        >
          <button slot="ar-button" class="ar-button">VIEW IN AR [MOBILE]</button>
        </model-viewer>
        <img src="${e.imageUrl}" class="measure-image" id="img-${e.id}" alt="ESQUEMA TÉCNICO">
        
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
      <h2>${e.title}</h2>
      <p class="description">${e.description}</p>
      <div class="specs">
        <div class="spec-row">
          <span class="spec-label">COORDINATES / DIMENSIONS</span>
          <span class="spec-value">${e.measures}</span>
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
  `;let i=r.querySelector(`.prev-btn`),o=r.querySelector(`.next-btn`),s=r.querySelector(`.expand-btn`),c=r.querySelector(`model-viewer`),u=r.querySelector(`.measure-image`),d=!0;function f(){d=!d,c.classList.toggle(`hidden`,!d),u.classList.toggle(`active`,!d)}return i.addEventListener(`click`,e=>{e.stopPropagation(),f()}),o.addEventListener(`click`,e=>{e.stopPropagation(),f()}),s.addEventListener(`click`,t=>{t.stopPropagation(),d?l(e.modelUrl,`3d`):l(e.imageUrl,`image`)}),r.querySelector(`.edit-btn`).addEventListener(`click`,()=>{g(e)}),r.querySelector(`.delete-btn`).addEventListener(`click`,()=>{confirm(`TERMINATE PROJECT DATA?`)&&(t=t.filter(t=>t.id!==e.id),n(),a())}),r}var i=document.getElementById(`gallery`);function a(){i.innerHTML=``,t.forEach(e=>i.appendChild(r(e)))}var o=document.getElementById(`fullscreen-overlay`),s=document.getElementById(`fs-container`),c=document.getElementById(`close-fs`);function l(e,t){t===`3d`?s.innerHTML=`
      <model-viewer 
        src="${e}" 
        auto-rotate 
        camera-controls 
        style="width: 100%; height: 100%;"
        exposure="1"
        environment-image="neutral"
      ></model-viewer>
    `:s.innerHTML=`
      <img src="${e}" style="width: 100%; height: 100%; object-fit: contain; padding: 2rem;">
    `,o.classList.remove(`hidden`),document.body.style.overflow=`hidden`}c.addEventListener(`click`,()=>{o.classList.add(`hidden`),s.innerHTML=``});var u=document.getElementById(`toggle-admin`),d=document.getElementById(`admin-panel`),f=document.getElementById(`add-project-form`),p=d.querySelector(`h2`),m=f.querySelector(`.submit-btn`),h=null;u.addEventListener(`click`,()=>{_(),d.classList.toggle(`hidden`)});function g(e){h=e.id,document.getElementById(`p-title`).value=e.title,document.getElementById(`p-desc`).value=e.description,document.getElementById(`p-measures`).value=e.measures,document.getElementById(`p-glb-url`).value=e.modelUrl.startsWith(`data:`)?``:e.modelUrl,document.getElementById(`p-img-url`).value=e.imageUrl.startsWith(`data:`)?``:e.imageUrl,p.innerText=`EDIT PROJECT`,m.innerText=`UPDATE PROJECT`,d.classList.remove(`hidden`),d.scrollIntoView({behavior:`smooth`})}function _(){h=null,f.reset(),p.innerText=`ADD NEW PROJECT`,m.innerText=`REGISTER PROJECT`}f.addEventListener(`submit`,async e=>{e.preventDefault();let r=document.getElementById(`p-title`).value,i=document.getElementById(`p-desc`).value,o=document.getElementById(`p-measures`).value,s=document.getElementById(`p-glb`).files[0],c=document.getElementById(`p-glb-url`).value,l=document.getElementById(`p-img`).files[0],u=document.getElementById(`p-img-url`).value,f=c,p=u;if(h){let e=t.find(e=>e.id===h);!f&&e.modelUrl.startsWith(`data:`)&&(f=e.modelUrl),!p&&e.imageUrl.startsWith(`data:`)&&(p=e.imageUrl)}if(!f&&!s&&(f=`https://modelviewer.dev/shared-assets/models/Astronaut.glb`),!p&&!l&&(p=`https://placehold.co/1200x800/000000/00f3ff?text=PLANTA+TECNICA`),s&&(f=await v(s)),l&&(p=await v(l)),h){let e=t.findIndex(e=>e.id===h);t[e]={...t[e],title:r,description:i,measures:o,modelUrl:f,imageUrl:p}}else t.push({id:Date.now(),title:r,description:i,measures:o,modelUrl:f,imageUrl:p});n(),a(),_(),d.classList.add(`hidden`)});function v(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(r.result),r.onerror=n,r.readAsDataURL(e)})}a(),console.log(`VIEW3D SYSTEM INITIALIZED [CORE_V1]`);