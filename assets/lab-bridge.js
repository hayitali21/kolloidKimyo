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
        .kk-ig{position:relative;display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:800;color:#fff;text-decoration:none;white-space:nowrap;padding:6px 14px;border-radius:999px;background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#bc1888);border:1.5px solid rgba(255,255,255,.38);font-family:ui-monospace,Consolas,monospace;letter-spacing:.03em;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.28);transition:transform .22s ease,box-shadow .22s ease,letter-spacing .22s ease}
        .kk-ig svg{width:15px;height:15px;flex:none;transition:transform .4s ease}
        .kk-ig:hover{transform:translateY(-2px) scale(1.04);color:#fff}
        .kk-ig:hover svg{transform:rotate(-12deg) scale(1.15)}
        .kk-ig.ig-fx-0{background:linear-gradient(120deg,#b86b15,#f5b942,#fff1b8,#e69322,#b86b15);background-size:260% 100%;border-color:#ffe399;color:#1c1002;box-shadow:0 0 18px rgba(245,185,66,.45);animation:kkShim 2.8s linear infinite}
        @keyframes kkShim{0%{background-position:200% 0}100%{background-position:-60% 0}}
        .kk-ig.ig-fx-1{background:linear-gradient(135deg,#f09433,#e6683c 25%,#dc2743 55%,#cc2366 78%,#bc1888);background-size:200% 200%;border-color:rgba(255,255,255,.55);box-shadow:0 4px 18px rgba(220,39,67,.55);color:#fff;animation:kkIns 3.5s ease infinite}
        @keyframes kkIns{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .kk-ig.ig-fx-2{background:linear-gradient(135deg,#062823,#0f5c4e);border-color:#46f5b5;color:#7dffd0;box-shadow:0 0 16px rgba(70,245,181,.45)}
        .kk-ig.ig-fx-2::after{content:"_";margin-left:1px;color:#46f5b5;animation:kkBlk .9s steps(2,start) infinite}
        @keyframes kkBlk{0%,49%{opacity:1}50%,100%{opacity:0}}
        .kk-ig.ig-fx-3{background:linear-gradient(135deg,#094d66,#14a3b8);border-color:#7ff4ff;color:#fff;box-shadow:0 5px 18px rgba(20,163,184,.5);animation:kkFlt 2.4s ease-in-out infinite}
        @keyframes kkFlt{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .kk-ig.ig-fx-4{background:linear-gradient(135deg,#2b1d07,#6e480e);border-color:#ffd166;color:#ffeaad;animation:kkPls 2.1s ease-in-out infinite}
        .kk-ig.ig-fx-4::before{content:"✦";font-size:12px;color:#ffd166;animation:kkSpn 3s linear infinite}
        @keyframes kkPls{0%,100%{box-shadow:0 0 0 0 rgba(255,209,102,.65)}50%{box-shadow:0 0 0 8px rgba(255,209,102,0)}}
        @keyframes kkSpn{to{transform:rotate(360deg)}}
        .kk-ig.ig-fx-5{background:linear-gradient(135deg,#c94b28,#f28d35);border-color:#ffd6b0;color:#fff;box-shadow:0 4px 16px rgba(242,141,53,.45)}
        .kk-ig.ig-fx-5::before{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 25%,rgba(255,255,255,.65) 50%,transparent 75%);transform:translateX(-130%);animation:kkSwp 2.2s ease-in-out infinite}
        @keyframes kkSwp{0%{transform:translateX(-130%)}60%,100%{transform:translateX(140%)}}
        .kk-ig.ig-fx-6{background:linear-gradient(90deg,#0d6e6e,#1cc7a5,#2b86c5,#0d6e6e);background-size:260% 100%;border-color:#a8fff0;color:#fff;box-shadow:0 4px 16px rgba(28,199,165,.45);animation:kkWav 3.2s linear infinite}
        .kk-ig.ig-fx-6:hover svg{transform:rotate(360deg) scale(1.2)}
        .kk-ig.ig-fx-6:hover{letter-spacing:.07em}
        @keyframes kkWav{0%{background-position:0% 50%}100%{background-position:260% 50%}}
        .kk-ig.ig-fx-7{background:linear-gradient(135deg,#b82964,#ff5e96);border-color:#ffc2da;color:#fff;box-shadow:0 4px 18px rgba(255,94,150,.5);animation:kkBrt 2.2s ease-in-out infinite}
        @keyframes kkBrt{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        .kk-stage-tog{display:none;position:absolute;right:8px;bottom:8px;z-index:10;padding:5px 10px;font-size:11.5px;font-weight:700;border-radius:999px;background:rgba(15,46,51,.86);color:#edf5f4;border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(6px);cursor:pointer}
        @media (max-width:900px){
          header{padding:8px 10px!important;gap:6px 8px!important}
          header .logo{display:none}
          header .brand{flex:1 1 100px;min-width:0;font-size:13.5px!important;overflow:hidden;text-overflow:ellipsis}
          header .brand small{display:none!important}
          .scorechip{margin-left:auto;padding:4px 9px!important;font-size:11.5px!important}
          .tabs{order:10;width:100%;margin-left:0!important;-webkit-overflow-scrolling:touch}
          .tabs button{font-size:12px!important;padding:6px 10px!important}
          #stageWrap{position:sticky!important;top:0;z-index:15;height:clamp(210px,36vh,290px)!important;min-height:210px!important;box-shadow:0 6px 18px rgba(8,22,25,.22);transition:height .22s ease}
          #stageWrap.collapsed{height:44px!important;min-height:44px!important}
          #stageWrap.collapsed #scene{opacity:.18;pointer-events:none}
          .kk-stage-tog{display:inline-flex;align-items:center;gap:4px}
          aside{padding:14px 13px 26px!important;overflow:visible!important}
          .grid4,.grid3{grid-template-columns:repeat(2,1fr)!important}
          table.j{display:block;overflow-x:auto;white-space:nowrap;-webkit-overflow-scrolling:touch}
          #toasts{left:10px!important;right:10px!important;top:10px!important;bottom:auto!important;width:auto!important;transform:none!important}
          #modal{padding:10px!important}
          #modal .card,#modal .mc{padding:18px 16px!important;max-height:90dvh!important}
          footer{position:sticky;bottom:0;z-index:30;border-top:1px solid rgba(255,255,255,.14);flex-wrap:wrap!important;justify-content:space-between;gap:5px!important;padding:6px 8px calc(6px + env(safe-area-inset-bottom,0px))!important;overflow-x:visible!important;box-shadow:0 -4px 16px rgba(0,0,0,.28)}
          footer .sp,footer .lbl,footer #btnFull{display:none!important}
          footer button{padding:5px 8px!important;font-size:11.5px!important;min-height:32px}
          footer .kk-ig{position:static;margin-left:auto;padding:5px 10px!important;font-size:11.5px!important}
        }
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
      const sw = document.getElementById("stageWrap");
      if (sw && !sw.querySelector(".kk-stage-tog")) {
        const tb = document.createElement("button");
        tb.type = "button";
        tb.className = "kk-stage-tog";
        tb.textContent = "⬆ Sahnani yigʻish";
        tb.addEventListener("click", () => {
          const c = sw.classList.toggle("collapsed");
          tb.textContent = c ? "⬇ Sahnani ochish" : "⬆ Sahnani yigʻish";
        });
        sw.appendChild(tb);
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
