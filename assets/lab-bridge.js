"use strict";
/* Labs 8 & 9 uchun ko'prik: menyu, 12-lab ro'yxati, progress va random effektli Instagram niki */
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
  const IG_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>`;
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
        .kk-ig{position:relative;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;color:#f4faf9;text-decoration:none;white-space:nowrap;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.24);font-family:ui-monospace,Consolas,monospace;letter-spacing:.02em;overflow:hidden;transition:transform .22s ease,box-shadow .22s ease,background .22s ease,letter-spacing .22s ease}
        .kk-ig svg{width:14px;height:14px;flex:none;transition:transform .35s ease}
        .kk-ig:hover{transform:translateY(-2px);color:#fff}
        .kk-ig.ig-fx-0{background:linear-gradient(120deg,rgba(255,255,255,.12),rgba(242,165,65,.32),rgba(255,255,255,.12));background-size:220% 100%;border-color:rgba(242,165,65,.65);animation:kkShim 3.2s linear infinite}
        @keyframes kkShim{0%{background-position:200% 0}100%{background-position:-20% 0}}
        .kk-ig.ig-fx-1{background:linear-gradient(135deg,#f09433,#e6683c 28%,#dc2743 58%,#bc1888);border-color:rgba(255,255,255,.35);box-shadow:0 3px 12px rgba(220,39,67,.35);color:#fff}
        .kk-ig.ig-fx-2{background:rgba(15,46,51,.92);border-color:#46e0a8;color:#8fffd2;box-shadow:0 0 10px rgba(70,224,168,.25)}
        .kk-ig.ig-fx-2::after{content:"_";margin-left:1px;animation:kkBlk 1s steps(2,start) infinite}
        @keyframes kkBlk{0%,49%{opacity:1}50%,100%{opacity:0}}
        .kk-ig.ig-fx-3{background:rgba(34,195,214,.2);border-color:rgba(95,240,255,.55);color:#b6f9ff;animation:kkFlt 2.8s ease-in-out infinite}
        @keyframes kkFlt{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        .kk-ig.ig-fx-4{background:rgba(255,255,255,.13);border-color:rgba(255,214,112,.68);color:#ffe9ad;animation:kkPls 2.4s ease-in-out infinite}
        .kk-ig.ig-fx-4::before{content:"✦";font-size:10px;color:#ffd166;animation:kkSpn 4s linear infinite}
        @keyframes kkPls{0%,100%{box-shadow:0 0 0 0 rgba(255,209,102,.45)}50%{box-shadow:0 0 0 6px rgba(255,209,102,0)}}
        @keyframes kkSpn{to{transform:rotate(360deg)}}
        .kk-ig.ig-fx-5{background:rgba(255,255,255,.12);border-color:rgba(255,138,101,.65);color:#ffd9cc}
        .kk-ig.ig-fx-5::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.38),transparent);transform:translateX(-120%);animation:kkSwp 2.6s ease-in-out infinite}
        @keyframes kkSwp{0%{transform:translateX(-120%)}55%,100%{transform:translateX(130%)}}
        .kk-ig.ig-fx-6{background:linear-gradient(90deg,#1b484f,#2c6d75,#1b484f);background-size:200% 100%;border-color:#7ee8d2;color:#e8fffb;animation:kkWav 3.5s ease infinite}
        .kk-ig.ig-fx-6:hover svg{transform:rotate(360deg) scale(1.15)}
        @keyframes kkWav{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .kk-ig.ig-fx-7{background:rgba(255,111,165,.22);border-color:rgba(255,148,194,.68);color:#ffe0ee;animation:kkBrt 2.6s ease-in-out infinite}
        @keyframes kkBrt{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}
        @media (max-width:900px){footer{position:sticky;bottom:0;z-index:30}}
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
      if (footer) {
        let a = footer.querySelector(".kk-ig");
        if (!a) {
          a = document.createElement("a");
          a.className = "kk-ig";
          a.href = "https://instagram.com/hayitali1612";
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.title = "Instagram: @hayitali1612";
          footer.appendChild(a);
        }
        a.innerHTML = `${IG_SVG}<span>@hayitali1612</span>`;
        const prev = Number(sessionStorage.getItem("kk_last_ig_fx"));
        const pool = [0, 1, 2, 3, 4, 5, 6, 7].filter(i => i !== prev);
        const fx = pool[Math.floor(Math.random() * pool.length)];
        try { sessionStorage.setItem("kk_last_ig_fx", String(fx)); } catch {}
        a.classList.add("ig-fx-" + fx);
      }
    }
  };
})();
