/* =========================================================
   Portfólio clássico — tema, idioma (PT/EN/ES), digitação e pastas de projetos
   ========================================================= */
const $ = (s, el = document) => el.querySelector(s);

/* ---------- Textos ---------- */
const I18N = {
  pt: {
    skip: "Saltar para os projetos",
    navProjects: "Projetos", navAbout: "Sobre", navContact: "Contacto",
    status: "Disponível para estágio curricular · Portugal",
    headline: "Tenho ideias, gosto de tecnologia e adoro vê-las <em>ganhar vida!</em>",
    lead: "Sou o Pedro Lucas! Desenvolvo websites, crio soluções digitais e gosto de explorar o mundo dos dados. Desde imaginar um projeto até vê-lo online, divirto-me a transformar desafios em oportunidades de aprendizagem e criatividade.",
    ctaWork: "Ver projetos", ctaCV: "Currículo",
    statProjects: "Projetos publicados",
    statEdu: "Formações concluídas ou a decorrer",
    statTools: "Ferramentas no dia a dia",
    statLevel: "Ciência dos Dados · IEFP",
    f1t: "Desenvolvimento web", f1d: "Sites rápidos e responsivos, do HTML ao deploy.",
    f2t: "Lojas online", f2d: "Catálogo, carrinho e páginas de conta pensadas para vender.",
    f3t: "Dados &amp; BI", f3d: "Python, SQL e Power BI para transformar dados em decisões.",
    f4t: "Deploy &amp; automação", f4d: "Projetos no ar com Vercel e tarefas automáticas com GitHub Actions.",
    projectsTitle: "Projetos",
    projectsHint: "Passa o rato numa pasta para espreitar as páginas. Clica para abrir o site.",
    aboutTitle: "Sobre",
    about1: "Sou uma pessoa curiosa e criativa, daquelas que estão sempre prontas para aprender e experimentar algo novo. Ao longo do meu percurso, investi em diferentes áreas, com formação em Desenvolvimento Web, Análise e Desenvolvimento de Sistemas e Gestão de Informação e Ciência dos Dados (Nível 5).",
    about2: "Já tive a oportunidade de desenvolver websites, lojas online e interfaces digitais, colocando em prática os conhecimentos que fui adquirindo.",
    about3: "Para além da parte técnica, considero-me responsável, organizado e comunicativo. O meu objetivo é continuar a evoluir, ganhar novas experiências e participar em projetos onde possa contribuir com ideias, criatividade e vontade de fazer acontecer.",
    about4: "Acredito que cada projeto é uma oportunidade para aprender, melhorar e deixar um pouco de mim no resultado final!",
    eduTitle: "Formação",
    edu1: "Técnico Especialista em Gestão de Informação e Ciência dos Dados", edu1m: "IEFP · Nível 5 · 2026",
    edu2: "Análise e Desenvolvimento de Sistemas", edu2m: "Universidade Cesumar · 2024",
    edu3: "Desenvolvimento Web", edu3m: "Udemy · 2025",
    skillsTitle: "Ferramentas",
    contactTitle: "Contacto",
    contactLine: "Estágio, freelance ou só trocar uma ideia — <em>respondo rápido.</em>",
    phone: "Telefone",
    osLink: "Abrir a versão PedroOS 98",
    pages: n => `${n} ${n === 1 ? "página" : "páginas"}`,
    online: "Online", wip: "Em construção",
    site: "Ver site", code: "Código",
    openSite: t => `Abrir o site ${t}`,
    themeLabel: "Alternar tema claro/escuro",
    langLabel: "Idioma",
    avatarAlt: "Foto de Pedro Lucas Garcia",
    title: "Pedro Lucas Garcia · Portfólio",
  },
  en: {
    skip: "Skip to projects",
    navProjects: "Projects", navAbout: "About", navContact: "Contact",
    status: "Open to a curricular internship · Portugal",
    headline: "I have ideas, I love technology and I adore watching them <em>come to life!</em>",
    lead: "I'm Pedro Lucas! I build websites, create digital solutions and enjoy exploring the world of data. From imagining a project to seeing it online, I have fun turning challenges into opportunities to learn and be creative.",
    ctaWork: "See projects", ctaCV: "Résumé",
    statProjects: "Published projects",
    statEdu: "Courses completed or in progress",
    statTools: "Tools I use every day",
    statLevel: "Data Science · IEFP",
    f1t: "Web development", f1d: "Fast, responsive sites, from HTML to deploy.",
    f2t: "Online stores", f2d: "Catalogue, cart and account pages designed to sell.",
    f3t: "Data &amp; BI", f3d: "Python, SQL and Power BI to turn data into decisions.",
    f4t: "Deploy &amp; automation", f4d: "Projects live on Vercel and automated tasks with GitHub Actions.",
    projectsTitle: "Projects",
    projectsHint: "Hover a folder to peek at its pages. Click to open the site.",
    aboutTitle: "About",
    about1: "I'm a curious, creative person — the kind who is always ready to learn and try something new. Along the way I've invested in different areas, training in Web Development, Systems Analysis and Development, and Information Management & Data Science (Level 5).",
    about2: "I've had the chance to build websites, online stores and digital interfaces, putting into practice what I've been learning.",
    about3: "Beyond the technical side, I consider myself responsible, organised and communicative. My goal is to keep growing, gain new experience and take part in projects where I can contribute ideas, creativity and the drive to make things happen.",
    about4: "I believe every project is a chance to learn, improve and leave a little of myself in the final result!",
    eduTitle: "Education",
    edu1: "Specialist Technician in Information Management & Data Science", edu1m: "IEFP · Level 5 · 2026",
    edu2: "Systems Analysis and Development", edu2m: "Cesumar University · 2024",
    edu3: "Web Development", edu3m: "Udemy · 2025",
    skillsTitle: "Tools",
    contactTitle: "Contact",
    contactLine: "Internship, freelance or just swapping ideas — <em>I reply fast.</em>",
    phone: "Phone",
    osLink: "Open the PedroOS 98 version",
    pages: n => `${n} ${n === 1 ? "page" : "pages"}`,
    online: "Online", wip: "In progress",
    site: "Visit site", code: "Code",
    openSite: t => `Open the ${t} website`,
    themeLabel: "Toggle light/dark theme",
    langLabel: "Language",
    avatarAlt: "Photo of Pedro Lucas Garcia",
    title: "Pedro Lucas Garcia · Portfolio",
  },
  es: {
    skip: "Saltar a los proyectos",
    navProjects: "Proyectos", navAbout: "Sobre mí", navContact: "Contacto",
    status: "Disponible para prácticas curriculares · Portugal",
    headline: "¡Tengo ideas, me gusta la tecnología y me encanta verlas <em>cobrar vida!</em>",
    lead: "¡Soy Pedro Lucas! Desarrollo sitios web, creo soluciones digitales y me gusta explorar el mundo de los datos. Desde imaginar un proyecto hasta verlo en línea, disfruto transformando desafíos en oportunidades de aprendizaje y creatividad.",
    ctaWork: "Ver proyectos", ctaCV: "Currículum",
    statProjects: "Proyectos publicados",
    statEdu: "Formaciones completadas o en curso",
    statTools: "Herramientas del día a día",
    statLevel: "Ciencia de Datos · IEFP",
    f1t: "Desarrollo web", f1d: "Sitios rápidos y adaptables, del HTML al despliegue.",
    f2t: "Tiendas online", f2d: "Catálogo, carrito y páginas de cuenta pensadas para vender.",
    f3t: "Datos &amp; BI", f3d: "Python, SQL y Power BI para convertir datos en decisiones.",
    f4t: "Despliegue &amp; automatización", f4d: "Proyectos en línea con Vercel y tareas automáticas con GitHub Actions.",
    projectsTitle: "Proyectos",
    projectsHint: "Pasa el ratón por una carpeta para ver sus páginas. Haz clic para abrir el sitio.",
    aboutTitle: "Sobre mí",
    about1: "Soy una persona curiosa y creativa, de esas que siempre están listas para aprender y probar algo nuevo. A lo largo de mi trayectoria he invertido en distintas áreas, con formación en Desarrollo Web, Análisis y Desarrollo de Sistemas y Gestión de la Información y Ciencia de Datos (Nivel 5).",
    about2: "He tenido la oportunidad de desarrollar sitios web, tiendas online e interfaces digitales, poniendo en práctica los conocimientos que he ido adquiriendo.",
    about3: "Más allá de la parte técnica, me considero responsable, organizado y comunicativo. Mi objetivo es seguir evolucionando, ganar nuevas experiencias y participar en proyectos donde pueda aportar ideas, creatividad y ganas de hacer que las cosas sucedan.",
    about4: "¡Creo que cada proyecto es una oportunidad para aprender, mejorar y dejar un poco de mí en el resultado final!",
    eduTitle: "Formación",
    edu1: "Técnico Especialista en Gestión de la Información y Ciencia de Datos", edu1m: "IEFP · Nivel 5 · 2026",
    edu2: "Análisis y Desarrollo de Sistemas", edu2m: "Universidad Cesumar · 2024",
    edu3: "Desarrollo Web", edu3m: "Udemy · 2025",
    skillsTitle: "Herramientas",
    contactTitle: "Contacto",
    contactLine: "Prácticas, freelance o simplemente intercambiar ideas — <em>respondo rápido.</em>",
    phone: "Teléfono",
    osLink: "Abrir la versión PedroOS 98",
    pages: n => `${n} ${n === 1 ? "página" : "páginas"}`,
    online: "En línea", wip: "En construcción",
    site: "Ver sitio", code: "Código",
    openSite: t => `Abrir el sitio ${t}`,
    themeLabel: "Cambiar tema claro/oscuro",
    langLabel: "Idioma",
    avatarAlt: "Foto de Pedro Lucas Garcia",
    title: "Pedro Lucas Garcia · Portafolio",
  },
};

/* idioma partilhado com a versão PedroOS 98 */
const LANG_KEY = "pos98-lang";
const LANGS = ["pt", "en", "es"];
let LANG;
try { LANG = localStorage.getItem(LANG_KEY); } catch (e) { LANG = null; }
if (!LANGS.includes(LANG)) {
  const nav = navigator.language || "";
  LANG = /^pt/i.test(nav) ? "pt" : /^es/i.test(nav) ? "es" : "en";
}
const T = k => I18N[LANG][k];

const escapeHTML = s => String(s ?? "").replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function applyI18n() {
  document.documentElement.lang = LANG;
  document.title = T("title");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = T(el.dataset.i18n);
    if (typeof v === "string") el.innerHTML = v; // textos internos e fixos (podem ter <em>)
  });
  $("#theme-btn").setAttribute("aria-label", T("themeLabel"));
  $("#lang-seg").setAttribute("aria-label", T("langLabel"));
  document.querySelectorAll("#lang-seg button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.l === LANG)));
  $(".avatar").alt = T("avatarAlt");
  typeHeadline(T("headline"));
  renderProjects();
}

/* ---------- Título com efeito de digitação ----------
   O HTML do título (texto + <em>) é partido em segmentos e escrito letra a letra.
   O texto completo vai para o aria-label, por isso leitores de ecrã leem-no de uma vez. */
let typeTimer;
function typeHeadline(html) {
  const h1 = $("#headline");
  const live = $(".type-live", h1);
  $(".type-ghost", h1).innerHTML = html;

  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const segs = [...tmp.childNodes].map(n => ({ text: n.textContent, em: n.nodeName === "EM" }));
  const total = segs.reduce((a, s) => a + s.text.length, 0);
  h1.setAttribute("aria-label", tmp.textContent);

  const render = n => {
    let left = n;
    live.innerHTML = segs.map(s => {
      const part = escapeHTML(s.text.slice(0, Math.max(0, left)));
      left -= s.text.length;
      return s.em ? (part ? `<em>${part}</em>` : "") : part;
    }).join("");
  };

  clearTimeout(typeTimer);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { render(total); return; }
  let i = 0;
  const step = () => {
    render(i);
    if (i++ < total) typeTimer = setTimeout(step, i === 1 ? 350 : 32 + Math.random() * 38);
  };
  step();
}

/* ---------- Tema ---------- */
const THEME_KEY = "classico-theme";
$("#theme-btn").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignora */ }
});
// segue o sistema enquanto o utilizador não escolher manualmente
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", e => {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* ignora */ }
  if (!saved) document.documentElement.dataset.theme = e.matches ? "dark" : "light";
});

/* ---------- Idioma (PT / EN / ES) ---------- */
$("#lang-seg").addEventListener("click", e => {
  const b = e.target.closest("button[data-l]");
  if (!b || b.dataset.l === LANG) return;
  LANG = b.dataset.l;
  try { localStorage.setItem(LANG_KEY, LANG); } catch (err) { /* ignora */ }
  applyI18n();
});

/* ---------- Pastas de vidro ----------
   Versão em JS puro do componente "Glass Folder Card":
   parte de trás + aba, capturas das páginas a espreitar e frente de vidro.
   Clicar na pasta abre o site; o botão GitHub abre o repositório. */
const pick = (o, key) => (LANG === "pt" ? o[key] : o[`${key}_${LANG}`] || (LANG === "es" && o[`${key}_en`]) || o[key]);

function renderProjects() {
  const wrap = $("#folders");
  if (!wrap || typeof PROJECTS === "undefined") return;
  $("#stat-projects").textContent = PROJECTS.length;

  wrap.innerHTML = PROJECTS.map(p => {
    const pages = (p.pages && p.pages.length ? p.pages : [{ name: p.title, img: p.image }]).slice(0, 4);
    const n = pages.length;
    // a 1.ª página fica à frente (último no DOM = por cima)
    const sheets = pages.map((pg, i) => ({ pg, i: n - 1 - i })).reverse().map(({ pg, i }) => `
      <figure class="sheet" style="--i:${i};--n:${n}">
        <img src="../${escapeHTML(pg.img)}" alt="" loading="lazy" decoding="async">
        <span>${escapeHTML(pick(pg, "name"))}</span>
      </figure>`).join("");

    const desc = pick(p, "description");
    const status = p.status === "wip" ? T("wip") : T("online");
    const href = p.live || p.repo || "#";
    const tags = (p.tags || []).map(t => `<li>${escapeHTML(t)}</li>`).join("");

    return `
    <article class="project reveal">
      <a class="folder" href="${escapeHTML(href)}" target="_blank" rel="noopener" aria-label="${escapeHTML(T("openSite")(p.title))}">
        <div class="folder-back"></div>
        <div class="sheets">${sheets}</div>
        <div class="folder-front">
          <span class="folder-open" aria-hidden="true"><i class="fa-solid fa-arrow-up"></i></span>
          <h3>${escapeHTML(p.title)}</h3>
          <div class="folder-meta">
            <span>${escapeHTML(p.year)}</span>
            <span>·</span>
            <span>${T("pages")(n)}</span>
            <span>·</span>
            <span class="${p.status === "wip" ? "" : "live"}">${status}</span>
          </div>
        </div>
      </a>
      <div class="project-body">
        <p>${escapeHTML(desc)}</p>
        <ul class="tags">${tags}</ul>
        <div class="project-links">
          ${p.live ? `<a class="btn" href="${escapeHTML(p.live)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${T("site")}</a>` : ""}
          ${p.repo ? `<a class="btn" href="${escapeHTML(p.repo)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> ${T("code")}</a>` : ""}
        </div>
      </div>
    </article>`;
  }).join("");

  observeReveal();
}

/* ---------- Entrada suave ao fazer scroll ---------- */
let io;
function observeReveal() {
  const els = document.querySelectorAll(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  io = io || new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

$("#year").textContent = new Date().getFullYear();
applyI18n();
