/* =========================================================
   PROJETOS — lista partilhada pelas duas versões do portfólio
   (versão principal PedroOS 98 em /index.html e versão clássica em /classico/).

   Para adicionar um projeto novo, basta acrescentar um objeto
   a esta lista (a ordem aqui é a ordem no site).
   - image:  caminho da captura a partir da raiz (ideal 1440x900)
   - status: "online" ou "wip" (em construção)
   - live / repo: deixe "" se não existir
   - pages:  capturas de páginas do projeto (usadas nas pastas da versão clássica)
   ========================================================= */
// description_en / description_es: versões inglesa e espanhola da descrição (idem name_en / name_es nas páginas)
const PROJECTS = [
  {
    title: "Royal Lion Studio",
    year: "2026",
    status: "online",
    image: "assets/projects/royal-lion.png",
    description:
      "Site para uma barbearia em Lamego: serviços, galeria de trabalhos, equipa e marcação online integrada. A versão nova tem um painel de administração para editar textos e fotos sem mexer no código.",
    description_en:
      "Website for a barbershop in Lamego: services, work gallery, team and built-in online booking. The new version has an admin panel to edit text and photos without touching code.",
    description_es:
      "Web para una barbería en Lamego: servicios, galería de trabajos, equipo y reserva online integrada. La nueva versión tiene un panel de administración para editar textos y fotos sin tocar el código.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js"],
    live: "https://royal-lion-studio.vercel.app",
    repo: "https://github.com/PedroLucasGarcia/royal-lion-studio",
    pages: [
      { name: "Início", name_en: "Home", name_es: "Inicio", img: "assets/projects/royal-lion/inicio.jpg" },
      { name: "Serviços", name_en: "Services", name_es: "Servicios", img: "assets/projects/royal-lion/servicos.jpg" },
      { name: "Equipa", name_en: "Team", name_es: "Equipo", img: "assets/projects/royal-lion/equipa.jpg" },
      { name: "Marcação", name_en: "Booking", name_es: "Reserva", img: "assets/projects/royal-lion/marcacao.jpg" },
    ],
  },
  {
    title: "EletroPoint",
    year: "2026",
    status: "online",
    image: "assets/projects/eletropoint.png",
    description:
      "Loja online de eletrónica — smartphones, computadores, portáteis, tablets e consolas — com carrossel de destaques, carrinho e páginas de login e registo.",
    description_en:
      "Online electronics store — smartphones, computers, laptops, tablets and consoles — with a featured carousel, cart and login/sign-up pages.",
    description_es:
      "Tienda online de electrónica — smartphones, ordenadores, portátiles, tablets y consolas — con carrusel de destacados, carrito y páginas de inicio de sesión y registro.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://eletropoint.vercel.app",
    repo: "https://github.com/PedroLucasGarcia/EletroPoint-Ecommerce",
    pages: [
      { name: "Início", name_en: "Home", name_es: "Inicio", img: "assets/projects/eletropoint/inicio.jpg" },
      { name: "Categoria", name_en: "Category", name_es: "Categoría", img: "assets/projects/eletropoint/categoria.jpg" },
      { name: "Carrinho", name_en: "Cart", name_es: "Carrito", img: "assets/projects/eletropoint/carrinho.jpg" },
      { name: "Login", name_en: "Login", name_es: "Login", img: "assets/projects/eletropoint/login.jpg" },
    ],
  },
  {
    title: "FrameGame",
    year: "2026",
    status: "online",
    image: "assets/projects/framegame.png",
    description:
      "Jogo diário de adivinhar o filme a partir de uma imagem. Seis tentativas, arquivo de dias anteriores, estatísticas guardadas no browser e resultado partilhável. Um GitHub Action vai buscar filmes novos ao TMDB todos os dias.",
    description_en:
      "Daily game where you guess the film from a single frame. Six tries, archive of past days, stats saved in the browser and a shareable result. A GitHub Action fetches new films from TMDB every day.",
    description_es:
      "Juego diario de adivinar la película a partir de una imagen. Seis intentos, archivo de días anteriores, estadísticas guardadas en el navegador y resultado para compartir. Una GitHub Action busca películas nuevas en TMDB todos los días.",
    tags: ["JavaScript", "GitHub Actions", "API TMDB", "localStorage"],
    live: "https://frame-game-seven.vercel.app",
    repo: "https://github.com/PedroLucasGarcia/FrameGame",
    pages: [
      { name: "Jogo", name_en: "Game", name_es: "Juego", img: "assets/projects/framegame/jogo.jpg" },
      { name: "Como jogar", name_en: "How to play", name_es: "Cómo jugar", img: "assets/projects/framegame/como-jogar.jpg" },
    ],
  },
  {
    title: "Orçamento Pessoal",
    year: "2026",
    status: "online",
    image: "assets/projects/orcamento.png",
    description:
      "App para registar despesas e acompanhar o orçamento do mês: consulta com filtros, exportação para CSV e resumo mensal com metas. Tudo fica guardado no próprio browser.",
    description_en:
      "App to log expenses and track the monthly budget: filtered search, CSV export and a monthly summary with goals. Everything is stored in the browser itself.",
    description_es:
      "App para registrar gastos y seguir el presupuesto del mes: consulta con filtros, exportación a CSV y resumen mensual con metas. Todo se guarda en el propio navegador.",
    tags: ["JavaScript", "Bootstrap 5", "localStorage"],
    live: "https://app-orcamento-pessoal-beta.vercel.app",
    repo: "https://github.com/PedroLucasGarcia/AppOrcamentoPessoal",
    pages: [
      { name: "Registo", name_en: "New expense", name_es: "Registro", img: "assets/projects/orcamento/registo.jpg" },
      { name: "Consulta", name_en: "Search", name_es: "Consulta", img: "assets/projects/orcamento/consulta.jpg" },
      { name: "Resumo", name_en: "Summary", name_es: "Resumen", img: "assets/projects/orcamento/resumo.jpg" },
    ],
  },
];
