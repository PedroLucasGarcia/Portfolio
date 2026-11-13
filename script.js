/* =========================================================
   PedroOS 98 — arranque, gestor de janelas e aplicações.
   Os projetos vêm de projects.js (lista PROJECTS).
   Idioma: PT / EN / ES (escolhido no ecrã de boas-vindas).
   ========================================================= */

const ROOT = "";
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => window.matchMedia("(max-width: 640px)").matches;

/* ---------- Idioma ---------- */
let LANG = "";
try { LANG = localStorage.getItem("pos98-lang") || ""; } catch (e) { LANG = ""; }
if (!["pt", "en", "es"].includes(LANG)) LANG = "pt";
/* Espanhol: tradução a partir do texto em inglês (um 3.º argumento explícito tem prioridade) */
const ES = {
  "Web developer · Data Science": "Desarrollador web · Ciencia de Datos",
  "CPU         : Coffee-powered brain @ 4.98 GHz": "Procesador  : Cerebro impulsado por café @ 4.98 GHz",
  "Memory      : ": "Memoria     : ",
  "Cancel? No way — we're almost there.": "¿Cancelar? Ni hablar — ya casi estamos.",
  "en-GB": "es-ES",
  "Open": "Abrir",
  "in progress": "en construcción",
  "live": "en línea",
  "Welcome.txt - Notepad": "Bienvenida.txt - Bloc de notas",
  "C:\\PORTFOLIO\\WELCOME.TXT · EDITED TODAY": "C:\\PORTFOLIO\\BIENVENIDA.TXT · EDITADO HOY",
  "Hi, I'm <em>Pedro</em>.": "Hola, soy <em>Pedro</em>.",
  "See projects": "Ver proyectos",
  "Resume": "Currículum",
  "Say hi": "Saluda",
  "Recent files": "Archivos recientes",
  "See all": "Ver todos",
  "Open project": "Abrir proyecto",
  "My Computer": "Mi PC",
  "object(s)": "objeto(s)",
  "Address": "Dirección",
  "C:\\PORTFOLIO\\Projects": "C:\\PORTFOLIO\\Proyectos",
  "object(s) &nbsp;·&nbsp; click a screenshot to open the site": "objeto(s) &nbsp;·&nbsp; haz clic en una captura para abrir el sitio",
  "Projects": "Proyectos",
  "Project list": "Lista de proyectos",
  "in a new tab": "en una pestaña nueva",
  "Screenshot of the project": "Captura del proyecto",
  "View live": "Ver en vivo",
  "Code": "Código",
  "About me - Properties": "Sobre mí - Propiedades",
  "Photo of": "Foto de",
  "Motto": "Lema",
  "Contact": "Contacto",
  "Resume.pdf - Viewer": "Currículum.pdf - Visor",
  "Download": "Descargar",
  "Open in a new tab": "Abrir en una pestaña nueva",
  "Resume of": "Currículum de",
  "readme.txt - Notepad": "léeme.txt - Bloc de notas",
  "New message": "Nuevo mensaje",
  "To:": "Para:",
  "Subject:": "Asunto:",
  "Hi Pedro!": "¡Hola, Pedro!",
  "Message:": "Mensaje:",
  "Write your message here…": "Escribe aquí tu mensaje…",
  "Send": "Enviar",
  "Copy email": "Copiar email",
  "Elsewhere": "En otros sitios",
  "Skills - Control Panel": "Habilidades - Panel de control",
  "Areas": "Áreas",
  "I also use:": "También uso:",
  "Everyday tools:": "Herramientas del día a día:",
  "Education": "Formación",
  "Course": "Curso",
  "Institution": "Institución",
  "Level": "Nivel",
  "Status": "Estado",
  "Pedro's Home Page - Browser": "Página de Pedro - Navegador",
  "Done": "Listo",
  "Back": "Atrás",
  "Welcome to Pedro's home page!": "¡Bienvenido a la página de Pedro!",
  "★ Best viewed at 800x600 ★ Made with Notepad and lots of coffee ★ Thanks for visiting ★": "★ Se ve mejor a 800x600 ★ Hecha con el Bloc de notas y mucho café ★ Gracias por la visita ★",
  "You are visitor no.": "Eres el visitante n.º",
  "My sites:": "Mis sitios:",
  "Cool links:": "Enlaces chulos:",
  "My GitHub": "Mi GitHub",
  "My LinkedIn": "Mi LinkedIn",
  "Sign my guestbook": "Firma mi libro de visitas",
  "Under construction since forever": "En construcción desde siempre",
  "Wait": "Esperar",
  "Recycle Bin": "Papelera",
  "End task": "Finalizar tarea",
  "<b>Recycle Bin is not responding.</b><br>It's full of ideas that haven't become projects yet.": "<b>La Papelera no responde.</b><br>Está llena de ideas que aún no se han convertido en proyectos.",
  "Still not responding. Maybe the next idea will be the next project.": "Sigue sin responder. Quizás la próxima idea sea el próximo proyecto.",
  "DO NOT OPEN.exe": "NO ABRIR.exe",
  "Open anyway": "Abrir igualmente",
  "Are you sure? The file name is pretty clear.": "¿Seguro? El nombre del archivo es bastante claro.",
  "Close": "Cerrar",
  "<b>DO NOT OPEN.exe is not responding.</b><br>We warned you. As punishment, you have to look at my projects.": "<b>NO ABRIR.exe no responde.</b><br>Te lo advertimos. Como castigo, tienes que ver mis proyectos.",
  "Shut down": "Apagar",
  "Shut Down PedroOS 98": "Apagar PedroOS 98",
  "Cancel": "Cancelar",
  "Do you really want to shut down the computer?": "¿Seguro que quieres apagar el equipo?",
  "Email copied:": "Email copiado:",
  "My email is:": "Mi email es:",
  "Press any key or click to skip the boot": "Pulsa cualquier tecla o haz clic para saltar el arranque",
  "Loading the portfolio…": "Cargando el portafolio…",
  "Status: Starting…": "Estado: Iniciando…",
  "Welcome to PedroOS 98": "Bienvenido a PedroOS 98",
  "Web developer &amp; data analyst.": "Desarrollador web &amp; analista de datos.",
  "Click <b>Start</b> to enter my portfolio.": "Haz clic en <b>Iniciar</b> para entrar en mi portafolio.",
  "Language": "Idioma",
  "Prefer the classic version?": "¿Prefieres la versión clásica?",
  "Start": "Iniciar",
  "Pedro Lucas Garcia's portfolio desktop": "Escritorio del portafolio de Pedro Lucas Garcia",
  "PedroOS 98 · Pedro Lucas Garcia's portfolio<br>Double-click an icon to open it": "PedroOS 98 · Portafolio de Pedro Lucas Garcia<br>Doble clic en un icono para abrirlo",
  "START HERE": "EMPIEZA AQUÍ",
  "See the projects": "Mira los proyectos",
  "Read the CV": "Lee el currículum",
  "psst… try the": "psst… prueba la",
  "Open to internships": "Disponible para prácticas",
  "It's now safe to turn off your computer.": "Ya puedes apagar el equipo con seguridad.",
  "Click anywhere to turn it back on": "Haz clic en cualquier sitio para volver a encenderlo",
  "Booting PedroOS 98": "Arrancando PedroOS 98",
  "Loading": "Cargando",
  "Photo of Pedro Lucas Garcia": "Foto de Pedro Lucas Garcia",
  "Desktop icons": "Iconos del escritorio",
  "Note: start here": "Nota: empieza aquí",
  "Close note": "Cerrar nota",
  "Start menu": "Menú Inicio",
  "Quick launch": "Inicio rápido",
  "Open windows": "Ventanas abiertas",
  "Available for an internship": "Disponible para prácticas curriculares",
  "Connected to the Internet": "Conectado a Internet",
  "basic": "básico",
  "intermediate": "intermedio",
  "advanced": "avanzado",
  "Data": "Datos",
  "Workflow": "Flujo",
  "About me": "Sobre mí",
  "Resume.pdf": "Currículum.pdf",
  "readme.txt": "léeme.txt",
  "Skills": "Habilidades",
  "Read me": "Léeme",
  "Classic version": "Versión clásica",
  "Shut Down…": "Apagar…",
  "Minesweeper": "Buscaminas",
  "Difficulty level": "Nivel de dificultad",
  "Flag": "Bandera",
  "Mines left": "Minas restantes",
  "New game": "Nueva partida",
  "Time in seconds": "Tiempo en segundos",
  "Minefield": "Campo de minas",
  "Click to open · right-click or long-press to flag": "Clic para abrir · clic derecho o pulsación larga para marcar",
  "Cell": "Casilla",
  "Mine": "Mina",
  "Empty": "Vacía",
  "Flagged": "Marcada",
  "Closed": "Cerrada",
  "<br>New personal best!": "<br>¡Nuevo récord personal!",
  "Best": "Récord",
  "Solitaire": "Solitario",
  "Score: 0 &nbsp;·&nbsp; Time: 0:00 &nbsp;·&nbsp; Moves: 0": "Puntos: 0 &nbsp;·&nbsp; Tiempo: 0:00 &nbsp;·&nbsp; Jugadas: 0",
  "Undo": "Deshacer",
  "Send every possible card to the foundations": "Enviar todas las cartas posibles a las fundaciones",
  "Solitaire table": "Mesa de solitario",
  "Stock": "Mazo",
  "Waste": "Descarte",
  "Foundation": "Fundación",
  "Column": "Columna",
  "Score": "Puntos",
  "Time": "Tiempo",
  "Moves": "Jugadas",
  "Face-down card": "Carta boca abajo",
  "<br>New high score!": "<br>¡Nueva mejor puntuación!",
  "Game #1": "Partida n.º 1",
  "Restart": "Reiniciar",
  "FreeCell table": "Mesa de FreeCell",
  "Free cell": "Celda libre",
  "Game #": "Partida n.º",
  "There are no more legal moves.": "No quedan movimientos válidos.",
  "Arrows or A/D to steer · ↓ speed up · ↑ brake · P pause": "Flechas o A/D para girar · ↓ acelerar · ↑ frenar · P pausa",
  "Ski slope": "Pista de esquí",
  "Avalanche": "Avalancha",
  "Ski down before the avalanche catches you.<br>Flags give +10 m. Trees and rocks knock you over.": "Baja esquiando antes de que te alcance la avalancha.<br>Las banderas dan +10 m. Árboles y rocas te tumban.",
  "Paused": "En pausa",
  "Press Space or click to resume.": "Pulsa Espacio o haz clic para continuar.",
  "The avalanche got you!": "¡Te pilló la avalancha!",
  "New record!": "¡Nuevo récord!",
  "Try again": "Intentar de nuevo",
  "Beginner": "Principiante",
  "Intermediate": "Intermedio",
  "Expert": "Experto",
};
const esOf = (v) => (typeof v === "string" ? (ES[v] ?? v) : Array.isArray(v) ? v.map(esOf) : v);
const L = (pt, en, es) => (LANG === "pt" ? pt : LANG === "es" ? (es !== undefined ? es : esOf(en)) : en);
const lbl = (x) => (Array.isArray(x) ? (LANG === "pt" ? x[0] : LANG === "es" ? (x[2] !== undefined ? x[2] : esOf(x[1])) : x[1]) : x);
const pdesc = (p) => (LANG === "es" && p.description_es) || (LANG !== "pt" && p.description_en) || p.description;

const I18N = {
  docTitle: ["PedroOS 98 — Pedro Lucas Garcia", "PedroOS 98 — Pedro Lucas Garcia"],
  biosFoot: ["Prima qualquer tecla ou clique para saltar o arranque", "Press any key or click to skip the boot"],
  loadTitle: ["A carregar o portfólio…", "Loading the portfolio…"],
  loadStatus: ["Estado: A iniciar…", "Status: Starting…"],
  cancel: ["Cancelar", "Cancel"],
  welcomeTitle: ["Bem-vindo ao PedroOS 98", "Welcome to PedroOS 98"],
  loginRole: ["Desenvolvedor web &amp; analista de dados.", "Web developer &amp; data analyst."],
  loginHint: ["Clique em <b>Iniciar</b> para entrar no meu portfólio.", "Click <b>Start</b> to enter my portfolio."],
  langLegend: ["Idioma", "Language"],
  classicLink: ["Prefere a versão clássica?", "Prefer the classic version?"],
  start: ["Iniciar", "Start"],
  desktopH1: ["Ambiente de trabalho do portfólio de Pedro Lucas Garcia", "Pedro Lucas Garcia's portfolio desktop"],
  wallTag: ["PedroOS 98 · Portfólio de Pedro Lucas Garcia<br>Duplo clique num ícone para abrir", "PedroOS 98 · Pedro Lucas Garcia's portfolio<br>Double-click an icon to open it"],
  stickyHead: ["COMEÇA AQUI", "START HERE"],
  sticky1: ["Vê os projetos", "See the projects"],
  sticky2: ["Lê o currículo", "Read the CV"],
  sticky3: ["Diz olá", "Say hi"],
  stickyPsst: ["psst… experimenta a", "psst… try the"],
  stickyTrash: ["Lixeira", "Recycle Bin"],
  avail: ["Disponível para estágio", "Open to internships"],
  offMsg: ["Agora pode desligar o computador em segurança.", "It's now safe to turn off your computer."],
  offHint: ["Clique em qualquer lado para voltar a ligar", "Click anywhere to turn it back on"],
  // atributos
  aBoot: ["A arrancar o PedroOS 98", "Booting PedroOS 98"],
  aLoading: ["A carregar", "Loading"],
  aPhoto: ["Fotografia de Pedro Lucas Garcia", "Photo of Pedro Lucas Garcia"],
  aIcons: ["Ícones do ambiente de trabalho", "Desktop icons"],
  aSticky: ["Nota: começa aqui", "Note: start here"],
  aCloseNote: ["Fechar nota", "Close note"],
  aStartMenu: ["Menu Iniciar", "Start menu"],
  aQuick: ["Iniciação rápida", "Quick launch"],
  aProjects: ["Projetos", "Projects"],
  aContact: ["Contacto", "Contact"],
  aTasks: ["Janelas abertas", "Open windows"],
  aAvail: ["Disponível para estágio curricular", "Available for an internship"],
  aOnline: ["Ligado à Internet", "Connected to the Internet"],
  aLang: ["Idioma", "Language"],
};

function applyI18n() {
  document.documentElement.lang = LANG;
  document.title = lbl(I18N.docTitle);
  $$("[data-i18n]").forEach((el) => {
    const v = I18N[el.dataset.i18n];
    if (v) el.innerHTML = lbl(v);
  });
  $$("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && I18N[key]) el.setAttribute(attr, lbl(I18N[key]));
    });
  });
  $$('input[name="lang"]').forEach((r) => { r.checked = r.value === LANG; });
}

function setLang(l) {
  if (!["pt", "en", "es"].includes(l)) return;
  LANG = l;
  try { localStorage.setItem("pos98-lang", l); } catch (e) { /* ignora */ }
  applyI18n();
  if (desktopReady) {
    renderIcons();
    renderStartMenu();
    clockTick();
  }
}

/* ---------- Dados pessoais ---------- */
const ME = {
  name: "Pedro Lucas Garcia",
  get role() { return L("Desenvolvedor web · Ciência dos Dados", "Web developer · Data Science"); },
  handle: "@pedrolucasgarcia",
  get bio() {
    return L(
      "Curioso e criativo, com formação em Desenvolvimento Web, Análise e Desenvolvimento de Sistemas e Ciência dos Dados (Nível 5). Gosto de pegar numa ideia e dar-lhe vida — websites, lojas online e interfaces digitais.",
      "Curious and creative, with training in Web Development, Systems Analysis and Development, and Data Science (Level 5). I like taking an idea and bringing it to life — websites, online stores and digital interfaces.",
      "Curioso y creativo, con formación en Desarrollo Web, Análisis y Desarrollo de Sistemas y Ciencia de Datos (Nivel 5). Me gusta tomar una idea y darle vida — sitios web, tiendas online e interfaces digitales."
    );
  },
  get about() {
    return L([
      "Olá! Sou uma pessoa curiosa, criativa e daquelas que está sempre à procura de aprender alguma coisa nova. Tenho formação em Desenvolvimento Web, Análise e Desenvolvimento de Sistemas e Gestão de Informação e Ciência dos Dados (Nível 5). Resumindo: gosto de tecnologia, adoro descobrir como as coisas funcionam e tenho sempre vontade de experimentar algo diferente!",
      "Ao longo do meu percurso, tive a oportunidade de desenvolver projetos como websites, lojas online e interfaces digitais. Gosto de pegar numa ideia, dar-lhe vida e ver o resultado ganhar forma. E, claro, estou sempre à procura de novas ferramentas e maneiras de fazer as coisas melhor.",
      "Considero-me uma pessoa responsável, organizada, comunicativa e com uma boa dose de criatividade. O meu objetivo é continuar a crescer, ganhar experiência, enfrentar novos desafios e trabalhar em projetos onde possa deixar a minha marca.",
      "Acredito que ainda tenho muito para aprender, muitas ideias para explorar e muitos projetos para tirar da gaveta. E é exatamente isso que me motiva!",
    ], [
      "Hi! I'm a curious, creative person — the kind who is always looking to learn something new. I've trained in Web Development, Systems Analysis and Development, and Information Management and Data Science (Level 5). In short: I like technology, I love finding out how things work and I always want to try something different!",
      "Along the way I've had the chance to build projects such as websites, online stores and digital interfaces. I like taking an idea, bringing it to life and watching the result take shape. And of course, I'm always looking for new tools and better ways of doing things.",
      "I see myself as responsible, organised and communicative, with a good dose of creativity. My goal is to keep growing, gain experience, take on new challenges and work on projects where I can leave my mark.",
      "I believe I still have a lot to learn, plenty of ideas to explore and many projects to pull out of the drawer. And that is exactly what drives me!",
    ], [
      "¡Hola! Soy una persona curiosa, creativa y de esas que siempre buscan aprender algo nuevo. Tengo formación en Desarrollo Web, Análisis y Desarrollo de Sistemas y Gestión de la Información y Ciencia de Datos (Nivel 5). En resumen: me gusta la tecnología, me encanta descubrir cómo funcionan las cosas y siempre tengo ganas de probar algo diferente.",
      "A lo largo de mi trayectoria he tenido la oportunidad de desarrollar proyectos como sitios web, tiendas online e interfaces digitales. Me gusta tomar una idea, darle vida y ver cómo el resultado va tomando forma. Y, por supuesto, siempre estoy buscando nuevas herramientas y maneras de hacer las cosas mejor.",
      "Me considero una persona responsable, organizada, comunicativa y con una buena dosis de creatividad. Mi objetivo es seguir creciendo, ganar experiencia, afrontar nuevos retos y trabajar en proyectos donde pueda dejar mi huella.",
      "Creo que todavía tengo mucho por aprender, muchas ideas por explorar y muchos proyectos por sacar del cajón. ¡Y eso es exactamente lo que me motiva!",
    ]);
  },
  get motto() {
    return L(
      "Curioso por natureza, criativo por paixão e movido pelo desafio de transformar ideias em algo extraordinário.",
      "Curious by nature, creative by passion and driven by the challenge of turning ideas into something extraordinary.",
      "Curioso por naturaleza, creativo por pasión y motivado por el reto de convertir ideas en algo extraordinario."
    );
  },
  photo: ROOT + "assets/profile-img.jpeg",
  cv: ROOT + "assets/CV.pdf?v=3",
  email: "pedrolucasdasilvagarcia@gmail.com",
  phone: "+351938553771",
  phoneLabel: "+351 938 553 771",
  github: "https://github.com/PedroLucasGarcia",
  linkedin: "https://linkedin.com/in/pedro-lucas-garcia/",
  instagram: "https://www.instagram.com/_pedrolucasgarcia/",
};

const EDUCATION = () => L([
  ["Técnico Especialista em Gestão de Informação e Ciência dos Dados", "IEFP", "Nível 5", "Concluído · 2026"],
  ["Desenvolvimento Web", "Udemy", "Curso", "2025"],
  ["Análise e Desenvolvimento de Sistemas", "Universidade Cesumar", "Graduação", "2024"],
], [
  ["Technical Specialist in Information Management and Data Science", "IEFP", "Level 5", "Completed · 2026"],
  ["Web Development", "Udemy", "Course", "2025"],
  ["Systems Analysis and Development", "Universidade Cesumar", "Degree", "2024"],
], [
  ["Técnico Especialista en Gestión de la Información y Ciencia de Datos", "IEFP", "Nivel 5", "Completado · 2026"],
  ["Desarrollo Web", "Udemy", "Curso", "2025"],
  ["Análisis y Desarrollo de Sistemas", "Universidade Cesumar", "Grado", "2024"],
]);

const LVL = { "básico": 35, "intermédio": 65, "avançado": 90 };
const LVL_NAME = { "básico": ["básico", "basic"], "intermédio": ["intermédio", "intermediate"], "avançado": ["avançado", "advanced"] };
const SKILLS = {
  front: { label: "Frontend", rated: [["HTML", "avançado"], ["CSS", "avançado"], ["JavaScript", "intermédio"]], also: ["Bootstrap", "Node.js"] },
  data: { label: ["Dados", "Data"], rated: [["Python", "intermédio"], ["SQL", "intermédio"], ["Power BI", "intermédio"], ["Excel", "intermédio"]], also: [] },
  flow: { label: ["Fluxo", "Workflow"], rated: [], also: ["Git & GitHub", "Vercel", "GitHub Actions"] },
};

/* ---------- Ícones em pixel (SVG 32x32) ---------- */
const R = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;
const V = (y0, f) => { let s = ""; for (let i = 0; i < 7; i++) s += R(5 + i * 2, y0 + i, 2, 1, f) + R(25 - i * 2, y0 + i, 2, 1, f); return s; };
const DOC = R(7, 3, 18, 26, "#000") + R(8, 4, 16, 24, "#fff") + R(19, 4, 5, 5, "#c0c0c0") + R(19, 8, 5, 1, "#000") + R(18, 4, 1, 5, "#000");

const ICONS = {
  computer: R(4, 3, 24, 18, "#000") + R(5, 4, 22, 16, "#c0c0c0") + R(7, 6, 18, 12, "#000") + R(8, 7, 16, 10, "#008080") + R(9, 8, 6, 2, "#7fd4d4") +
    R(13, 21, 6, 3, "#808080") + R(6, 24, 20, 5, "#000") + R(7, 25, 18, 3, "#c0c0c0") + R(21, 26, 3, 1, "#00a000"),
  folder: R(3, 7, 12, 4, "#000") + R(4, 8, 10, 3, "#ffe680") + R(3, 10, 26, 18, "#000") + R(4, 11, 24, 16, "#f5c400") + R(4, 11, 24, 2, "#ffe680") + R(4, 25, 24, 2, "#c99a00"),
  user: R(11, 3, 10, 12, "#000") + R(12, 4, 8, 10, "#f1c27d") + R(12, 4, 8, 3, "#4a2c12") + R(14, 9, 1, 1, "#000") + R(17, 9, 1, 1, "#000") +
    R(6, 16, 20, 13, "#000") + R(7, 17, 18, 12, "#e2701f") + R(14, 17, 4, 3, "#f1c27d"),
  file: DOC + R(10, 11, 12, 1, "#000080") + R(10, 14, 12, 1, "#808080") + R(10, 17, 12, 1, "#808080") + R(10, 20, 9, 1, "#808080") + R(10, 23, 11, 1, "#808080"),
  pdf: DOC + R(10, 11, 12, 1, "#808080") + R(10, 13, 12, 1, "#808080") + R(5, 17, 22, 8, "#000") + R(6, 18, 20, 6, "#c00000") +
    R(8, 19, 3, 4, "#fff") + R(9, 20, 1, 1, "#c00000") + R(9, 22, 2, 1, "#c00000") + R(13, 19, 3, 4, "#fff") + R(14, 20, 1, 2, "#c00000") + R(18, 19, 3, 4, "#fff") + R(19, 20, 2, 1, "#c00000") + R(20, 22, 1, 1, "#c00000"),
  notepad: R(6, 5, 20, 24, "#000") + R(7, 6, 18, 22, "#fff") + R(6, 5, 20, 5, "#000") + R(7, 6, 18, 3, "#1f6fd0") +
    R(9, 3, 2, 5, "#808080") + R(15, 3, 2, 5, "#808080") + R(21, 3, 2, 5, "#808080") +
    R(9, 13, 14, 1, "#808080") + R(9, 16, 14, 1, "#808080") + R(9, 19, 14, 1, "#808080") + R(9, 22, 9, 1, "#808080"),
  mail: R(3, 8, 26, 17, "#000") + R(4, 9, 24, 15, "#fff") + V(9, "#808080") + R(4, 22, 24, 2, "#dcdcdc") + R(22, 11, 4, 4, "#e2701f"),
  control: R(4, 4, 24, 24, "#000") + R(5, 5, 22, 22, "#c0c0c0") + R(5, 5, 22, 1, "#fff") + R(8, 8, 2, 17, "#808080") + R(15, 8, 2, 17, "#808080") + R(22, 8, 2, 17, "#808080") +
    R(6, 18, 6, 3, "#000080") + R(13, 10, 6, 3, "#c00000") + R(20, 14, 6, 3, "#008000"),
  globe: `<circle cx="16" cy="16" r="12.5" fill="#1f6fd0" stroke="#000" stroke-width="1"/>` + R(8, 8, 6, 4, "#2ea043") + R(10, 12, 4, 6, "#2ea043") + R(18, 7, 4, 3, "#2ea043") +
    R(17, 15, 7, 4, "#2ea043") + R(19, 19, 3, 4, "#2ea043") + R(9, 7, 2, 1, "#9fd0ff"),
  grad: R(2, 10, 28, 3, "#000") + R(6, 8, 20, 2, "#000") + R(10, 6, 12, 2, "#000") + R(6, 13, 20, 2, "#000") + R(10, 15, 12, 2, "#000") +
    R(9, 17, 14, 7, "#000") + R(10, 17, 12, 6, "#3a3a3a") + R(26, 12, 2, 10, "#d4a017") + R(25, 22, 4, 3, "#d4a017"),
  trash: R(8, 6, 16, 3, "#000") + R(13, 4, 6, 2, "#000") + R(9, 9, 14, 20, "#000") + R(10, 10, 12, 18, "#c0c0c0") + R(10, 10, 2, 18, "#fff") +
    R(13, 12, 1, 14, "#808080") + R(16, 12, 1, 14, "#808080") + R(19, 12, 1, 14, "#808080") + R(9, 7, 14, 1, "#808080") + R(12, 8, 6, 2, "#ffe680"),
  exe: R(3, 6, 26, 21, "#000") + R(4, 7, 24, 19, "#c0c0c0") + R(4, 7, 24, 4, "#000080") + R(23, 8, 4, 2, "#c0c0c0") +
    R(8, 13, 16, 11, "#fff") + R(15, 14, 2, 6, "#c00000") + R(15, 21, 2, 2, "#c00000"),
  info: `<circle cx="16" cy="16" r="13" fill="#fff" stroke="#000080" stroke-width="2"/>` + R(14, 8, 4, 4, "#000080") + R(14, 14, 4, 11, "#000080") + R(12, 14, 2, 2, "#000080") + R(12, 23, 8, 2, "#000080"),
  warn: `<polygon points="16,3 30,28 2,28" fill="#ffd800" stroke="#000" stroke-width="1"/>` + R(15, 11, 3, 9, "#000") + R(15, 22, 3, 3, "#000"),
  error: `<circle cx="16" cy="16" r="13" fill="#e01010" stroke="#600" stroke-width="1"/><path d="M10 10L22 22M22 10L10 22" stroke="#fff" stroke-width="3.2"/>`,
  power: `<circle cx="16" cy="16" r="14" fill="#c0c0c0" stroke="#000" stroke-width="1"/><path d="M10.5 10.5A8 8 0 1 0 21.5 10.5" fill="none" stroke="#c00000" stroke-width="3"/>` + R(14.5, 5, 3, 11, "#c00000"),
  lang: `<circle cx="16" cy="16" r="12.5" fill="#fff" stroke="#000" stroke-width="1"/><ellipse cx="16" cy="16" rx="5.5" ry="12.5" fill="none" stroke="#000080" stroke-width="1.4"/>` +
    R(4, 11, 24, 1, "#000080") + R(4, 20, 24, 1, "#000080") + R(15.3, 4, 1.4, 24, "#000080"),
};

function ico(name, size = 32) {
  return `<svg class="ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.file}</svg>`;
}
function fillIcons(root = document) {
  $$("[data-ico]", root).forEach((el) => {
    if (el.dataset.filled) return;
    el.innerHTML = ico(el.dataset.ico, +el.dataset.size || 32);
    el.dataset.filled = "1";
  });
}

/* ---------- Arranque ---------- */
let booted = false;
try { booted = sessionStorage.getItem("pos98-booted") === "1"; } catch (e) { /* sem storage */ }

async function boot() {
  applyI18n();
  fillIcons();
  try { $('link[rel="icon"]').href = "data:image/svg+xml," + encodeURIComponent(ico("computer", 32)); } catch (e) { /* ignora */ }
  $$('input[name="lang"]').forEach((r) => r.addEventListener("change", () => { if (r.checked) setLang(r.value); }));
  if (!booted && !reduceMotion) await runBios();
  $("#bios").hidden = true;
  await runSplash();
  showLogin();
}

async function runBios() {
  const bios = $("#bios");
  const log = $("#bios-log");
  let skip = false;
  const doSkip = () => { skip = true; };
  bios.addEventListener("pointerdown", doSkip);
  document.addEventListener("keydown", doSkip, { once: true });
  const wait = (ms) => (skip ? Promise.resolve() : sleep(ms));
  const line = (html) => { log.insertAdjacentHTML("beforeend", html + "\n"); };
  const ok = '<span class="ok">OK</span>';

  line(L("Processador : Cérebro movido a café @ 4.98 GHz", "CPU         : Coffee-powered brain @ 4.98 GHz"));
  const mem = document.createElement("span");
  log.append(L("Memória     : ", "Memory      : "), mem);
  for (let k = 0; k <= 640 && !skip; k += 32) { mem.textContent = k + "K"; await wait(28); }
  mem.innerHTML = "640K " + ok;
  log.append("\n\n");
  await wait(200);
  const rows = L([
    "A detetar unidades IDE…",
    `  Primária mestre  : PORTFOLIO_C  (${PROJECTS.length} projetos)`,
    "  Primária escrava : IDEIAS_D     (cheia)",
    "",
    `A carregar HTML.SYS ......... ${ok}`,
    `A carregar CSS.SYS .......... ${ok}`,
    `A carregar JAVASCRIPT.SYS ... ${ok}`,
    `A carregar PYTHON.DLL ....... ${ok}`,
    "",
    '<span class="hi">A arrancar o PedroOS 98…</span> <span class="cursor"></span>',
  ], [
    "Detecting IDE drives…",
    `  Primary master : PORTFOLIO_C  (${PROJECTS.length} projects)`,
    "  Primary slave  : IDEAS_D      (full)",
    "",
    `Loading HTML.SYS ......... ${ok}`,
    `Loading CSS.SYS .......... ${ok}`,
    `Loading JAVASCRIPT.SYS ... ${ok}`,
    `Loading PYTHON.DLL ....... ${ok}`,
    "",
    '<span class="hi">Starting PedroOS 98…</span> <span class="cursor"></span>',
  ], [
    "Detectando unidades IDE…",
    `  Primaria maestra : PORTFOLIO_C  (${PROJECTS.length} proyectos)`,
    "  Primaria esclava : IDEAS_D      (llena)",
    "",
    `Cargando HTML.SYS ......... ${ok}`,
    `Cargando CSS.SYS .......... ${ok}`,
    `Cargando JAVASCRIPT.SYS ... ${ok}`,
    `Cargando PYTHON.DLL ....... ${ok}`,
    "",
    '<span class="hi">Iniciando PedroOS 98…</span> <span class="cursor"></span>',
  ]);
  for (const r of rows) { line(r); await wait(r ? 150 : 60); }
  await wait(600);
  bios.removeEventListener("pointerdown", doSkip);
  document.removeEventListener("keydown", doSkip);
}

async function runSplash() {
  const splash = $("#splash");
  const fill = $("#splash-fill");
  const bar = $(".seg-bar");
  const status = $("#splash-status");
  const cancel = $("#load-cancel");
  splash.hidden = false;
  cancel.focus({ preventScroll: true });

  const msgs = L([
    [0, "Estado: A preparar elementos…"],
    [22, "Estado: A carregar projetos…"],
    [48, "Estado: A preparar o ambiente de trabalho…"],
    [70, "Estado: A aquecer o café…"],
    [90, "Estado: Quase pronto…"],
  ], [
    [0, "Status: Preparing elements…"],
    [22, "Status: Loading projects…"],
    [48, "Status: Setting up the desktop…"],
    [70, "Status: Warming up the coffee…"],
    [90, "Status: Almost ready…"],
  ], [
    [0, "Estado: Preparando elementos…"],
    [22, "Estado: Cargando proyectos…"],
    [48, "Estado: Preparando el escritorio…"],
    [70, "Estado: Calentando el café…"],
    [90, "Estado: Casi listo…"],
  ]);
  let speed = booted || reduceMotion ? 3 : 1;
  let joked = false;
  cancel.onclick = () => {
    if (joked) return;
    joked = true;
    speed = 4;
    cancel.disabled = true;
    status.textContent = L("Cancelar? Nem pensar — já estamos quase lá.", "Cancel? No way — we're almost there.");
  };

  let p = 0;
  while (p < 100) {
    p = Math.min(100, p + (3 + Math.random() * 7) * speed);
    fill.style.width = p + "%";
    bar.setAttribute("aria-valuenow", String(Math.round(p)));
    if (!joked) {
      const m = msgs.filter(([at]) => p >= at).pop();
      if (m && status.textContent !== m[1]) status.textContent = m[1];
    }
    await sleep(140 + Math.random() * 120);
  }
  await sleep(350);
  splash.hidden = true;
  try { sessionStorage.setItem("pos98-booted", "1"); } catch (e) { /* ignora */ }
}

function showLogin() {
  $("#login").hidden = false;
  const btn = $("#login-start");
  btn.focus({ preventScroll: true });
  btn.onclick = enterDesktop;
}

let desktopReady = false;
function enterDesktop() {
  $("#login").hidden = true;
  $("#desktop").hidden = false;
  chime();
  if (!desktopReady) {
    desktopReady = true;
    renderIcons();
    renderStartMenu();
    startClock();
  } else {
    renderIcons();
    renderStartMenu();
    clockTick();
  }
  $("#sticky").hidden = false;
  setTimeout(() => openApp("welcome"), reduceMotion ? 0 : 180);
}

function chime() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ac = new AC();
    const t0 = ac.currentTime + 0.02;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      const t = t0 + i * 0.12;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(g).connect(ac.destination);
      o.start(t);
      o.stop(t + 0.55);
    });
    setTimeout(() => ac.close(), 1400);
  } catch (e) { /* sem som, sem problema */ }
}

function clockTick() {
  const el = $("#clock");
  if (!el) return;
  const d = new Date();
  const loc = L("pt-PT", "en-GB");
  el.textContent = d.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" });
  el.dateTime = d.toISOString();
  el.title = d.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
function startClock() {
  clockTick();
  setInterval(clockTick, 15000);
}

/* ---------- Ícones do ambiente de trabalho e menu Iniciar ---------- */
const DESKTOP_ICONS = [
  ["computer", ["O Meu Computador", "My Computer"], "computer"],
  ["about", ["Sobre mim", "About me"], "user"],
  ["projects", ["Projetos", "Projects"], "folder"],
  ["cv", ["Currículo.pdf", "Resume.pdf"], "pdf"],
  ["readme", ["leia-me.txt", "readme.txt"], "notepad"],
  ["contact", ["Contacto", "Contact"], "mail"],
  ["skills", ["Competências", "Skills"], "control"],
  ["education", ["Formação", "Education"], "grad"],
  ["internet", "Internet", "globe"],
  ["trash", ["Lixeira", "Recycle Bin"], "trash"],
  ["noopen", ["NÃO ABRIR.exe", "DO NOT OPEN.exe"], "exe"],
];

const iconBtn = (app, label, icon, size = 32) => {
  const t = lbl(label);
  return `<button class="icon" data-open="${app}" aria-label="${L("Abrir", "Open")} ${esc(t)}">${ico(icon, size)}<span class="icon-label">${esc(t)}</span></button>`;
};

function renderIcons() {
  const box = $("#icons");
  box.setAttribute("role", "group");
  box.innerHTML = DESKTOP_ICONS.map(([a, l, i]) => iconBtn(a, l, i)).join("");
}

const START_ITEMS = [
  ["projects", ["Projetos", "Projects"], "folder"],
  ["about", ["Sobre mim", "About me"], "user"],
  ["cv", ["Currículo", "Resume"], "pdf"],
  ["contact", ["Contacto", "Contact"], "mail"],
  ["skills", ["Competências", "Skills"], "control"],
  ["education", ["Formação", "Education"], "grad"],
  ["readme", ["Leia-me", "Read me"], "notepad"],
  "-",
  ["@lang", ["Switch to English", "Cambiar a Español", "Mudar para Português"], "lang"],
  ["@classic", ["Versão clássica", "Classic version"], "globe"],
  ["@shutdown", ["Desligar…", "Shut Down…"], "power"],
];

function renderStartMenu() {
  $("#start-list").innerHTML = START_ITEMS.map((it) => {
    if (it === "-") return '<li class="sep" role="separator"></li>';
    const [k, label, icon] = it;
    const attr = k.startsWith("@") ? `data-action="${k.slice(1)}"` : `data-open="${k}"`;
    return `<li role="none"><button class="mi" role="menuitem" ${attr}>${ico(icon, 28)}<span>${esc(lbl(label))}</span></button></li>`;
  }).join("");
}

function toggleStart(force) {
  const menu = $("#start-menu");
  const btn = $("#start-btn");
  const open = force ?? menu.hidden;
  menu.hidden = !open;
  btn.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", String(open));
  if (open) $("button.mi", menu)?.focus({ preventScroll: true });
}

function selectIcon(icon) {
  $$("button.icon.selected").forEach((b) => b !== icon && b.classList.remove("selected"));
  icon?.classList.add("selected");
}

/* ---------- Gestor de janelas ---------- */
const wins = new Map();
let zTop = 20;
let winSeq = 0;
let cascade = 0;

function openWindow(o) {
  const id = o.id || "w" + ++winSeq;
  if (wins.has(id)) {
    const rec = wins.get(id);
    restoreWindow(rec);
    return rec;
  }
  const host = $("#windows");
  const el = document.createElement("div");
  el.className = "window win" + (o.err ? " err" : "") + (o.modal ? " modal" : "") + (o.resizable !== false && !o.modal ? " resizable" : "") + (reduceMotion ? "" : " opening");
  el.tabIndex = -1;
  el.setAttribute("role", o.modal ? "alertdialog" : "dialog");
  el.setAttribute("aria-label", o.title);
  el.dataset.win = id;
  // Os aria-label ficam em inglês: o 98.css usa-os para desenhar os botões.
  const controls = [
    !o.noMin && !o.modal ? '<button aria-label="Minimize" data-act="min"></button>' : "",
    !o.noMax && !o.modal ? '<button aria-label="Maximize" data-act="max"></button>' : "",
    '<button aria-label="Close" data-act="close"></button>',
  ].join("");
  el.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text"><span>${ico(o.icon || "file", 16)}</span><span>${esc(o.title)}</span></div>
      <div class="title-bar-controls">${controls}</div>
    </div>
    <div class="window-body ${o.bodyClass || ""}">${o.body || ""}</div>
    ${o.status ? `<div class="status-bar"><p class="status-bar-field">${o.status}</p></div>` : ""}`;
  host.append(el);

  const hw = host.clientWidth;
  const hh = host.clientHeight;
  const w = Math.min(o.width || 480, hw - 16);
  const h = o.height ? Math.min(o.height, hh - 16) : null;
  el.style.width = w + "px";
  if (h) el.style.height = h + "px";
  const realH = h || el.offsetHeight;
  const off = o.modal ? 0 : (cascade++ % 6) * 24;
  el.style.left = Math.max(8, Math.round((hw - w) / 2) + off - 60) + "px";
  el.style.top = Math.max(8, Math.round((hh - realH) / 2) + off - 50) + "px";
  if (o.modal) {
    el.style.left = Math.max(8, Math.round((hw - w) / 2)) + "px";
    el.style.top = Math.max(8, Math.round((hh - realH) / 2.4)) + "px";
  }
  el.addEventListener("animationend", () => el.classList.remove("opening"), { once: true });

  const rec = { id, el, body: $(".window-body", el), o, task: null };
  wins.set(id, rec);

  if (!o.modal) {
    const t = document.createElement("button");
    t.className = "task";
    t.dataset.task = id;
    t.title = o.title;
    t.innerHTML = `${ico(o.icon || "file", 16)}<span>${esc(o.title)}</span>`;
    $("#tasks").append(t);
    rec.task = t;
  }

  const bar = $(".title-bar", el);
  bar.addEventListener("pointerdown", (e) => startDrag(e, rec, bar));
  bar.addEventListener("dblclick", (e) => { if (!e.target.closest("button") && !o.noMax && !o.modal) toggleMax(rec); });
  el.addEventListener("pointerdown", () => focusWindow(rec), true);

  focusWindow(rec);
  o.onMount?.(rec);
  return rec;
}

function startDrag(e, rec, bar) {
  if (e.button !== 0 || e.target.closest("button") || rec.el.classList.contains("max") || isMobile()) return;
  const el = rec.el;
  const host = $("#windows").getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const dx = e.clientX - r.left;
  const dy = e.clientY - r.top;
  bar.setPointerCapture(e.pointerId);
  const move = (ev) => {
    const x = clamp(ev.clientX - host.left - dx, 80 - r.width, host.width - 80);
    const y = clamp(ev.clientY - host.top - dy, 0, host.height - 24);
    el.style.left = x + "px";
    el.style.top = y + "px";
  };
  const up = () => {
    bar.removeEventListener("pointermove", move);
    bar.removeEventListener("pointerup", up);
    bar.removeEventListener("pointercancel", up);
  };
  bar.addEventListener("pointermove", move);
  bar.addEventListener("pointerup", up);
  bar.addEventListener("pointercancel", up);
}

function focusWindow(rec) {
  if (!rec) return;
  $$(".win.active").forEach((w) => w !== rec.el && w.classList.remove("active"));
  $$("button.task.active").forEach((t) => t.classList.remove("active"));
  rec.el.classList.add("active");
  rec.el.style.zIndex = ++zTop;
  rec.task?.classList.add("active");
  if (!rec.el.contains(document.activeElement)) rec.el.focus({ preventScroll: true });
}

function topWindow() {
  let best = null;
  wins.forEach((r) => {
    if (r.el.classList.contains("minimized")) return;
    if (!best || +r.el.style.zIndex > +best.el.style.zIndex) best = r;
  });
  return best;
}

function minimizeWindow(rec) {
  rec.el.classList.add("minimized");
  rec.el.classList.remove("active");
  rec.task?.classList.remove("active");
  focusWindow(topWindow());
}

function restoreWindow(rec) {
  rec.el.classList.remove("minimized");
  focusWindow(rec);
}

function toggleMax(rec) {
  const max = rec.el.classList.toggle("max");
  const b = $('[data-act="max"]', rec.el);
  if (b) b.setAttribute("aria-label", max ? "Restore" : "Maximize");
}

function closeWindow(rec, result) {
  if (!rec) return;
  rec.el.remove();
  rec.task?.remove();
  wins.delete(rec.id);
  rec.o.onClose?.(result);
  focusWindow(topWindow());
}

function msgBox({ title = "PedroOS 98", text = "", icon = "info", buttons = ["OK"], err = false }) {
  return new Promise((resolve) => {
    const rec = openWindow({
      title, icon, err, modal: true, width: 380,
      body: `<div class="msg">${ico(icon, 32)}<p>${text}</p></div>
             <div class="btns center">${buttons.map((b, i) => `<button data-mb="${i}">${esc(b)}</button>`).join("")}</div>`,
      onClose: (r) => resolve(r ?? buttons[buttons.length - 1]),
      onMount: (r) => {
        r.body.addEventListener("click", (e) => {
          const b = e.target.closest("[data-mb]");
          if (b) closeWindow(r, buttons[+b.dataset.mb]);
        });
        setTimeout(() => $("[data-mb]", r.el)?.focus(), 0);
      },
    });
    return rec;
  });
}

window.addEventListener("resize", () => {
  const host = $("#windows");
  if (!host) return;
  wins.forEach((r) => {
    if (r.el.classList.contains("max")) return;
    const x = parseFloat(r.el.style.left) || 0;
    const y = parseFloat(r.el.style.top) || 0;
    r.el.style.left = clamp(x, 80 - r.el.offsetWidth, Math.max(0, host.clientWidth - 80)) + "px";
    r.el.style.top = clamp(y, 0, Math.max(0, host.clientHeight - 24)) + "px";
  });
});

/* ---------- Aplicações ---------- */
const projImg = (p) => ROOT + p.image;
const statusBadge = (p) => (p.status === "wip"
  ? `<span class="badge wip">${L("em construção", "in progress")}</span>`
  : `<span class="badge on">${L("no ar", "live")}</span>`);
const menubar = () => L(
  '<div class="menubar" aria-hidden="true"><span><u>F</u>icheiro</span><span><u>E</u>ditar</span><span><u>F</u>ormatar</span><span><u>A</u>juda</span></div>',
  '<div class="menubar" aria-hidden="true"><span><u>F</u>ile</span><span><u>E</u>dit</span><span>F<u>o</u>rmat</span><span><u>H</u>elp</span></div>',
  '<div class="menubar" aria-hidden="true"><span><u>A</u>rchivo</span><span><u>E</u>ditar</span><span><u>F</u>ormato</span><span>A<u>y</u>uda</span></div>'
);

const readmeText = () => L(`LEIA-ME
=======

Bem-vindo ao PedroOS 98, o meu portfólio.

Como usar
---------
* Duplo clique num ícone para o abrir
  (no telemóvel basta um toque).
* Arraste as janelas pela barra de título.
* Duplo clique na barra de título maximiza.
* O botão Iniciar tem atalhos para tudo.
* Há jogos escondidos no ambiente de trabalho.

O que está aqui
---------------
* Projetos ........ ${PROJECTS.length} sites e aplicações
* Currículo.pdf ... o meu CV
* Contacto ........ diz olá!

Lema
----
${esc(ME.motto)}

Não abra o ficheiro "NÃO ABRIR.exe".
A sério.

— ${esc(ME.name)}`, `README
======

Welcome to PedroOS 98, my portfolio.

How to use it
-------------
* Double-click an icon to open it
  (on a phone, a single tap is enough).
* Drag windows by their title bar.
* Double-clicking a title bar maximises.
* The Start button has shortcuts to everything.
* There are games hidden on the desktop.

What's in here
--------------
* Projects ........ ${PROJECTS.length} websites and apps
* Resume.pdf ...... my CV
* Contact ......... say hi!

Motto
-----
${esc(ME.motto)}

Do not open "DO NOT OPEN.exe".
Seriously.

— ${esc(ME.name)}`, `LÉEME
=====

Bienvenido a PedroOS 98, mi portafolio.

Cómo usarlo
-----------
* Doble clic en un icono para abrirlo
  (en el móvil basta con un toque).
* Arrastra las ventanas por la barra de título.
* Doble clic en la barra de título maximiza.
* El botón Iniciar tiene accesos a todo.
* Hay juegos escondidos en el escritorio.

Qué hay aquí
------------
* Proyectos ....... ${PROJECTS.length} sitios web y aplicaciones
* Currículum.pdf .. mi CV
* Contacto ........ ¡saluda!

Lema
----
${esc(ME.motto)}

No abras el archivo "NO ABRIR.exe".
En serio.

— ${esc(ME.name)}`);

const APPS = {
  welcome: () => openWindow({
    id: "welcome", title: L("Bem-vindo.txt - Bloco de Notas", "Welcome.txt - Notepad"), icon: "notepad", width: 660, height: 560,
    status: "Ln 1, Col 1 &nbsp;·&nbsp; UTF-8",
    body: `${menubar()}
      <div class="notes">
        <p class="notes-path">${L("C:\\PORTFOLIO\\BEM-VINDO.TXT · EDITADO HOJE", "C:\\PORTFOLIO\\WELCOME.TXT · EDITED TODAY")}</p>
        <h2 class="hello">${L("Olá, sou o <em>Pedro</em>.", "Hi, I'm <em>Pedro</em>.")}</h2>
        <p class="bio">${esc(ME.bio)}</p>
        <div class="btns">
          <button class="primary" data-open="projects"><i class="fa-solid fa-folder-open"></i><span>${L("Ver projetos", "See projects")}</span></button>
          <button data-open="cv"><i class="fa-solid fa-file-lines"></i><span>${L("Currículo", "Resume")}</span></button>
          <button data-open="contact"><i class="fa-solid fa-hand"></i><span>${L("Diz olá", "Say hi")}</span></button>
        </div>
        <div class="recent-head"><b>${L("Ficheiros recentes", "Recent files")}</b><button class="linkish" data-open="projects">${L("Ver todos", "See all")} (${PROJECTS.length})</button></div>
        <div class="recent">
          ${PROJECTS.slice(0, 4).map((p, i) => `
            <button class="rfile" data-project="${i}" aria-label="${L("Abrir projeto", "Open project")} ${esc(p.title)}">
              <img src="${esc(projImg(p))}" alt="" loading="lazy">
              <span>${esc(p.title)}</span>
              <small>${esc(p.year)} · ${esc(p.tags[0] || "")}</small>
            </button>`).join("")}
        </div>
      </div>`,
  }),

  computer: () => {
    const items = [
      ["projects", ["Projetos", "Projects"], "folder"], ["about", ["Sobre mim", "About me"], "user"], ["cv", ["Currículo.pdf", "Resume.pdf"], "pdf"],
      ["readme", ["leia-me.txt", "readme.txt"], "notepad"], ["skills", ["Competências", "Skills"], "control"], ["education", ["Formação", "Education"], "grad"],
      ["contact", ["Contacto", "Contact"], "mail"], ["internet", "Internet", "globe"],
    ];
    return openWindow({
      id: "computer", title: L("O Meu Computador", "My Computer"), icon: "computer", width: 540, height: 380,
      status: `${items.length} ${L("objeto(s)", "object(s)")}`,
      body: `<div class="toolbar"><span class="addr"><label for="addr-pc">${L("Endereço", "Address")}</label><input id="addr-pc" value="C:\\PORTFOLIO" readonly></span></div>
             <div class="pane"><div class="explorer-grid">${items.map(([a, l, i]) => iconBtn(a, l, i)).join("")}</div></div>`,
    });
  },

  projects: () => openWindow({
    id: "projects", title: L("C:\\PORTFOLIO\\Projetos", "C:\\PORTFOLIO\\Projects"), icon: "folder", width: 840, height: 580,
    status: `${PROJECTS.length} ${L("objeto(s) &nbsp;·&nbsp; duplo clique numa captura para abrir o site", "object(s) &nbsp;·&nbsp; click a screenshot to open the site")}`,
    body: `<div class="pbrowser">
        <div class="pside">
          <h4>${L("Projetos", "Projects")} (${PROJECTS.length})</h4>
          <div role="listbox" aria-label="${L("Lista de projetos", "Project list")}">
            ${PROJECTS.map((p, i) => `<button class="pitem" role="option" aria-selected="false" data-pick="${i}">${ico("exe", 16)}<span>${esc(p.title)}</span></button>`).join("")}
          </div>
        </div>
        <div class="pmain" aria-live="polite"></div>
      </div>`,
    onMount: (rec) => {
      const main = $(".pmain", rec.el);
      rec.select = (i) => {
        const p = PROJECTS[i];
        if (!p) return;
        $$("[data-pick]", rec.el).forEach((b) => b.setAttribute("aria-selected", String(+b.dataset.pick === i)));
        const link = p.live || p.repo;
        main.innerHTML = `
          <h2>${esc(p.title)}</h2>
          <div class="proj-meta">${statusBadge(p)}<span>${esc(p.year)}</span><span>· #${String(i + 1).padStart(2, "0")}</span></div>
          ${link ? `<a class="proj-shot" href="${esc(link)}" target="_blank" rel="noopener" aria-label="${L("Abrir", "Open")} ${esc(p.title)} ${L("num separador novo", "in a new tab")}">` : '<div class="proj-shot">'}
            <img src="${esc(projImg(p))}" alt="${L("Captura de ecrã do projeto", "Screenshot of the project")} ${esc(p.title)}">
          ${link ? "</a>" : "</div>"}
          <p>${esc(pdesc(p))}</p>
          <div class="badges">${p.tags.map((t) => `<span class="badge">${esc(t)}</span>`).join("")}</div>
          <div class="btns">
            ${p.live ? `<button class="primary" data-href="${esc(p.live)}"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>${L("Ver ao vivo", "View live")}</span></button>` : ""}
            ${p.repo ? `<button data-href="${esc(p.repo)}"><i class="fa-brands fa-github"></i><span>${L("Código", "Code")}</span></button>` : ""}
          </div>`;
        main.scrollTop = 0;
      };
      rec.el.addEventListener("click", (e) => {
        const b = e.target.closest("[data-pick]");
        if (b) rec.select(+b.dataset.pick);
      });
      rec.select(0);
    },
  }),

  about: () => openWindow({
    id: "about", title: L("Sobre mim - Propriedades", "About me - Properties"), icon: "user", width: 620, height: 540,
    body: `<div class="about">
        <span class="sunken about-photo"><img src="${ME.photo}" alt="${L("Fotografia de", "Photo of")} ${esc(ME.name)}"></span>
        <div>
          <h2>${esc(ME.name)}</h2>
          <p class="handle">${esc(ME.handle)}</p>
          <p><b>${esc(ME.role)}</b></p>
          ${ME.about.map((t) => `<p>${esc(t)}</p>`).join("")}
          <fieldset><legend>${L("Lema", "Motto")}</legend><p><i>“${esc(ME.motto)}”</i></p></fieldset>
          <div class="btns">
            <button data-open="projects"><i class="fa-solid fa-folder-open"></i><span>${L("Projetos", "Projects")}</span></button>
            <button data-open="cv"><i class="fa-solid fa-file-lines"></i><span>${L("Currículo", "Resume")}</span></button>
            <button data-open="contact"><i class="fa-solid fa-envelope"></i><span>${L("Contacto", "Contact")}</span></button>
          </div>
        </div>
      </div>`,
  }),

  cv: () => openWindow({
    id: "cv", title: L("Currículo.pdf - Visualizador", "Resume.pdf - Viewer"), icon: "pdf", width: 780, height: 640, bodyClass: "flush",
    body: `<div class="toolbar">
        <button data-action="downloadCv"><i class="fa-solid fa-download"></i><span>${L("Transferir", "Download")}</span></button>
        <button data-href="${ME.cv}"><i class="fa-solid fa-up-right-from-square"></i><span>${L("Abrir num separador", "Open in a new tab")}</span></button>
      </div>
      <iframe class="cv-frame" src="${ME.cv}" title="${L("Currículo de", "Resume of")} ${esc(ME.name)}"></iframe>`,
  }),

  readme: () => openWindow({
    id: "readme", title: L("leia-me.txt - Bloco de Notas", "readme.txt - Notepad"), icon: "notepad", width: 540, height: 460,
    body: `${menubar()}<pre class="notepad">${readmeText()}</pre>`,
  }),

  contact: () => openWindow({
    id: "contact", title: L("Nova mensagem", "New message"), icon: "mail", width: 500, height: 520,
    body: `<form class="compose" novalidate>
        <div class="field-row-stacked"><label for="c-to">${L("Para:", "To:")}</label><input id="c-to" value="${ME.email}" readonly></div>
        <div class="field-row-stacked"><label for="c-subj">${L("Assunto:", "Subject:")}</label><input id="c-subj" placeholder="${L("Olá Pedro!", "Hi Pedro!")}"></div>
        <div class="field-row-stacked"><label for="c-msg">${L("Mensagem:", "Message:")}</label><textarea id="c-msg" placeholder="${L("Escreva aqui a sua mensagem…", "Write your message here…")}"></textarea></div>
        <div class="btns">
          <button type="submit" class="primary"><i class="fa-solid fa-paper-plane"></i><span>${L("Enviar", "Send")}</span></button>
          <button type="button" data-action="copyEmail"><i class="fa-regular fa-copy"></i><span>${L("Copiar email", "Copy email")}</span></button>
        </div>
      </form>
      <fieldset style="margin-top:10px"><legend>${L("Outros sítios", "Elsewhere")}</legend>
        <div class="links-list">
          <a href="mailto:${ME.email}"><i class="fa-solid fa-envelope"></i>${ME.email}</a>
          <a href="tel:${ME.phone}"><i class="fa-solid fa-phone"></i>${ME.phoneLabel}</a>
          <a href="${ME.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i>GitHub</a>
          <a href="${ME.linkedin}" target="_blank" rel="noopener"><i class="fa-brands fa-linkedin"></i>LinkedIn</a>
          <a href="${ME.instagram}" target="_blank" rel="noopener"><i class="fa-brands fa-instagram"></i>Instagram</a>
        </div>
      </fieldset>`,
    onMount: (rec) => {
      $("form", rec.el).addEventListener("submit", (e) => {
        e.preventDefault();
        const subj = $("#c-subj").value.trim() || L("Olá Pedro!", "Hi Pedro!");
        const body = $("#c-msg").value.trim();
        window.location.href = `mailto:${ME.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      });
    },
  }),

  skills: () => openWindow({
    id: "skills", title: L("Competências - Painel de controlo", "Skills - Control Panel"), icon: "control", width: 480, height: 420,
    body: `<menu role="tablist" aria-label="${L("Áreas", "Areas")}">
        ${Object.entries(SKILLS).map(([k, s], i) => `<li role="tab" aria-selected="${i === 0}"><a href="#" data-tab="${k}">${esc(lbl(s.label))}</a></li>`).join("")}
      </menu>
      <div class="window" role="tabpanel"><div class="window-body" id="skill-panel"></div></div>`,
    onMount: (rec) => {
      const panel = $("#skill-panel", rec.el);
      const show = (k) => {
        const s = SKILLS[k];
        $$("[role=tab]", rec.el).forEach((li) => li.setAttribute("aria-selected", String($("a", li).dataset.tab === k)));
        panel.innerHTML = `
          ${s.rated.map(([n, l]) => `<div class="skill"><span>${esc(n)}</span><div class="meter" role="meter" aria-label="${esc(n)}" aria-valuenow="${LVL[l]}" aria-valuemin="0" aria-valuemax="100"><i style="width:${LVL[l]}%"></i></div><span class="lvl">${lbl(LVL_NAME[l])}</span></div>`).join("")}
          ${s.also.length ? `<p style="margin-top:10px">${s.rated.length ? L("Também uso:", "I also use:") : L("Ferramentas do dia a dia:", "Everyday tools:")}</p>
            <div class="also">${s.also.map((a, i) => `<span><input type="checkbox" id="sk-${k}-${i}" checked disabled><label for="sk-${k}-${i}">${esc(a)}</label></span>`).join("")}</div>` : ""}`;
      };
      rec.el.addEventListener("click", (e) => {
        const a = e.target.closest("[data-tab]");
        if (!a) return;
        e.preventDefault();
        show(a.dataset.tab);
      });
      show(Object.keys(SKILLS)[0]);
    },
  }),

  education: () => openWindow({
    id: "education", title: L("Formação", "Education"), icon: "grad", width: 640, height: 260,
    body: `<div class="sunken-panel"><table class="interactive">
        <thead><tr><th>${L("Curso", "Course")}</th><th>${L("Instituição", "Institution")}</th><th>${L("Nível", "Level")}</th><th>${L("Estado", "Status")}</th></tr></thead>
        <tbody>${EDUCATION().map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`,
  }),

  internet: () => openWindow({
    id: "internet", title: L("A página do Pedro - Navegador", "Pedro's Home Page - Browser"), icon: "globe", width: 660, height: 500, bodyClass: "flush",
    status: L("Concluído", "Done"),
    body: `<div class="toolbar">
        <button disabled><span>◀ ${L("Retroceder", "Back")}</span></button>
        <span class="addr"><label for="addr-web">${L("Endereço", "Address")}</label><input id="addr-web" value="http://pedro.home/index.htm" readonly></span>
      </div>
      <div class="pane"><div class="browser-page">
        <h1>${L("Bem-vindo à página do Pedro!", "Welcome to Pedro's home page!")}</h1>
        <div class="marquee"><span>${L("★ Esta página fica melhor a 800x600 ★ Feita com Bloco de Notas e muito café ★ Obrigado pela visita ★", "★ Best viewed at 800x600 ★ Made with Notepad and lots of coffee ★ Thanks for visiting ★")}</span></div>
        <p class="center">${L("Você é o visitante n.º", "You are visitor no.")} <span class="counter">${String(4980 + new Date().getDate()).padStart(6, "0")}</span></p>
        <hr>
        <p><b>${L("Os meus sites:", "My sites:")}</b></p>
        <ul>${PROJECTS.map((p) => `<li><a href="${esc(p.live || p.repo)}" target="_blank" rel="noopener">${esc(p.title)}</a> — ${esc(p.year)}</li>`).join("")}</ul>
        <p><b>${L("Ligações fixes:", "Cool links:")}</b></p>
        <ul>
          <li><a href="${ME.github}" target="_blank" rel="noopener">${L("O meu GitHub", "My GitHub")}</a></li>
          <li><a href="${ME.linkedin}" target="_blank" rel="noopener">${L("O meu LinkedIn", "My LinkedIn")}</a></li>
          <li><a href="#" data-open="contact">${L("Assine o meu livro de visitas", "Sign my guestbook")}</a></li>
        </ul>
        <hr>
        <p class="center"><small>© ${new Date().getFullYear()} ${esc(ME.name)} · ${L("Em construção desde sempre", "Under construction since forever")} 🚧</small></p>
      </div></div>`,
  }),

  trash: async () => {
    const wait = L("Esperar", "Wait");
    const r = await msgBox({
      title: L("Lixeira", "Recycle Bin"), icon: "error", err: true, buttons: [wait, L("Fechar programa", "End task")],
      text: L("<b>A Lixeira deixou de responder.</b><br>Está cheia de ideias que ainda não viraram projetos.",
        "<b>Recycle Bin is not responding.</b><br>It's full of ideas that haven't become projects yet."),
    });
    if (r === wait) {
      await msgBox({ title: L("Lixeira", "Recycle Bin"), icon: "info", text: L("Continua sem responder. Talvez a próxima ideia seja o próximo projeto.", "Still not responding. Maybe the next idea will be the next project.") });
    }
  },

  noopen: async () => {
    const title = L("NÃO ABRIR.exe", "DO NOT OPEN.exe");
    const anyway = L("Abrir mesmo assim", "Open anyway");
    const see = L("Ver projetos", "See projects");
    const r = await msgBox({
      title, icon: "warn", buttons: [anyway, L("Não", "No")],
      text: L("Tem a certeza? O nome do ficheiro é bastante claro.", "Are you sure? The file name is pretty clear."),
    });
    if (r !== anyway) return;
    const r2 = await msgBox({
      title, icon: "error", err: true, buttons: [see, L("Fechar", "Close")],
      text: L("<b>NÃO ABRIR.exe deixou de responder.</b><br>Avisámos. Como castigo, tem de ver os meus projetos.",
        "<b>DO NOT OPEN.exe is not responding.</b><br>We warned you. As punishment, you have to look at my projects."),
    });
    if (r2 === see) openApp("projects");
  },
};

function openApp(name) {
  toggleStart(false);
  const fn = APPS[name];
  return fn ? fn() : null;
}

function openProject(i) {
  const rec = openApp("projects");
  rec?.select?.(i);
}

/* ---------- Ações ---------- */
const ACTIONS = {
  async shutdown() {
    toggleStart(false);
    const off = L("Desligar", "Shut down");
    const r = await msgBox({ title: L("Desligar o PedroOS 98", "Shut Down PedroOS 98"), icon: "power", buttons: [off, L("Cancelar", "Cancel")], text: L("Quer mesmo desligar o computador?", "Do you really want to shut down the computer?") });
    if (r !== off) return;
    [...wins.values()].forEach((w) => closeWindow(w));
    $("#desktop").hidden = true;
    $("#off").hidden = false;
  },
  lang() {
    toggleStart(false);
    [...wins.values()].forEach((w) => closeWindow(w));
    setLang({ pt: "en", en: "es", es: "pt" }[LANG]);
    openApp("welcome");
  },
  classic() { window.location.href = "classico/"; },
  async copyEmail() {
    let ok = false;
    try { await navigator.clipboard.writeText(ME.email); ok = true; } catch (e) { /* sem permissão */ }
    msgBox({ title: L("Contacto", "Contact"), icon: "info", text: ok ? `${L("Email copiado:", "Email copied:")}<br><b>${ME.email}</b>` : `${L("O meu email é:", "My email is:")}<br><b>${ME.email}</b>` });
  },
  downloadCv() {
    const a = document.createElement("a");
    a.href = ME.cv;
    a.download = "CV-Pedro-Lucas-Garcia.pdf";
    document.body.append(a);
    a.click();
    a.remove();
  },
};

/* ---------- Eventos ---------- */
let lastPointer = "mouse";
document.addEventListener("pointerdown", (e) => { lastPointer = e.pointerType; }, true);

document.addEventListener("click", (e) => {
  const t = e.target;
  if (!$("#start-menu").hidden && !t.closest("#start-menu, #start-btn")) toggleStart(false);

  if (t.closest("#start-btn")) { toggleStart(); return; }

  const icon = t.closest("button.icon");
  if (icon) {
    selectIcon(icon);
    if (e.detail === 0 || lastPointer === "touch" || lastPointer === "pen") openApp(icon.dataset.open);
    return;
  }
  if (t === $("#desktop") || t === $("#icons") || t.classList?.contains("pane")) selectIcon(null);

  const el = t.closest("[data-act],[data-task],[data-open],[data-project],[data-href],[data-action],[data-close],[data-close-sticky]");
  if (!el) return;
  const winEl = el.closest(".win");
  const rec = winEl ? wins.get(winEl.dataset.win) : null;

  if (el.dataset.act && rec) {
    const a = el.dataset.act;
    if (a === "min") minimizeWindow(rec);
    else if (a === "max") toggleMax(rec);
    else closeWindow(rec);
  } else if (el.dataset.task) {
    const r = wins.get(el.dataset.task);
    if (!r) return;
    if (r.el.classList.contains("minimized")) restoreWindow(r);
    else if (r.el.classList.contains("active")) minimizeWindow(r);
    else focusWindow(r);
  } else if (el.dataset.open) {
    e.preventDefault();
    openApp(el.dataset.open);
  } else if (el.dataset.project !== undefined) {
    openProject(+el.dataset.project);
  } else if (el.dataset.href) {
    window.open(el.dataset.href, "_blank", "noopener");
  } else if (el.dataset.action) {
    ACTIONS[el.dataset.action]?.();
  } else if (el.hasAttribute("data-close") && rec) {
    closeWindow(rec);
  } else if (el.hasAttribute("data-close-sticky")) {
    $("#sticky").hidden = true;
  }
});

document.addEventListener("dblclick", (e) => {
  const icon = e.target.closest("button.icon");
  if (icon && lastPointer === "mouse") openApp(icon.dataset.open);
});

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape" || $("#desktop").hidden) return;
  if (!$("#start-menu").hidden) { toggleStart(false); $("#start-btn").focus(); return; }
  const top = topWindow();
  if (top?.o.modal) closeWindow(top);
});

$("#off").addEventListener("click", () => {
  $("#off").hidden = true;
  showLogin();
});

boot();
