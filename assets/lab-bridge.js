"use strict";
/* Labs 8 & 9 uchun yengil ko'prik: menyu, 12-lab ro'yxati, progress va Instagram havola */
(function () {
  const CATALOG = [
    { id: 1,  file: "01-kondensatsion.html",  short: "Kondensatsion usul" },
    { id: 2,  file: "02-disperslash.html",    short: "Disperslash va peptizatsiya" },
    { id: 3,  file: "03-tozalash.html",       short: "Dializ va ultrafiltratsiya" },
    { id: 4,  file: "04-elektroforez.html",   short: "Elektroforez va zaryad" },
    { id: 5,  file: "05-koagullanish.html",   short: "Degidratlash va IEN" },
    { id: 6,  file: "06-gidrofil.html",       short: "Gidrofil zollar (albumin)" },
    { id: 7,  file: "07-gidrofob.html",       short: "Gidrofob zollar va Shultse–Gardi" },
    { id: 8,  file: "08-sedimentatsiya.html", short: "Sedimentatsion analiz" },
    { id: 9,  file: "09-qovushqoqlik.html",   short: "Qovushqoqlik (Ostvald)" },
    { id: 10, file: "10-adsorbsiya.html",     short: "Adsorbsiya (Freyndlix)" },
    { id: 11, file: "11-langmyur.html",       short: "Langmyur va sirt yuzasi" },
    { id: 12, file: "12-emulsiya-kopik.html", short: "Emulsiyalar va koʻpiklar" }
  ];
  const KEY = "kolloidKimyo_progress_v1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
  }
  window.KKBridge = {
    save(labId, score, done) {
      try {
        const d = load(), p = d[labId] || { score: 0, done: false };
        d[labId] = { score: Math.max(p.score || 0, Math.round(score || 0)), done: Boolean(p.done || done), updated: Date.now() };
        localStorage.setItem(KEY, JSON.stringify(d));
      } catch {}
    },
    mount(labId) {
      const style = document.createElement("style");
      style.textContent = `
        .kk-nav{display:inline-flex;align-items:center;gap:6px;flex:none}
        .kk-home,.kk-sw-btn{display:inline-flex;align-items:center;gap:5px;text-decoration:none;color:#e6f1ef;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.16);padding:5px 10px;border-radius:9px;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer;line-height:1.2}
        .kk-home:hover,.kk-sw-btn:hover{background:rgba(255,255,255,.2)!important;color:#fff}
        .kk-sw{position:relative}
        .kk-menu{position:absolute;top:calc(100% + 8px);left:0;width:min(340px,88vw);max-height:70vh;overflow-y:auto;background:#fff;color:#14292c;border:1px solid #d6e3e1;border-radius:13px;box-shadow:0 18px 46px rgba(0,0,0,.35);padding:6px;display:none;z-index:99}
        .kk-menu.open{display:block}
        .kk-menu a{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:8px;text-decoration:none;color:#14292c;font-size:12.5px}
        .kk-menu a:hover{background:#eff5f4}
        .kk-menu a.cur{background:#e3f0ee;font-weight:700}
        .kk-menu .n{width:22px;height:22px;border-radius:6px;background:#0f2e33;color:#fff;font-family:monospace;font-size:11px;font-weight:700;display:grid;place-items:center;flex:none}
        .kk-menu a.cur .n{background:#f2a541;color:#1d1405}
        .kk-menu .ok{margin-left:auto;font-size:11px;font-family:monospace;color:#1f9d6b;font-weight:700}
        .kk-ig{font-size:11px;color:rgba(255,255,255,.35);text-decoration:none;white-space:nowrap;padding:2px 6px;font-family:monospace;transition:color .2s}
        .kk-ig:hover{color:rgba(255,255,255,.78)}
      `;
      document.head.appendChild(style);
      const header = document.querySelector("header");
      if (header) {
        const nav = document.createElement("div");
        nav.className = "kk-nav";
        const prog = load();
        nav.innerHTML = `
          <a class="kk-home" href="../index.html" title="Asosiy sahifaga qaytish">← Menyu</a>
          <div class="kk-sw">
            <button type="button" class="kk-sw-btn" id="kkSwBtn">📚 12 lab ▾</button>
            <div class="kk-menu" id="kkSwMenu">${CATALOG.map(l => {
              const p = prog[l.id];
              return `<a href="${l.file}" class="${l.id === labId ? "cur" : ""}"><span class="n">${String(l.id).padStart(2, "0")}</span><span>${l.short}</span>${p && p.done ? `<span class="ok">✓ ${p.score}</span>` : ""}</a>`;
            }).join("")}</div>
          </div>`;
        header.insertBefore(nav, header.firstChild);
        const btn = document.getElementById("kkSwBtn"), menu = document.getElementById("kkSwMenu");
        btn.addEventListener("click", e => { e.stopPropagation(); menu.classList.toggle("open"); });
        document.addEventListener("click", () => menu.classList.remove("open"));
      }
      const footer = document.querySelector("footer");
      if (footer && !footer.querySelector(".kk-ig")) {
        const a = document.createElement("a");
        a.className = "kk-ig";
        a.href = "https://instagram.com/hayitali1612";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "hayitali1612";
        a.title = "Instagram: @hayitali1612";
        footer.appendChild(a);
      }
    }
  };
})();
