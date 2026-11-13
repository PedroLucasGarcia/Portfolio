/* =========================================================
   PedroOS 98 — Jogos (Campo Minado e Paciência)
   Implementações próprias, carregadas depois de script.js:
   usam ICONS, APPS, openWindow, msgBox, $, $$, clamp e esc.
   ========================================================= */
(() => {
  /* ---------- Ícones e entradas no ambiente de trabalho ---------- */
  ICONS.mine =
    R(15, 3, 2, 26, "#000") + R(3, 15, 26, 2, "#000") + R(7, 7, 3, 3, "#000") + R(22, 7, 3, 3, "#000") + R(7, 22, 3, 3, "#000") + R(22, 22, 3, 3, "#000") +
    `<circle cx="16" cy="16" r="8.5" fill="#000"/>` + R(12, 11, 3, 3, "#fff") + R(11, 13, 2, 2, "#c0c0c0");
  ICONS.cards =
    R(3, 3, 16, 22, "#000") + R(4, 4, 14, 20, "#000080") + R(6, 6, 10, 16, "#e2701f") + R(8, 8, 6, 12, "#000080") +
    R(12, 8, 17, 22, "#000") + R(13, 9, 15, 20, "#fff") + R(14, 10, 2, 3, "#c00000") +
    R(16, 15, 3, 3, "#c00000") + R(21, 15, 3, 3, "#c00000") + R(16, 17, 8, 3, "#c00000") + R(17, 20, 6, 2, "#c00000") + R(19, 22, 2, 2, "#c00000");

  const GAME_ENTRIES = [
    ["minesweeper", ["Campo Minado", "Minesweeper"], "mine"],
    ["solitaire", ["Paciência", "Solitaire"], "cards"],
    ["freecell", ["FreeCell", "FreeCell"], "freecell"],
    ["ski", ["Ski Rush", "Ski Rush", "Ski Rush"], "ski"],
  ];
  const at = DESKTOP_ICONS.findIndex((d) => d[0] === "trash");
  DESKTOP_ICONS.splice(at < 0 ? DESKTOP_ICONS.length : at, 0, ...GAME_ENTRIES);
  const sep = START_ITEMS.indexOf("-");
  START_ITEMS.splice(sep < 0 ? START_ITEMS.length : sep, 0, "-", ...GAME_ENTRIES);

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sem storage */ } },
  };
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtT = (s) => `${(s / 60) | 0}:${String(s % 60).padStart(2, "0")}`;
  const px = (s) => `<svg class="ico" viewBox="0 0 16 16" width="16" height="16" shape-rendering="crispEdges" aria-hidden="true">${s}</svg>`;

  /* =========================================================
     CAMPO MINADO
     ========================================================= */
  const MS_LEVELS = {
    beg: { c: 9, r: 9, m: 10, n: ["Principiante", "Beginner"] },
    int: { c: 16, r: 16, m: 40, n: ["Intermédio", "Intermediate"] },
    exp: { c: 30, r: 16, m: 99, n: ["Perito", "Expert"] },
  };
  const led = (n) => { n = clamp(n, -99, 999); return n < 0 ? "-" + String(-n).padStart(2, "0") : String(n).padStart(3, "0"); };

  const FACE_BASE = `<circle cx="8" cy="8" r="6.5" fill="#ffe000" stroke="#000" stroke-width="1"/>`;
  const FACES = {
    ok: px(FACE_BASE + R(5, 5, 2, 2, "#000") + R(9, 5, 2, 2, "#000") + R(4, 9, 1, 1, "#000") + R(5, 10, 1, 1, "#000") + R(6, 11, 4, 1, "#000") + R(10, 10, 1, 1, "#000") + R(11, 9, 1, 1, "#000")),
    wow: px(FACE_BASE + R(5, 4, 2, 3, "#000") + R(9, 4, 2, 3, "#000") + R(7, 9, 2, 1, "#000") + R(6, 10, 1, 2, "#000") + R(9, 10, 1, 2, "#000") + R(7, 12, 2, 1, "#000")),
    dead: px(FACE_BASE + R(4, 4, 1, 1, "#000") + R(6, 4, 1, 1, "#000") + R(5, 5, 1, 1, "#000") + R(4, 6, 1, 1, "#000") + R(6, 6, 1, 1, "#000") +
      R(9, 4, 1, 1, "#000") + R(11, 4, 1, 1, "#000") + R(10, 5, 1, 1, "#000") + R(9, 6, 1, 1, "#000") + R(11, 6, 1, 1, "#000") +
      R(6, 10, 4, 1, "#000") + R(5, 11, 1, 1, "#000") + R(10, 11, 1, 1, "#000")),
    cool: px(FACE_BASE + R(3, 5, 10, 1, "#000") + R(4, 5, 3, 2, "#000") + R(9, 5, 3, 2, "#000") + R(4, 9, 1, 1, "#000") + R(5, 10, 1, 1, "#000") + R(6, 11, 4, 1, "#000") + R(10, 10, 1, 1, "#000") + R(11, 9, 1, 1, "#000")),
  };
  const MINE = px(R(7, 1, 2, 14, "#000") + R(1, 7, 14, 2, "#000") + R(3, 3, 2, 2, "#000") + R(11, 3, 2, 2, "#000") + R(3, 11, 2, 2, "#000") + R(11, 11, 2, 2, "#000") +
    `<circle cx="8" cy="8" r="4.5" fill="#000"/>` + R(6, 5, 2, 2, "#fff"));
  const FLAG = px(R(7, 3, 2, 8, "#000") + R(4, 11, 8, 1, "#000") + R(3, 12, 10, 2, "#000") + R(3, 3, 5, 5, "#e00000") + R(5, 4, 3, 3, "#e00000"));
  const BADFLAG = MINE.replace("</svg>", `<path d="M2 2L14 14M14 2L2 14" stroke="#e00000" stroke-width="2"/></svg>`);

  APPS.minesweeper = () => openWindow({
    id: "minesweeper", title: L("Campo Minado", "Minesweeper"), icon: "mine", width: 260, resizable: false, noMax: true,
    bodyClass: "flush ms-body",
    body: `
      <div class="ms-opts">
        <label class="ms-lvl">${L("Nível", "Level")}
          <select data-ms-level aria-label="${L("Nível de dificuldade", "Difficulty level")}">
            ${Object.entries(MS_LEVELS).map(([k, l]) => `<option value="${k}">${lbl(l.n)}</option>`).join("")}
          </select>
        </label>
        <span class="ms-flagmode"><input type="checkbox" id="ms-flagmode"><label for="ms-flagmode">${L("Bandeira", "Flag")}</label></span>
      </div>
      <div class="ms-frame">
        <div class="ms-head">
          <output class="led ms-count" aria-label="${L("Minas por marcar", "Mines left")}">010</output>
          <button class="plain ms-face" aria-label="${L("Novo jogo", "New game")}">${FACES.ok}</button>
          <output class="led ms-time" aria-label="${L("Tempo em segundos", "Time in seconds")}">000</output>
        </div>
        <div class="ms-gridwrap"><div class="ms-grid" role="grid" aria-label="${L("Campo de minas", "Minefield")}"></div></div>
      </div>
      <p class="ms-hint">${L("Clique para abrir · botão direito ou toque longo para pôr bandeira", "Click to open · right-click or long-press to flag")}</p>`,
    onMount(rec) {
      const b = rec.body;
      const grid = $(".ms-grid", b), face = $(".ms-face", b), cnt = $(".ms-count", b), tm = $(".ms-time", b);
      const lvSel = $("[data-ms-level]", b), flagMode = $("#ms-flagmode", b);
      let lv = store.get("pos98-ms-level") || "beg";
      if (!MS_LEVELS[lv]) lv = "beg";
      lvSel.value = lv;
      let cfg, cells, state, flags, opened, secs, timer = null;

      const nb = (i) => {
        const x = i % cfg.c, y = (i / cfg.c) | 0, out = [];
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < cfg.c && ny < cfg.r) out.push(ny * cfg.c + nx);
        }
        return out;
      };
      const setFace = (f) => { face.innerHTML = FACES[f]; };
      const updCount = () => { cnt.textContent = led(cfg.m - flags); };
      const stopTimer = () => { clearInterval(timer); timer = null; };
      const startTimer = () => {
        secs = 1; tm.textContent = led(secs);
        timer = setInterval(() => { secs = Math.min(999, secs + 1); tm.textContent = led(secs); }, 1000);
      };

      function newGame() {
        stopTimer();
        cfg = MS_LEVELS[lv];
        state = "ready"; flags = 0; opened = 0; secs = 0;
        cells = Array.from({ length: cfg.c * cfg.r }, () => ({ mine: false, n: 0, open: false, flag: false }));
        grid.style.setProperty("--cols", cfg.c);
        grid.innerHTML = cells.map((_, i) => `<button class="plain ms-cell" data-i="${i}" aria-label="${L("Casa", "Cell")} ${i % cfg.c + 1}, ${((i / cfg.c) | 0) + 1}"></button>`).join("");
        setFace("ok"); updCount(); tm.textContent = led(0);
        if (!isMobile()) { rec.el.style.width = "auto"; rec.el.style.height = "auto"; }
      }

      function plant(safe) {
        const ban = new Set([safe, ...nb(safe)]);
        let pool = cells.map((_, i) => i).filter((i) => !ban.has(i));
        if (pool.length < cfg.m) pool = cells.map((_, i) => i).filter((i) => i !== safe);
        shuffle(pool).slice(0, cfg.m).forEach((i) => { cells[i].mine = true; });
        cells.forEach((c, i) => { c.n = nb(i).filter((j) => cells[j].mine).length; });
      }

      function paint(i, extra = "") {
        const c = cells[i], el = grid.children[i];
        el.className = "plain ms-cell" + (c.open ? " open" : "") + extra;
        if (c.open && c.mine) el.innerHTML = MINE;
        else if (c.open && c.n) el.innerHTML = `<b class="n${c.n}">${c.n}</b>`;
        else if (!c.open && c.flag) el.innerHTML = FLAG;
        else el.innerHTML = "";
        el.setAttribute("aria-label", c.open ? (c.mine ? L("Mina", "Mine") : c.n ? L(`${c.n} minas à volta`, `${c.n} mines around`, `${c.n} minas alrededor`) : L("Vazia", "Empty")) : c.flag ? L("Bandeira", "Flagged") : L("Fechada", "Closed"));
      }

      function open(i) {
        const stack = [i];
        while (stack.length) {
          const k = stack.pop(), c = cells[k];
          if (c.open || c.flag) continue;
          c.open = true; opened++;
          paint(k);
          if (c.mine) return lose(k);
          if (!c.n) nb(k).forEach((j) => { if (!cells[j].open) stack.push(j); });
        }
        if (opened === cells.length - cfg.m) win();
      }

      function reveal(i) {
        if (state === "over") return;
        const c = cells[i];
        if (c.flag) return;
        if (state === "ready") { plant(i); state = "play"; startTimer(); }
        if (c.open) {
          if (!c.n) return;
          const around = nb(i);
          if (around.filter((j) => cells[j].flag).length !== c.n) return;
          around.forEach((j) => { if (state === "play" && !cells[j].open && !cells[j].flag) open(j); });
          return;
        }
        open(i);
      }

      function toggleFlag(i) {
        if (state === "over") return;
        const c = cells[i];
        if (c.open) return;
        c.flag = !c.flag;
        flags += c.flag ? 1 : -1;
        paint(i); updCount();
      }

      function lose(k) {
        state = "over"; stopTimer(); setFace("dead");
        cells.forEach((c, i) => {
          if (i === k) paint(i, " boom");
          else if (c.mine && !c.flag) { c.open = true; paint(i); }
          else if (!c.mine && c.flag) { grid.children[i].innerHTML = BADFLAG; grid.children[i].classList.add("open"); }
        });
      }

      function win() {
        state = "over"; stopTimer(); setFace("cool");
        cells.forEach((c, i) => { if (c.mine && !c.flag) { c.flag = true; paint(i); } });
        flags = cfg.m; updCount();
        const best = store.get("pos98-ms-best") || {};
        const record = !best[lv] || secs < best[lv];
        if (record) { best[lv] = secs; store.set("pos98-ms-best", best); }
        setTimeout(() => msgBox({
          title: L("Campo Minado", "Minesweeper"), icon: "info",
          text: L(`<b>Campo limpo!</b><br>Nível ${esc(lbl(cfg.n))} em ${secs} s.`, `<b>Field cleared!</b><br>${esc(lbl(cfg.n))} level in ${secs} s.`, `<b>¡Campo despejado!</b><br>Nivel ${esc(lbl(cfg.n))} en ${secs} s.`) + (record ? L("<br>Novo recorde pessoal!", "<br>New personal best!") : `<br>${L("Recorde", "Best")}: ${best[lv]} s.`),
        }), 250);
      }

      // Rato: clique abre, botão direito marca. Toque: toque longo marca.
      let press = null, longFired = false;
      grid.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const cell = e.target.closest(".ms-cell");
        if (cell && e.pointerType !== "touch" && !longFired) toggleFlag(+cell.dataset.i);
      });
      grid.addEventListener("pointerdown", (e) => {
        longFired = false;
        const cell = e.target.closest(".ms-cell");
        if (!cell || state === "over") return;
        if (e.button === 0) setFace("wow");
        if (e.pointerType !== "mouse") {
          clearTimeout(press);
          press = setTimeout(() => { longFired = true; setFace("ok"); toggleFlag(+cell.dataset.i); navigator.vibrate?.(20); }, 420);
        }
      });
      const endPress = () => { clearTimeout(press); if (state !== "over") setFace("ok"); };
      grid.addEventListener("pointerup", endPress);
      grid.addEventListener("pointerleave", endPress);
      grid.addEventListener("pointercancel", endPress);
      grid.addEventListener("click", (e) => {
        const cell = e.target.closest(".ms-cell");
        if (!cell || longFired) { longFired = false; return; }
        const i = +cell.dataset.i;
        if (flagMode.checked && !cells[i].open) toggleFlag(i);
        else reveal(i);
      });
      face.addEventListener("click", newGame);
      lvSel.addEventListener("change", () => { lv = lvSel.value; store.set("pos98-ms-level", lv); newGame(); });

      rec.o.onClose = stopTimer;
      newGame();
    },
  });

  /* =========================================================
     PACIÊNCIA (Klondike, tira uma carta)
     ========================================================= */
  const SUITS = ["♠", "♥", "♦", "♣"];
  const SUIT_NAMES = () => L(["espadas", "copas", "ouros", "paus"], ["spades", "hearts", "diamonds", "clubs"], ["picas", "corazones", "diamantes", "tréboles"]);
  const RANKS = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const RANK_NAMES = () => L(["", "Ás", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Valete", "Dama", "Rei"], ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"], ["", "As", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jota", "Reina", "Rey"]);
  const cardName = (c) => L(`${RANK_NAMES()[c.r]} de ${SUIT_NAMES()[c.s]}`, `${RANK_NAMES()[c.r]} of ${SUIT_NAMES()[c.s]}`, `${RANK_NAMES()[c.r]} de ${SUIT_NAMES()[c.s]}`);
  const isRed = (c) => c.s === 1 || c.s === 2;

  APPS.solitaire = () => openWindow({
    id: "solitaire", title: L("Paciência", "Solitaire"), icon: "cards", width: 620, height: 540,
    bodyClass: "flush sol-body",
    status: L("Pontos: 0 &nbsp;·&nbsp; Tempo: 0:00 &nbsp;·&nbsp; Jogadas: 0", "Score: 0 &nbsp;·&nbsp; Time: 0:00 &nbsp;·&nbsp; Moves: 0"),
    body: `
      <div class="sol-bar">
        <button data-sol="new"><i class="fa-solid fa-rotate"></i><span>${L("Novo jogo", "New game")}</span></button>
        <button data-sol="undo"><i class="fa-solid fa-rotate-left"></i><span>${L("Desfazer", "Undo")}</span></button>
        <button data-sol="auto" title="${L("Envia para as fundações todas as cartas possíveis", "Send every possible card to the foundations")}"><i class="fa-solid fa-forward"></i><span>${L("Arrumar", "Auto")}</span></button>
      </div>
      <div class="sol-felt" aria-label="${L("Mesa de Paciência", "Solitaire table")}">
        <div class="sol-row sol-top">
          <div class="pile stock" data-pile="stock" aria-label="${L("Baralho", "Stock")}"></div>
          <div class="pile waste" data-pile="waste" aria-label="${L("Descarte", "Waste")}"></div>
          <div></div>
          ${[0, 1, 2, 3].map((i) => `<div class="pile found" data-pile="f${i}" aria-label="${L("Fundação", "Foundation")} ${i + 1}"></div>`).join("")}
        </div>
        <div class="sol-row sol-tab">
          ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<div class="pile col" data-pile="t${i}" aria-label="${L("Coluna", "Column")} ${i + 1}"></div>`).join("")}
        </div>
      </div>`,
    onMount(rec) {
      const b = rec.body;
      const felt = $(".sol-felt", b);
      const statusEl = $(".status-bar-field", rec.el);
      let G, undo, sel, lastClick, drag, timer, secs, started, won, anim;

      const pile = (id) => (id === "stock" ? G.stock : id === "waste" ? G.waste : id[0] === "f" ? G.found[+id[1]] : G.tab[+id[1]]);
      const top = (p) => p[p.length - 1];
      const snap = () => JSON.stringify(G);

      function deal() {
        stopAnim();
        const deck = [];
        for (let s = 0; s < 4; s++) for (let r = 1; r <= 13; r++) deck.push({ s, r, up: false });
        shuffle(deck);
        G = { stock: [], waste: [], found: [[], [], [], []], tab: [[], [], [], [], [], [], []], score: 0, moves: 0 };
        for (let i = 0; i < 7; i++) for (let j = i; j < 7; j++) { const c = deck.pop(); c.up = i === j; G.tab[j].push(c); }
        G.stock = deck;
        undo = []; sel = null; lastClick = null; won = false; started = false; secs = 0;
        clearInterval(timer); timer = null;
        render();
      }

      function status() {
        const t = `${(secs / 60) | 0}:${String(secs % 60).padStart(2, "0")}`;
        if (statusEl) statusEl.innerHTML = `${L("Pontos", "Score")}: ${G.score} &nbsp;·&nbsp; ${L("Tempo", "Time")}: ${t} &nbsp;·&nbsp; ${L("Jogadas", "Moves")}: ${G.moves}`;
      }
      function tickStart() {
        if (started) return;
        started = true;
        timer = setInterval(() => { secs++; status(); }, 1000);
      }

      const cardHTML = (c, idx, y, isSel) => {
        if (!c.up) return `<div class="card back" data-idx="${idx}" style="top:${y}px" aria-label="${L("Carta virada", "Face-down card")}"></div>`;
        const rk = RANKS[c.r], st = SUITS[c.s];
        const mid = c.r > 10 ? `<span class="mid"><i>${rk}<small>${st}</small></i></span>` : `<span class="mid">${st}</span>`;
        return `<div class="card up${isRed(c) ? " red" : ""}${c.r > 10 ? " court" : ""}${isSel ? " sel" : ""}" data-idx="${idx}" style="top:${y}px" aria-label="${cardName(c)}">
          <span class="tl">${rk}<br>${st}</span>${mid}<span class="tl br">${rk}<br>${st}</span></div>`;
      };

      function metrics() {
        const cs = getComputedStyle(felt);
        return { cw: parseFloat(cs.getPropertyValue("--cw")) || 64, ch: parseFloat(cs.getPropertyValue("--ch")) || 90, gap: parseFloat(cs.getPropertyValue("--gap")) || 8 };
      }

      function render() {
        const { cw, ch, gap } = metrics();
        const isS = (pid, i) => sel && sel.pid === pid && i >= sel.idx;
        // Baralho
        const st = $('[data-pile="stock"]', felt);
        st.classList.toggle("empty", !G.stock.length);
        st.innerHTML = G.stock.length ? cardHTML({ up: false }, G.stock.length - 1, 0) : "";
        // Descarte e fundações: mostra as duas de cima (a de baixo fica visível ao arrastar)
        for (const pid of ["waste", "f0", "f1", "f2", "f3"]) {
          const p = pile(pid), from = Math.max(0, p.length - 2);
          $(`[data-pile="${pid}"]`, felt).innerHTML = p.slice(from).map((c, k) => cardHTML(c, from + k, 0, isS(pid, from + k))).join("");
        }
        // Colunas, com espaçamento comprimido se não couberem
        const topRow = $(".sol-top", felt);
        const avail = felt.clientHeight - topRow.offsetHeight - gap * 3.5 - ch;
        const dn = Math.max(4, cw * 0.12), upOff = Math.max(10, cw * 0.3);
        G.tab.forEach((p, t) => {
          const need = p.reduce((a, c, i) => (i === p.length - 1 ? a : a + (c.up ? upOff : dn)), 0);
          const k = need > avail && avail > 0 ? Math.max(0.3, avail / need) : 1;
          let y = 0;
          $(`[data-pile="t${t}"]`, felt).innerHTML = p.map((c, i) => {
            const h = cardHTML(c, i, Math.round(y), isS(`t${t}`, i));
            y += (c.up ? upOff : dn) * k;
            return h;
          }).join("");
        });
        status();
      }

      function canMove(cards, toId) {
        const dest = pile(toId), c = cards[0], t = top(dest);
        if (toId[0] === "f") return cards.length === 1 && (t ? t.s === c.s && c.r === t.r + 1 : c.r === 1);
        if (toId[0] === "t") return t ? t.up && isRed(t) !== isRed(c) && c.r === t.r - 1 : c.r === 13;
        return false;
      }

      function tryMove(fromId, idx, toId) {
        if (fromId === toId || toId === "stock" || toId === "waste") return false;
        const from = pile(fromId);
        const cards = from.slice(idx);
        if (!cards.length || !cards[0].up || !canMove(cards, toId)) return false;
        undo.push(snap()); if (undo.length > 200) undo.shift();
        from.splice(idx);
        pile(toId).push(...cards);
        const f = fromId[0], t = toId[0];
        if (f === "w" && t === "t") G.score += 5;
        if ((f === "w" || f === "t") && t === "f") G.score += 10;
        if (f === "f" && t === "t") G.score = Math.max(0, G.score - 15);
        if (f === "t" && from.length && !top(from).up) { top(from).up = true; G.score += 5; }
        G.moves++; sel = null; tickStart();
        render(); checkWin();
        return true;
      }

      function smartMove(pid, idx) {
        const p = pile(pid);
        if (idx === p.length - 1) for (let i = 0; i < 4; i++) if (tryMove(pid, idx, "f" + i)) return true;
        if (pid[0] === "f" || pid[0] === "w" || pid[0] === "t") {
          // Prefere colunas com cartas; só depois as vazias (para não mover reis à toa)
          const order = [0, 1, 2, 3, 4, 5, 6].sort((a, b) => (G.tab[a].length ? 0 : 1) - (G.tab[b].length ? 0 : 1));
          for (const i of order) {
            if (pid[0] === "t" && !G.tab[i].length && idx === 0) continue;
            if (tryMove(pid, idx, "t" + i)) return true;
          }
        }
        return false;
      }

      function drawStock() {
        sel = null;
        if (!G.stock.length && !G.waste.length) return;
        undo.push(snap());
        if (!G.stock.length) {
          G.stock = G.waste.reverse().map((c) => ({ ...c, up: false }));
          G.waste = [];
          G.score = Math.max(0, G.score - 100);
        } else {
          const c = G.stock.pop(); c.up = true; G.waste.push(c);
        }
        G.moves++; tickStart(); render();
      }

      function autoAll() {
        let moved = true, any = false;
        while (moved) {
          moved = false;
          for (const pid of ["waste", "t0", "t1", "t2", "t3", "t4", "t5", "t6"]) {
            const p = pile(pid);
            if (!p.length) continue;
            for (let i = 0; i < 4 && !moved; i++) if (tryMove(pid, p.length - 1, "f" + i)) moved = any = true;
          }
        }
        return any;
      }

      function handleClick(pid, idx) {
        const now = Date.now();
        if (lastClick && lastClick.pid === pid && lastClick.idx === idx && now - lastClick.t < 380) {
          lastClick = null; sel = null;
          if (!smartMove(pid, idx)) render();
          return;
        }
        lastClick = { pid, idx, t: now };
        if (sel) {
          if (sel.pid === pid && sel.idx === idx) { sel = null; render(); return; }
          if (sel.pid !== pid && tryMove(sel.pid, sel.idx, pid)) return;
        }
        sel = idx >= 0 ? { pid, idx } : null;
        render();
      }

      // Arrastar (rato e toque) ou clicar
      felt.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || won) return;
        const pileEl = e.target.closest("[data-pile]");
        if (!pileEl) return;
        const pid = pileEl.dataset.pile;
        if (pid === "stock") { drawStock(); return; }
        const cardEl = e.target.closest(".card.up");
        if (!cardEl) {
          if (sel && tryMove(sel.pid, sel.idx, pid)) return;
          if (sel) { sel = null; render(); }
          return;
        }
        const idx = +cardEl.dataset.idx;
        if (pid !== "waste" && pid[0] !== "t" && idx !== pile(pid).length - 1) return;
        if (pid === "waste" && idx !== G.waste.length - 1) return;
        const r = cardEl.getBoundingClientRect();
        drag = { pid, idx, x0: e.clientX, y0: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, ghost: null, id: e.pointerId };
        e.preventDefault();
      });

      function onMove(e) {
        if (!drag || e.pointerId !== drag.id) return;
        if (!drag.ghost) {
          if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
          const srcPile = $(`[data-pile="${drag.pid}"]`, felt);
          const els = $$(".card", srcPile).filter((c) => +c.dataset.idx >= drag.idx);
          const base = parseFloat(els[0].style.top) || 0;
          const g = document.createElement("div");
          g.className = "sol-ghost";
          g.innerHTML = els.map((c) => { const n = c.cloneNode(true); n.classList.remove("sel"); n.style.top = (parseFloat(c.style.top) - base) + "px"; return n.outerHTML; }).join("");
          felt.append(g);
          els.forEach((c) => c.classList.add("lifted"));
          drag.ghost = g;
        }
        drag.ghost.style.transform = `translate(${e.clientX - drag.dx}px, ${e.clientY - drag.dy}px)`;
      }

      function dropTarget() {
        const g = drag.ghost.firstElementChild.getBoundingClientRect();
        const fr = felt.getBoundingClientRect();
        let best = null, area = 0;
        $$(".pile", felt).forEach((p) => {
          const r = p.getBoundingClientRect();
          const bottom = p.classList.contains("col") ? fr.bottom + felt.scrollHeight : r.bottom;
          const w = Math.min(g.right, r.right) - Math.max(g.left, r.left);
          const h = Math.min(g.bottom, bottom) - Math.max(g.top, r.top);
          if (w > 0 && h > 0 && w * h > area) { area = w * h; best = p.dataset.pile; }
        });
        return best;
      }

      function onUp(e) {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag;
        drag = null;
        if (d.ghost) {
          drag = d; const to = dropTarget(); drag = null;
          d.ghost.remove();
          sel = null;
          if (!to || !tryMove(d.pid, d.idx, to)) render();
          lastClick = null;
          return;
        }
        handleClick(d.pid, d.idx);
      }

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);

      b.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-sol]");
        if (!btn) return;
        const a = btn.dataset.sol;
        if (a === "new") deal();
        else if (a === "undo") {
          if (won || !undo.length) return;
          G = JSON.parse(undo.pop()); sel = null; G.moves++; render();
        } else if (a === "auto" && !won) autoAll();
      });

      function checkWin() {
        if (won || G.found.some((f) => f.length !== 13)) return;
        won = true; clearInterval(timer);
        const best = store.get("pos98-sol-best") || 0;
        const record = G.score > best;
        if (record) store.set("pos98-sol-best", G.score);
        const done = () => msgBox({
          title: L("Paciência", "Solitaire"), icon: "info", buttons: [L("Novo jogo", "New game"), L("Fechar", "Close")],
          text: L(`<b>Ganhou!</b><br>${G.score} pontos em ${fmtT(secs)} e ${G.moves} jogadas.`, `<b>You won!</b><br>${G.score} points in ${fmtT(secs)} and ${G.moves} moves.`, `<b>¡Has ganado!</b><br>${G.score} puntos en ${fmtT(secs)} y ${G.moves} jugadas.`) + (record ? L("<br>Nova melhor pontuação!", "<br>New high score!") : ""),
        }).then((r) => { if (r === L("Novo jogo", "New game") && wins.has("solitaire")) deal(); });
        if (reduceMotion) done(); else celebrate(done);
      }

      // Cascata final: as cartas saltam das fundações e deixam rasto
      function celebrate(done) {
        const { cw, ch } = metrics();
        const cv = document.createElement("canvas");
        cv.className = "sol-canvas";
        cv.width = felt.clientWidth; cv.height = felt.clientHeight;
        cv.style.top = felt.scrollTop + "px";
        felt.append(cv);
        const ctx = cv.getContext("2d");
        const fr = felt.getBoundingClientRect();
        const starts = [0, 1, 2, 3].map((i) => { const r = $(`[data-pile="f${i}"]`, felt).getBoundingClientRect(); return [r.left - fr.left, r.top - fr.top]; });
        const queue = [];
        for (let r = 13; r >= 1; r--) for (let s = 0; s < 4; s++) queue.push({ s: G.found[s][r - 1]?.s ?? s, r, f: s });
        let cur = null;
        const drawCard = (c, x, y) => {
          ctx.fillStyle = "#000"; ctx.fillRect(x, y, cw, ch);
          ctx.fillStyle = "#fff"; ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
          ctx.fillStyle = isRed(c) ? "#c00000" : "#000";
          ctx.font = `700 ${Math.round(cw * 0.22)}px "Pixelify Sans", monospace`;
          ctx.textBaseline = "top";
          ctx.fillText(RANKS[c.r], x + 4, y + 3);
          ctx.fillText(SUITS[c.s], x + 4, y + 3 + cw * 0.22);
          ctx.font = `${Math.round(cw * 0.46)}px serif`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(SUITS[c.s], x + cw / 2, y + ch / 2);
          ctx.textAlign = "left";
        };
        const finish = () => { stopAnim(); done(); };
        const step = () => {
          if (!cur) {
            const c = queue.shift();
            if (!c) return finish();
            G.found[c.f].pop(); render();
            const [x, y] = starts[c.f];
            cur = { c, x, y, vx: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 4), vy: -Math.random() * 6 };
          }
          cur.vy += 0.6; cur.x += cur.vx; cur.y += cur.vy;
          if (cur.y + ch > cv.height) { cur.y = cv.height - ch; cur.vy *= -0.78; }
          drawCard(cur.c, cur.x, cur.y);
          if (cur.x + cw < 0 || cur.x > cv.width) cur = null;
          anim.raf = requestAnimationFrame(step);
        };
        anim = { cv, raf: requestAnimationFrame(step), skip: () => finish() };
        cv.addEventListener("pointerdown", (e) => { e.stopPropagation(); anim?.skip(); }, { once: true });
      }
      function stopAnim() {
        if (!anim) return;
        cancelAnimationFrame(anim.raf);
        anim.cv.remove();
        anim = null;
      }

      // Tamanho das cartas acompanha a largura da janela
      const fit = () => {
        const w = felt.clientWidth;
        const gap = Math.max(4, Math.round(w * 0.014));
        const cw = clamp(Math.floor((w - gap * 8) / 7), 36, 96);
        felt.style.setProperty("--gap", gap + "px");
        felt.style.setProperty("--cw", cw + "px");
        felt.style.setProperty("--ch", Math.round(cw * 1.4) + "px");
        if (G && !anim) render();
      };
      const ro = new ResizeObserver(fit);
      ro.observe(felt);

      rec.o.onClose = () => {
        clearInterval(timer); stopAnim(); ro.disconnect();
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
      };
      fit();
      deal();
    },
  });

  /* =========================================================
     FREECELL (distribuição numerada compatível com a do Windows)
     ========================================================= */
  ICONS.freecell =
    R(1, 4, 30, 24, "#000") + R(2, 5, 28, 22, "#007f3f") +
    R(5, 8, 11, 16, "#000") + R(6, 9, 9, 14, "#fff") + R(7, 10, 2, 2, "#000") + R(9, 14, 3, 3, "#000") + R(8, 17, 5, 2, "#000") +
    R(16, 8, 11, 16, "#000") + R(17, 9, 9, 14, "#fff") + R(18, 10, 2, 2, "#c00000") + R(19, 14, 2, 2, "#c00000") + R(22, 14, 2, 2, "#c00000") + R(19, 16, 5, 2, "#c00000") + R(20, 18, 3, 2, "#c00000");

  APPS.freecell = () => openWindow({
    id: "freecell", title: "FreeCell", icon: "freecell", width: 660, height: 540,
    bodyClass: "flush sol-body fc-body",
    status: L("Jogo n.º 1", "Game #1"),
    body: `
      <div class="sol-bar">
        <button data-fc="new"><i class="fa-solid fa-shuffle"></i><span>${L("Novo jogo", "New game")}</span></button>
        <button data-fc="restart"><i class="fa-solid fa-rotate"></i><span>${L("Recomeçar", "Restart")}</span></button>
        <button data-fc="undo"><i class="fa-solid fa-rotate-left"></i><span>${L("Desfazer", "Undo")}</span></button>
      </div>
      <div class="sol-felt fc-felt" aria-label="${L("Mesa de FreeCell", "FreeCell table")}">
        <div class="sol-row sol-top">
          ${[0, 1, 2, 3].map((i) => `<div class="pile cell" data-pile="c${i}" aria-label="${L("Célula livre", "Free cell")} ${i + 1}"></div>`).join("")}
          ${[0, 1, 2, 3].map((i) => `<div class="pile found" data-pile="f${i}" aria-label="${L("Fundação", "Foundation")} ${i + 1}"></div>`).join("")}
        </div>
        <div class="sol-row sol-tab">
          ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<div class="pile col" data-pile="t${i}" aria-label="${L("Coluna", "Column")} ${i + 1}"></div>`).join("")}
        </div>
      </div>`,
    onMount(rec) {
      const b = rec.body;
      const felt = $(".fc-felt", b);
      const statusEl = $(".status-bar-field", rec.el);
      let G, undo, sel, lastClick, drag, timer, secs, started, won, anim, gameNo, stuckShown;

      const pile = (id) => (id[0] === "c" ? G.cells[+id[1]] : id[0] === "f" ? G.found[+id[1]] : G.tab[+id[1]]);
      const top = (p) => p[p.length - 1];
      const snap = () => JSON.stringify(G);
      const stats = () => store.get("pos98-fc-stats") || { won: 0, played: 0 };

      // Distribuição de Microsoft (gerador congruencial linear): o jogo n.º N é sempre o mesmo
      function msDeal(n) {
        let seed = n;
        const deck = [];
        for (let i = 0; i < 52; i++) deck.push({ r: (i >> 2) + 1, s: [3, 2, 1, 0][i & 3], up: true });
        const tab = [[], [], [], [], [], [], [], []];
        for (let left = 52; left > 0; left--) {
          seed = (seed * 214013 + 2531011) & 0x7fffffff;
          const j = (seed >> 16) % left;
          tab[(52 - left) % 8].push(deck[j]);
          deck[j] = deck[left - 1];
        }
        return tab;
      }

      function deal(n) {
        stopAnim();
        if (G && started && !won) { const s = stats(); s.played++; store.set("pos98-fc-stats", s); }
        gameNo = n ?? (1 + Math.floor(Math.random() * 32000));
        G = { cells: [[], [], [], []], found: [[], [], [], []], tab: msDeal(gameNo), moves: 0 };
        undo = []; sel = null; lastClick = null; won = false; started = false; secs = 0; stuckShown = false;
        clearInterval(timer); timer = null;
        render();
      }

      function status() {
        if (statusEl) statusEl.innerHTML = `${L("Jogo n.º", "Game #")}${L(" ", "", " ")}${gameNo} &nbsp;·&nbsp; ${L("Jogadas", "Moves")}: ${G.moves} &nbsp;·&nbsp; ${L("Tempo", "Time")}: ${fmtT(secs)}`;
      }
      function tickStart() {
        if (started) return;
        started = true;
        timer = setInterval(() => { secs++; status(); }, 1000);
      }

      const cardHTML = (c, idx, y, isSel) => {
        const rk = RANKS[c.r], st = SUITS[c.s];
        const mid = c.r > 10 ? `<span class="mid"><i>${rk}<small>${st}</small></i></span>` : `<span class="mid">${st}</span>`;
        return `<div class="card up${isRed(c) ? " red" : ""}${c.r > 10 ? " court" : ""}${isSel ? " sel" : ""}" data-idx="${idx}" style="top:${y}px" aria-label="${cardName(c)}">
          <span class="tl">${rk}<br>${st}</span>${mid}<span class="tl br">${rk}<br>${st}</span></div>`;
      };

      function metrics() {
        const cs = getComputedStyle(felt);
        return { cw: parseFloat(cs.getPropertyValue("--cw")) || 64, ch: parseFloat(cs.getPropertyValue("--ch")) || 90, gap: parseFloat(cs.getPropertyValue("--gap")) || 8 };
      }

      function render() {
        const { cw, ch, gap } = metrics();
        const isS = (pid, i) => sel && sel.pid === pid && i >= sel.idx;
        for (const pid of ["c0", "c1", "c2", "c3", "f0", "f1", "f2", "f3"]) {
          const p = pile(pid), from = Math.max(0, p.length - 2);
          $(`[data-pile="${pid}"]`, felt).innerHTML = p.slice(from).map((c, k) => cardHTML(c, from + k, 0, isS(pid, from + k))).join("");
        }
        const topRow = $(".sol-top", felt);
        const avail = felt.clientHeight - topRow.offsetHeight - gap * 3.5 - ch;
        const off = Math.max(10, cw * 0.3);
        G.tab.forEach((p, t) => {
          const need = Math.max(0, p.length - 1) * off;
          const k = need > avail && avail > 0 ? Math.max(0.3, avail / need) : 1;
          $(`[data-pile="t${t}"]`, felt).innerHTML = p.map((c, i) => cardHTML(c, i, Math.round(i * off * k), isS(`t${t}`, i))).join("");
        });
        status();
      }

      const freeCells = () => G.cells.filter((c) => !c.length).length;
      const emptyCols = () => G.tab.filter((c) => !c.length).length;
      const validSeq = (cards) => cards.every((c, i) => i === 0 || (isRed(c) !== isRed(cards[i - 1]) && c.r === cards[i - 1].r - 1));
      const maxMove = (toId) => (freeCells() + 1) * 2 ** (emptyCols() - (toId[0] === "t" && !pile(toId).length ? 1 : 0));

      function canMove(fromId, cards, toId) {
        if (fromId === toId || fromId[0] === "f") return false;
        const dest = pile(toId), c = cards[0], t = top(dest);
        if (toId[0] === "c") return cards.length === 1 && !dest.length;
        if (toId[0] === "f") return cards.length === 1 && (t ? t.s === c.s && c.r === t.r + 1 : c.r === 1);
        if (!validSeq(cards) || cards.length > maxMove(toId)) return false;
        return t ? isRed(t) !== isRed(c) && c.r === t.r - 1 : true;
      }

      // Envia para as fundações as cartas que já não fazem falta no tabuleiro
      function autoSafe() {
        let moved = true;
        const fr = (s) => G.found.find((f) => f.length && f[0].s === s)?.length || 0;
        const safe = (c) => c.r <= 2 || (isRed(c) ? Math.min(fr(0), fr(3)) : Math.min(fr(1), fr(2))) >= c.r - 1;
        while (moved) {
          moved = false;
          for (const pid of ["c0", "c1", "c2", "c3", "t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"]) {
            const p = pile(pid), c = top(p);
            if (!c || !safe(c)) continue;
            for (let i = 0; i < 4; i++) {
              if (canMove(pid, [c], "f" + i)) { p.pop(); G.found[i].push(c); moved = true; break; }
            }
          }
        }
      }

      function tryMove(fromId, idx, toId) {
        if (won) return false;
        const from = pile(fromId);
        const cards = from.slice(idx);
        if (!cards.length || !canMove(fromId, cards, toId)) return false;
        undo.push(snap()); if (undo.length > 200) undo.shift();
        from.splice(idx);
        pile(toId).push(...cards);
        G.moves++; sel = null; tickStart();
        autoSafe();
        render(); checkWin() || checkStuck();
        return true;
      }

      function smartMove(pid, idx) {
        const p = pile(pid), last = idx === p.length - 1;
        if (last) for (let i = 0; i < 4; i++) if (tryMove(pid, idx, "f" + i)) return true;
        const cols = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => `t${i}` !== pid);
        for (const i of cols) if (G.tab[i].length && tryMove(pid, idx, "t" + i)) return true;
        if (!(pid[0] === "t" && idx === 0)) for (const i of cols) if (!G.tab[i].length && tryMove(pid, idx, "t" + i)) return true;
        if (last && pid[0] === "t") for (let i = 0; i < 4; i++) if (tryMove(pid, idx, "c" + i)) return true;
        return false;
      }

      // Há alguma jogada de uma só carta possível?
      function anyMove() {
        const srcs = ["c0", "c1", "c2", "c3", "t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];
        const dsts = [...srcs, "f0", "f1", "f2", "f3"];
        for (const s of srcs) {
          const c = top(pile(s));
          if (!c) continue;
          for (const d of dsts) {
            if (d === s || (s[0] === "c" && d[0] === "c")) continue;
            if (canMove(s, [c], d)) return true;
          }
        }
        return false;
      }
      function checkStuck() {
        if (stuckShown || anyMove()) return;
        stuckShown = true;
        msgBox({
          title: "FreeCell", icon: "warn", buttons: [L("Desfazer", "Undo"), L("Novo jogo", "New game")],
          text: L("Não há mais jogadas possíveis.", "There are no more legal moves."),
        }).then((r) => {
          if (!wins.has("freecell")) return;
          if (r === L("Desfazer", "Undo")) doUndo(); else { const s = stats(); s.played++; store.set("pos98-fc-stats", s); started = false; deal(); }
        });
      }

      function doUndo() {
        if (won || !undo.length) return;
        G = JSON.parse(undo.pop()); sel = null; stuckShown = false; render();
      }

      function handleClick(pid, idx) {
        const now = Date.now();
        if (lastClick && lastClick.pid === pid && lastClick.idx === idx && now - lastClick.t < 380) {
          lastClick = null; sel = null;
          if (!smartMove(pid, idx)) render();
          return;
        }
        lastClick = { pid, idx, t: now };
        if (sel) {
          if (sel.pid === pid && sel.idx === idx) { sel = null; render(); return; }
          if (sel.pid !== pid && tryMove(sel.pid, sel.idx, pid)) return;
        }
        sel = idx >= 0 ? { pid, idx } : null;
        render();
      }

      felt.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || won) return;
        const pileEl = e.target.closest("[data-pile]");
        if (!pileEl) return;
        const pid = pileEl.dataset.pile;
        const cardEl = e.target.closest(".card.up");
        if (!cardEl || pid[0] === "f") {
          if (sel && tryMove(sel.pid, sel.idx, pid)) return;
          if (sel) { sel = null; render(); }
          return;
        }
        const idx = +cardEl.dataset.idx;
        const p = pile(pid);
        if (pid[0] === "c" && idx !== p.length - 1) return;
        if (pid[0] === "t" && !validSeq(p.slice(idx))) {
          // Não é uma sequência válida: trata como clique para servir de destino
          if (sel && tryMove(sel.pid, sel.idx, pid)) return;
          sel = null; render(); return;
        }
        const r = cardEl.getBoundingClientRect();
        drag = { pid, idx, x0: e.clientX, y0: e.clientY, dx: e.clientX - r.left, dy: e.clientY - r.top, ghost: null, id: e.pointerId };
        e.preventDefault();
      });

      function onMove(e) {
        if (!drag || e.pointerId !== drag.id) return;
        if (!drag.ghost) {
          if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 6) return;
          const srcPile = $(`[data-pile="${drag.pid}"]`, felt);
          const els = $$(".card", srcPile).filter((c) => +c.dataset.idx >= drag.idx);
          const base = parseFloat(els[0].style.top) || 0;
          const g = document.createElement("div");
          g.className = "sol-ghost";
          g.innerHTML = els.map((c) => { const n = c.cloneNode(true); n.classList.remove("sel"); n.style.top = (parseFloat(c.style.top) - base) + "px"; return n.outerHTML; }).join("");
          felt.append(g);
          els.forEach((c) => c.classList.add("lifted"));
          drag.ghost = g;
        }
        drag.ghost.style.transform = `translate(${e.clientX - drag.dx}px, ${e.clientY - drag.dy}px)`;
      }

      function dropTarget() {
        const g = drag.ghost.firstElementChild.getBoundingClientRect();
        const fr = felt.getBoundingClientRect();
        let best = null, area = 0;
        $$(".pile", felt).forEach((p) => {
          const r = p.getBoundingClientRect();
          const bottom = p.classList.contains("col") ? fr.bottom + felt.scrollHeight : r.bottom;
          const w = Math.min(g.right, r.right) - Math.max(g.left, r.left);
          const h = Math.min(g.bottom, bottom) - Math.max(g.top, r.top);
          if (w > 0 && h > 0 && w * h > area) { area = w * h; best = p.dataset.pile; }
        });
        return best;
      }

      function onUp(e) {
        if (!drag || e.pointerId !== drag.id) return;
        const d = drag;
        if (d.ghost) {
          const to = dropTarget(); drag = null;
          d.ghost.remove();
          sel = null;
          if (!to || !tryMove(d.pid, d.idx, to)) {
            render();
            if (to && to !== d.pid && pile(d.pid).length - d.idx > maxMove(to) && to[0] === "t")
              msgBox({ title: "FreeCell", icon: "info", text: L(`Só pode mover ${maxMove(to)} carta(s) de uma vez com as células e colunas livres que tem.`, `You can only move ${maxMove(to)} card(s) at once with your free cells and empty columns.`, `Solo puedes mover ${maxMove(to)} carta(s) a la vez con las celdas libres y columnas vacías que tienes.`) });
          }
          lastClick = null;
          return;
        }
        drag = null;
        handleClick(d.pid, d.idx);
      }

      document.addEventListener("pointermove", onMove);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);

      b.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-fc]");
        if (!btn) return;
        const a = btn.dataset.fc;
        if (a === "new") deal();
        else if (a === "restart") { const n = gameNo; deal(n); }
        else if (a === "undo") doUndo();
      });

      function checkWin() {
        if (won || G.found.some((f) => f.length !== 13)) return false;
        won = true; clearInterval(timer);
        const s = stats(); s.won++; s.played++; store.set("pos98-fc-stats", s);
        const done = () => msgBox({
          title: "FreeCell", icon: "info", buttons: [L("Novo jogo", "New game"), L("Fechar", "Close")],
          text: L(`<b>Ganhou o jogo n.º ${gameNo}!</b><br>${G.moves} jogadas em ${fmtT(secs)}.<br>Vitórias: ${s.won} de ${s.played}.`,
            `<b>You won game #${gameNo}!</b><br>${G.moves} moves in ${fmtT(secs)}.<br>Wins: ${s.won} of ${s.played}.`,
            `<b>¡Has ganado la partida n.º ${gameNo}!</b><br>${G.moves} jugadas en ${fmtT(secs)}.<br>Victorias: ${s.won} de ${s.played}.`),
        }).then((r) => { if (r === L("Novo jogo", "New game") && wins.has("freecell")) deal(); });
        if (reduceMotion) done(); else celebrate(done);
        return true;
      }

      function celebrate(done) {
        const { cw, ch } = metrics();
        const cv = document.createElement("canvas");
        cv.className = "sol-canvas";
        cv.width = felt.clientWidth; cv.height = felt.clientHeight;
        cv.style.top = felt.scrollTop + "px";
        felt.append(cv);
        const ctx = cv.getContext("2d");
        const fr = felt.getBoundingClientRect();
        const starts = [0, 1, 2, 3].map((i) => { const r = $(`[data-pile="f${i}"]`, felt).getBoundingClientRect(); return [r.left - fr.left, r.top - fr.top]; });
        const queue = [];
        for (let r = 13; r >= 1; r--) for (let f = 0; f < 4; f++) queue.push({ s: G.found[f][0].s, r, f });
        let cur = null;
        const drawCard = (c, x, y) => {
          ctx.fillStyle = "#000"; ctx.fillRect(x, y, cw, ch);
          ctx.fillStyle = "#fff"; ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
          ctx.fillStyle = isRed(c) ? "#c00000" : "#000";
          ctx.font = `700 ${Math.round(cw * 0.22)}px "Pixelify Sans", monospace`;
          ctx.textBaseline = "top";
          ctx.fillText(RANKS[c.r], x + 4, y + 3);
          ctx.fillText(SUITS[c.s], x + 4, y + 3 + cw * 0.22);
          ctx.font = `${Math.round(cw * 0.46)}px serif`;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(SUITS[c.s], x + cw / 2, y + ch / 2);
          ctx.textAlign = "left";
        };
        const finish = () => { stopAnim(); done(); };
        const step = () => {
          if (!cur) {
            const c = queue.shift();
            if (!c) return finish();
            G.found[c.f].pop(); render();
            const [x, y] = starts[c.f];
            cur = { c, x, y, vx: (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 4), vy: -Math.random() * 6 };
          }
          cur.vy += 0.6; cur.x += cur.vx; cur.y += cur.vy;
          if (cur.y + ch > cv.height) { cur.y = cv.height - ch; cur.vy *= -0.78; }
          drawCard(cur.c, cur.x, cur.y);
          if (cur.x + cw < 0 || cur.x > cv.width) cur = null;
          anim.raf = requestAnimationFrame(step);
        };
        anim = { cv, raf: requestAnimationFrame(step), skip: () => finish() };
        cv.addEventListener("pointerdown", (e) => { e.stopPropagation(); anim?.skip(); }, { once: true });
      }
      function stopAnim() {
        if (!anim) return;
        cancelAnimationFrame(anim.raf);
        anim.cv.remove();
        anim = null;
      }

      const fit = () => {
        const w = felt.clientWidth;
        const gap = Math.max(3, Math.round(w * 0.012));
        const cw = clamp(Math.floor((w - gap * 9) / 8), 32, 90);
        felt.style.setProperty("--gap", gap + "px");
        felt.style.setProperty("--cw", cw + "px");
        felt.style.setProperty("--ch", Math.round(cw * 1.4) + "px");
        if (G && !anim) render();
      };
      const ro = new ResizeObserver(fit);
      ro.observe(felt);

      rec.o.onClose = () => {
        if (started && !won) { const s = stats(); s.played++; store.set("pos98-fc-stats", s); }
        clearInterval(timer); stopAnim(); ro.disconnect();
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
      };
      fit();
      deal();
    },
  });

  /* =========================================================
     FUGA DA AVALANCHE — jogo de esqui original
     (desce a encosta, desvia-te de árvores e rochas, passa nas
     bandeiras e não deixes que a avalanche te apanhe)
     ========================================================= */
  ICONS.ski =
    R(0, 0, 32, 32, "#bcd6ff") + R(0, 4, 32, 8, "#dde6f3") + R(0, 3, 6, 2, "#a9bcd8") + R(6, 2, 8, 2, "#a9bcd8") + R(14, 3, 10, 2, "#a9bcd8") + R(24, 2, 8, 2, "#a9bcd8") +
    R(0, 12, 32, 20, "#f4f8ff") + R(2, 22, 5, 2, "#d6e0ee") + R(7, 25, 6, 2, "#d6e0ee") +
    R(23, 17, 6, 2, "#2a7d39") + R(22, 19, 8, 3, "#2a7d39") + R(21, 22, 10, 3, "#1b5a27") + R(25, 25, 2, 3, "#6b3d1f") +
    R(14, 14, 4, 3, "#1f55c9") + R(14, 17, 4, 2, "#f2c79a") + R(13, 19, 6, 5, "#f07a12") + R(14, 24, 2, 3, "#1f55c9") + R(17, 24, 2, 3, "#1f55c9") +
    R(10, 27, 12, 2, "#d41f1f");

  APPS.ski = () => openWindow({
    id: "ski", title: L("Ski Rush", "Ski Rush", "Ski Rush"), icon: "ski", width: 480, height: 440,
    bodyClass: "flush ski-body",
    status: L("Setas ou A/D para virar · ↓ acelera · ↑ trava · P pausa", "Arrows or A/D to steer · ↓ speed up · ↑ brake · P pause"),
    body: `
      <canvas class="ski-cv" aria-label="${L("Encosta de esqui", "Ski slope")}"></canvas>
      <div class="ski-hud" aria-live="off">
        <span class="ski-dist">0 m</span>
        <span class="ski-danger" title="${L("Avalanche", "Avalanche")}"><i></i></span>
      </div>
      <div class="ski-over">
        <div class="ski-card">
          <h2></h2>
          <p></p>
          <button class="b98 primary" data-ski="go"></button>
        </div>
      </div>`,
    onMount(rec) {
      const b = rec.body;
      const cv = $(".ski-cv", b), ctx = cv.getContext("2d");
      const distEl = $(".ski-dist", b), dangerEl = $(".ski-danger > i", b);
      const over = $(".ski-over", b), overH = $("h2", over), overP = $("p", over), overBtn = $("button", over);
      const ANG = [-70, -35, 0, 35, 70].map((a) => (a * Math.PI) / 180);
      let W = 240, H = 200, state = "ready", raf = 0, last = 0;
      let S; // estado do jogo
      const keys = { left: false, right: false, down: false, up: false };
      let pointer = null;

      function reset() {
        S = { px: 0, py: 0, d: 0, v: 0, m: 0, bonus: 0, stun: 0, avY: -0.45 * H, objs: [], spawnY: 0, trail: [], pops: [], danger: 0, steerT: 0 };
        for (let y = 40; y < H * 1.2; y += 10) spawnRow(y, true);
        S.spawnY = H * 1.2;
      }

      function spawnRow(y, initial) {
        const p = 0.22 + 0.28 * Math.min(1, S.m / 3000);
        if (Math.random() > p) return;
        const x = S.px + (Math.random() * 2 - 1) * 1.1 * W;
        if (initial && Math.abs(x) < 14 && y < 80) return;
        const r = Math.random();
        const type = r < 0.5 ? "tree" : r < 0.65 ? "rock" : r < 0.9 ? "bump" : "gate";
        S.objs.push({ type, x, y, hit: false, size: type === "tree" ? 0.8 + Math.random() * 0.5 : 1 });
      }

      function show(kind) {
        state = kind;
        const best = store.get("pos98-ski-best") || 0;
        if (kind === "play") { over.hidden = true; return; }
        over.hidden = false;
        if (kind === "ready") {
          overH.textContent = L("Ski Rush", "Ski Rush", "Ski Rush");
          overP.innerHTML = L("Desce a montanha antes que a avalanche te apanhe.<br>Bandeiras dão +10 m. Árvores e rochas fazem-te cair.", "Ski down before the avalanche catches you.<br>Flags give +10 m. Trees and rocks knock you over.") +
            (best ? `<br><b>${L("Recorde", "Best")}: ${best} m</b>` : "");
          overBtn.textContent = L("Começar", "Start");
        } else if (kind === "pause") {
          overH.textContent = L("Pausa", "Paused");
          overP.textContent = L("Prima Espaço ou clique para continuar.", "Press Space or click to resume.");
          overBtn.textContent = L("Continuar", "Resume", "Continuar");
        } else if (kind === "over") {
          const m = Math.floor(S.m);
          const rec = m > best;
          if (rec) store.set("pos98-ski-best", m);
          overH.textContent = L("A avalanche apanhou-te!", "The avalanche got you!");
          overP.innerHTML = L(`Percorreste <b>${m} m</b>.`, `You made it <b>${m} m</b>.`, `Recorriste <b>${m} m</b>.`) +
            (rec ? `<br>${L("Novo recorde!", "New record!")}` : `<br>${L("Recorde", "Best")}: ${best} m`);
          overBtn.textContent = L("Tentar outra vez", "Try again");
        }
        setTimeout(() => overBtn.focus({ preventScroll: true }), 0);
      }

      function go() {
        if (state === "over" || state === "ready") { reset(); }
        show("play");
        last = performance.now();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
      function pause() {
        if (state !== "play") return;
        cancelAnimationFrame(raf);
        show("pause");
        draw();
      }

      function update(dt) {
        // Direção (teclado com pequena repetição; rato/toque direto)
        if (pointer) {
          S.d = clamp(Math.round(pointer.dx / (cv.clientWidth * 0.18)), -2, 2);
        } else {
          S.steerT -= dt;
          if ((keys.left || keys.right) && S.steerT <= 0) {
            S.d = clamp(S.d + (keys.left ? -1 : 1), -2, 2);
            S.steerT = 0.14;
          }
          if (!keys.left && !keys.right) S.steerT = 0;
        }
        const tuck = keys.down || (pointer && pointer.held > 0.25);
        if (pointer) pointer.held += dt;
        const brake = keys.up;

        if (S.stun > 0) {
          S.stun -= dt;
          S.v *= Math.max(0, 1 - dt * 4);
        } else {
          let t = 75 + Math.min(45, S.m / 40);
          t *= Math.cos(ANG[S.d + 2]) * 0.75 + 0.25;
          if (tuck) t *= 1.4;
          if (brake) t *= 0.45;
          S.v += (t - S.v) * Math.min(1, dt * 2.5);
        }
        const a = ANG[S.d + 2];
        const dx = Math.sin(a) * S.v * dt, dy = Math.cos(a) * S.v * dt;
        S.px += dx; S.py += dy;
        S.m = S.py / 4 + S.bonus;

        // Rasto dos esquis
        if (dy > 0 || dx !== 0) {
          S.trail.push([S.px, S.py]);
          if (S.trail.length > 160) S.trail.shift();
        }

        // Novos obstáculos lá em baixo
        while (S.spawnY < S.py + H * 0.8) { spawnRow(S.spawnY); S.spawnY += 10; }
        S.objs = S.objs.filter((o) => o.y > S.py - H * 0.8);

        // Colisões
        if (S.stun <= 0) for (const o of S.objs) {
          if (o.hit) continue;
          const ox = o.x - S.px, oy = o.y - S.py;
          if (o.type === "tree" && Math.abs(ox) < 5 && oy > -3 && oy < 2) { o.hit = true; S.stun = 1; S.v = 0; }
          else if (o.type === "rock" && Math.abs(ox) < 5 && Math.abs(oy) < 3) { o.hit = true; S.stun = 1; S.v = 0; }
          else if (o.type === "bump" && Math.abs(ox) < 7 && Math.abs(oy) < 3) { o.hit = true; S.v *= 0.6; }
          else if (o.type === "gate" && Math.abs(ox) < 11 && Math.abs(oy) < 3) {
            o.hit = true; S.bonus += 10;
            S.pops.push({ x: o.x, y: o.y, t: 0.9 });
          }
        }
        S.pops.forEach((p) => (p.t -= dt));
        S.pops = S.pops.filter((p) => p.t > 0);

        // Avalanche: acelera com a distância, nunca fica demasiado longe
        S.avY += (70 + 75 * (1 - Math.exp(-S.m / 1500))) * dt;
        S.avY = Math.max(S.avY, S.py - 0.75 * H);
        S.danger = clamp(1 - (S.py - S.avY) / (0.75 * H), 0, 1);
        if (S.avY >= S.py - 4) {
          cancelAnimationFrame(raf);
          draw();
          show("over");
          return false;
        }
        return true;
      }

      const sx = (x) => Math.round(W / 2 + x - S.px);
      const sy = (y) => Math.round(0.4 * H + y - S.py);
      const box = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); };

      function drawTree(x, y, k) {
        const h = Math.round(16 * k), w = Math.round(12 * k);
        box(x - 1, y - 2, 2, 3, "#6b3d1f");
        for (let i = 0; i < 3; i++) {
          const ww = Math.round(w * (1 - i * 0.25)), yy = y - 2 - Math.round((h / 3) * (i + 1));
          box(x - (ww >> 1), yy, ww, Math.round(h / 3) + 1, i % 2 ? "#2a7d39" : "#1b5a27");
        }
        box(x - 1, y - 2 - h - 2, 2, 2, "#2a7d39");
      }
      function drawRock(x, y) {
        box(x - 4, y - 3, 8, 4, "#7d7f86"); box(x - 3, y - 4, 6, 1, "#9a9ca3"); box(x - 3, y - 3, 3, 1, "#b8bac0"); box(x - 4, y, 8, 1, "#55575d");
      }
      function drawBump(x, y) {
        box(x - 6, y - 1, 12, 2, "#e3ebf7"); box(x - 4, y - 2, 8, 1, "#ffffff"); box(x - 5, y + 1, 10, 1, "#c4d1e4");
      }
      function drawGate(x, y, hit) {
        const c = hit ? "#9aa7bb" : "#1f55c9";
        box(x - 11, y - 9, 1, 10, "#333"); box(x + 10, y - 9, 1, 10, "#333");
        box(x - 10, y - 9, 5, 3, c); box(x + 5, y - 9, 5, 3, c);
      }
      function drawSkier(x, y) {
        const d = S.d, fallen = S.stun > 0;
        if (fallen) {
          box(x - 6, y - 1, 12, 2, "#d41f1f");
          box(x - 4, y - 4, 7, 3, "#f07a12"); box(x + 3, y - 4, 3, 3, "#1f55c9");
          box(x - 7, y - 5, 2, 2, "#cfd8e6"); box(x + 6, y - 6, 2, 2, "#cfd8e6");
          return;
        }
        // Esquis conforme a direção
        const sk = [[-1, 6], [-1, 4], [0, 0], [1, 4], [1, 6]][d + 2];
        if (sk[0] === 0) { box(x - 3, y - 3, 1, 8, "#d41f1f"); box(x + 2, y - 3, 1, 8, "#d41f1f"); }
        else {
          for (let i = -3; i <= 3; i++) {
            const yy = y + 2 + Math.round((i * sk[0] * sk[1]) / 7);
            box(x + i, yy - 2, 1, 1, "#d41f1f"); box(x + i, yy + 1, 1, 1, "#d41f1f");
          }
        }
        box(x - 2, y - 2, 2, 3, "#1f55c9"); box(x + 1, y - 2, 2, 3, "#1f55c9"); // pernas
        box(x - 3, y - 7, 7, 5, "#f07a12"); // casaco
        box(x - 4, y - 6, 1, 3, "#f07a12"); box(x + 4, y - 6, 1, 3, "#f07a12");
        box(x - 2, y - 9, 5, 2, "#f2c79a"); // cara
        box(x - 2, y - 11, 5, 2, "#1f55c9"); // capacete
        box(x - 5, y - 4, 1, 6, "#444"); box(x + 5, y - 4, 1, 6, "#444"); // bastões
      }

      function draw() {
        if (!S) return;
        const shake = state === "play" && S.danger > 0.7 && !reduceMotion ? (S.danger - 0.7) * 6 : 0;
        ctx.save();
        if (shake) ctx.translate(Math.round((Math.random() - 0.5) * shake), Math.round((Math.random() - 0.5) * shake));
        box(-4, -4, W + 8, H + 8, "#f4f8ff");
        // Textura da neve
        const off = Math.floor(S.py) % 24;
        for (let y = -off; y < H; y += 24) for (let x = ((Math.floor(S.px) % 37) + 37) % 37; x < W + 37; x += 37) box(W - x, y + ((x * 7) % 24), 2, 1, "#e6edf8");
        // Rasto
        ctx.fillStyle = "#d6e0ee";
        for (const [tx, ty] of S.trail) { const X = sx(tx), Y = sy(ty); ctx.fillRect(X - 3, Y + 2, 1, 1); ctx.fillRect(X + 2, Y + 2, 1, 1); }
        // Objetos ordenados por profundidade, com o esquiador no meio
        const list = S.objs.map((o) => ({ y: o.y, f: () => {
          const X = sx(o.x), Y = sy(o.y);
          if (X < -20 || X > W + 20 || Y < -30 || Y > H + 30) return;
          if (o.type === "tree") drawTree(X, Y, o.size);
          else if (o.type === "rock") drawRock(X, Y);
          else if (o.type === "bump") drawBump(X, Y);
          else drawGate(X, Y, o.hit);
        } }));
        list.push({ y: S.py, f: () => drawSkier(sx(S.px), sy(S.py)) });
        list.sort((a, c) => a.y - c.y).forEach((o) => o.f());
        // +10 das bandeiras
        ctx.font = "8px VT323, monospace";
        ctx.textAlign = "center";
        for (const p of S.pops) { ctx.fillStyle = `rgba(31,85,201,${Math.min(1, p.t * 2)})`; ctx.fillText("+10", sx(p.x), sy(p.y) - 12 - (0.9 - p.t) * 14); }
        // Avalanche
        const ay = sy(S.avY);
        if (ay > -10) {
          const t = performance.now() / 160;
          ctx.fillStyle = "#dde6f3";
          ctx.fillRect(0, -4, W, Math.max(0, ay + 4));
          for (let x = 0; x < W; x += 4) {
            const h = Math.round(3 + 3 * Math.sin(x * 0.21 + t) + 2 * Math.sin(x * 0.07 - t * 0.6));
            box(x, ay, 4, h, "#dde6f3");
            box(x, ay + h, 4, 1, "#a9bcd8");
          }
          for (let i = 0; i < 14; i++) {
            const x = (i * 53 + Math.floor(t * 9)) % W, y = ay - 6 - ((i * 17) % 30);
            box(x, y, 3, 2, "#c8d5ea");
          }
        }
        ctx.restore();
        distEl.textContent = `${Math.floor(S.m)} m`;
        dangerEl.style.width = Math.round(S.danger * 100) + "%";
      }

      function loop(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (state !== "play") return;
        if (document.hidden || !rec.el.classList.contains("active") || rec.el.classList.contains("minimized")) { pause(); return; }
        if (update(dt)) { draw(); raf = requestAnimationFrame(loop); }
      }

      // Teclado: só quando esta janela está em foco
      const KEYMAP = { ArrowLeft: "left", a: "left", A: "left", ArrowRight: "right", d: "right", D: "right", ArrowDown: "down", s: "down", S: "down", ArrowUp: "up", w: "up", W: "up" };
      function onKey(e) {
        if (!rec.el.classList.contains("active") || e.target.closest?.("input,textarea")) return;
        const k = KEYMAP[e.key];
        const down = e.type === "keydown";
        if (k) {
          if (down && !keys[k] && state === "play" && (k === "left" || k === "right")) {
            S.d = clamp(S.d + (k === "left" ? -1 : 1), -2, 2); S.steerT = 0.25;
          }
          keys[k] = down; e.preventDefault(); return;
        }
        if (!down) return;
        if ((e.key === " " || e.key === "Enter") && state !== "play") { e.preventDefault(); go(); }
        else if ((e.key === "p" || e.key === "P" || e.key === "Escape") && state === "play") { e.preventDefault(); pause(); }
      }
      document.addEventListener("keydown", onKey);
      document.addEventListener("keyup", onKey);

      // Rato / toque: a posição horizontal em relação ao esquiador escolhe a direção
      cv.addEventListener("pointerdown", (e) => {
        if (state !== "play") { go(); return; }
        const r = cv.getBoundingClientRect();
        pointer = { id: e.pointerId, dx: e.clientX - (r.left + r.width / 2), held: 0 };
        cv.setPointerCapture?.(e.pointerId);
        e.preventDefault();
      });
      cv.addEventListener("pointermove", (e) => {
        if (!pointer || e.pointerId !== pointer.id) return;
        const r = cv.getBoundingClientRect();
        pointer.dx = e.clientX - (r.left + r.width / 2);
      });
      const endPointer = (e) => { if (pointer && e.pointerId === pointer.id) pointer = null; };
      cv.addEventListener("pointerup", endPointer);
      cv.addEventListener("pointercancel", endPointer);
      overBtn.addEventListener("click", go);

      const onVis = () => { if (document.hidden) pause(); };
      document.addEventListener("visibilitychange", onVis);

      // Canvas a meia resolução, ampliado com píxeis nítidos
      const fit = () => {
        const w = Math.max(160, Math.round(cv.clientWidth / 2)), h = Math.max(120, Math.round(cv.clientHeight / 2));
        if (w === W && h === H && cv.width === W) return;
        W = w; H = h; cv.width = W; cv.height = H;
        ctx.imageSmoothingEnabled = false;
        draw();
      };
      const ro = new ResizeObserver(fit);
      ro.observe(cv);

      rec.o.onClose = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("keyup", onKey);
        document.removeEventListener("visibilitychange", onVis);
      };
      fit();
      reset();
      draw();
      show("ready");
    },
  });

})();
