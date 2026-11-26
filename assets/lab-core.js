"use strict";
/* Kolloid Kimyo Virtual Laboratoriyasi — Umumiy yadro (SFX, Progress, Nav, Charts, Quiz) */

const LAB_CATALOG = [
  { id: 1,  file: "01-kondensatsion.html",  short: "Kondensatsion usul",           title: "Kolloid eritmalarning kondensatsion usulda olinishi", group: "Olinish va tozalash" },
  { id: 2,  file: "02-disperslash.html",    short: "Disperslash va peptizatsiya",  title: "Kolloid sistemalarni disperslash usulida olinishi",   group: "Olinish va tozalash" },
  { id: 3,  file: "03-tozalash.html",       short: "Dializ va ultrafiltratsiya",   title: "Kolloid sistemalarni tozalash usullari",              group: "Olinish va tozalash" },
  { id: 4,  file: "04-elektroforez.html",   short: "Elektroforez va zaryad",       title: "Dispers sistemalarning elektr xossalari. Elektroforez", group: "Elektr va koagullanish" },
  { id: 5,  file: "05-koagullanish.html",   short: "Degidratlash va IEN",          title: "Kolloid eritmalarning koagullanishi (izoelektrik nuqta)", group: "Elektr va koagullanish" },
  { id: 6,  file: "06-gidrofil.html",       short: "Gidrofil zollar (albumin)",    title: "Gidrofil zollarning qaytar va qaytmas koagullanishi", group: "Elektr va koagullanish" },
  { id: 7,  file: "07-gidrofob.html",       short: "Gidrofob zollar va Shultse–Gardi", title: "Gidrofob zollarning va ikki kolloidning oʻzaro koagullanishi", group: "Elektr va koagullanish" },
  { id: 8,  file: "08-sedimentatsiya.html", short: "Sedimentatsion analiz",        title: "Sedimentatsion analiz. Zarrachaning choʻkish tezligi va oʻlchami", group: "Analiz va struktura" },
  { id: 9,  file: "09-qovushqoqlik.html",   short: "Qovushqoqlik (Ostvald)",       title: "Kolloid sistemalarda strukturalar. Viskozimetriya",   group: "Analiz va struktura" },
  { id: 10, file: "10-adsorbsiya.html",     short: "Adsorbsiya (Freyndlix)",       title: "Dispers sistemalarning sirt hodisalari. Adsorbsiya",  group: "Sirt hodisalari" },
  { id: 11, file: "11-langmyur.html",       short: "Langmyur va sirt yuzasi",      title: "Qattiq jism sirtidagi adsorbsiya. Solishtirma sirt yuzasi", group: "Sirt hodisalari" },
  { id: 12, file: "12-emulsiya-kopik.html", short: "Emulsiyalar va koʻpiklar",     title: "Emulsiyalarning olinishi, tiplari va koʻpiklarning xossalari", group: "Sirt hodisalari" }
];

const LAB_REFS = [
  "Axmedov K. S., Raximov X. R. Kolloid ximiya. 2-nashr. — T., 1992.",
  "Voyutskiy S. S. Kurs kolloidnoy ximii. — M.: Ximiya, 1976.",
  "Grigorov O. N. Rukovodstvo k prakticheskim zanyatiyam po kolloidnoy ximii. — L.: LGU, 1964.",
  "Fridrixsberg D. A. Kurs kolloidnoy ximii. — L.: Ximiya, 1974.",
  "Frolov Yu. G. Kurs kolloidnoy ximii. — M.: Ximiya, 1989.",
  "Aminov S. N., Popkov V. A., Kurbanova M. M. Fizik va kolloid kimyodan amaliy mashgʻulotlar. — T.: Fan, 2006.",
  "Egamqulova H. A. «Kolloid kimyo» fanidan laboratoriya ishlarini bajarish boʻyicha uslubiy koʻrsatma. — Guliston: GulDU, 2026."
];

/* ============ PROGRESS SAQLASH (localStorage) ============ */
const LabProgress = {
  KEY: "kolloidKimyo_progress_v1",
  load() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || "{}"); }
    catch { return {}; }
  },
  save(labId, score, done) {
    try {
      const d = this.load();
      const prev = d[labId] || { score: 0, done: false };
      d[labId] = {
        score: Math.max(prev.score || 0, Math.round(score || 0)),
        done: Boolean(prev.done || done),
        updated: Date.now()
      };
      localStorage.setItem(this.KEY, JSON.stringify(d));
    } catch {}
  },
  get(labId) { return this.load()[labId] || null; }
};

/* ============ WEBAUDIO OVOZ EFFEKTLARI ============ */
const SFX = {
  ctx: null, on: true, m: null,
  init() {
    if (!this.ctx) {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A) return;
      this.ctx = new A();
      this.m = this.ctx.createGain();
      this.m.gain.value = .72;
      this.m.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
  },
  env(g, t, a, d, v) {
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(.0001, t + a + d);
  },
  tone(f, d, o = {}) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime + (o.delay || 0), os = c.createOscillator(), g = c.createGain();
    os.type = o.type || "sine";
    os.frequency.setValueAtTime(f, t);
    if (o.to) os.frequency.exponentialRampToValueAtTime(o.to, t + d);
    this.env(g, t, o.a || .005, d, o.v || .11);
    os.connect(g); g.connect(this.m);
    os.start(t); os.stop(t + d + .08);
  },
  noise(d, o = {}) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime + (o.delay || 0);
    const n = Math.max(1, Math.floor(c.sampleRate * (d + .06)));
    const b = c.createBuffer(1, n, c.sampleRate), ch = b.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(); s.buffer = b;
    const f = c.createBiquadFilter(); f.type = o.ft || "lowpass";
    f.frequency.setValueAtTime(o.f || 1000, t);
    if (o.fto) f.frequency.exponentialRampToValueAtTime(o.fto, t + d);
    f.Q.value = o.q || 1;
    const g = c.createGain(); this.env(g, t, o.a || .01, d, o.v || .1);
    s.connect(f); f.connect(g); g.connect(this.m);
    s.start(t); s.stop(t + d + .06);
  },
  play(n) {
    this.init();
    if (!this.on || !this.ctx) return;
    const T = this;
    switch (n) {
      case "click": T.tone(1380, .032, { type: "square", v: .035 }); break;
      case "ok": [523, 659, 784].forEach((f, i) => T.tone(f, .16, { delay: i * .075, type: "triangle", v: .11 })); break;
      case "err": T.tone(195, .26, { type: "sawtooth", to: 105, v: .08 }); break;
      case "warn": T.tone(480, .09, { type: "square", v: .05 }); T.tone(410, .11, { type: "square", v: .05, delay: .13 }); break;
      case "pour":
        T.noise(1.0, { f: 650, fto: 1650, q: .8, v: .11, a: .12 });
        for (let i = 0; i < 6; i++) T.tone(320 + Math.random() * 480, .055, { delay: .1 + Math.random() * .8, v: .024, to: 920 });
        break;
      case "drip": T.tone(880, .085, { to: 1920, v: .075 }); break;
      case "pipette": T.noise(.22, { ft: "bandpass", f: 950, q: 2, v: .075 }); T.tone(720, .07, { to: 1500, v: .055, delay: .17 }); break;
      case "stir": T.noise(.5, { ft: "bandpass", f: 520, fto: 1700, q: 1.4, v: .09, a: .1 }); T.tone(2450, .045, { delay: .24, v: .028, type: "triangle" }); break;
      case "shake": for (let i = 0; i < 5; i++) T.noise(.08, { ft: "bandpass", f: 880 + i * 110, q: 1.8, v: .11, delay: i * .085 }); break;
      case "heat": T.tone(115, .65, { type: "sawtooth", v: .028, to: 148 }); T.noise(.65, { f: 340, v: .04 }); break;
      case "boil": for (let i = 0; i < 6; i++) T.tone(260 + Math.random() * 320, .06, { delay: i * .09, v: .035, to: 740 }); break;
      case "electric": T.tone(100, .45, { type: "sawtooth", v: .035 }); T.tone(200, .45, { type: "sine", v: .025 }); break;
      case "vacuum": T.noise(.9, { ft: "bandpass", f: 420, fto: 900, q: 2.2, v: .1, a: .15 }); break;
      case "bubble": for (let i = 0; i < 5; i++) T.tone(360 + i * 95, .07, { delay: i * .075, to: 860 + i * 90, v: .045 }); break;
      case "weigh": T.tone(990, .045, { v: .045 }); break;
      case "tick": T.tone(3300, .012, { type: "square", v: .022 }); break;
      case "beep": T.tone(1760, .085, { type: "square", v: .05 }); break;
      case "bell": T.tone(1318, .65, { v: .1 }); T.tone(1976, .5, { v: .04, delay: .02 }); break;
      case "whoosh": T.noise(.38, { ft: "bandpass", f: 320, fto: 2100, q: .7, v: .095 }); break;
      case "splash": T.noise(.34, { f: 2400, fto: 380, v: .13 }); T.tone(580, .11, { to: 210, v: .04, delay: .04 }); break;
      case "paper": T.noise(.16, { ft: "highpass", f: 3000, v: .055 }); break;
      case "fanfare": [523, 659, 784, 1046].forEach((f, i) => T.tone(f, .3, { delay: i * .11, type: "triangle", v: .11 })); break;
    }
  }
};

/* ============ UMUMIY YORDAMCHI FUNKSIYALAR ============ */
const LabUI = {
  $: s => document.querySelector(s),
  el: id => document.getElementById(id),
  clamp: (v, a, b) => Math.max(a, Math.min(b, v)),
  lerp: (a, b, t) => a + (b - a) * t,
  avg: a => a.reduce((x, y) => x + y, 0) / (a.length || 1),
  f1: (v, n = 1) => (+v).toFixed(n).replace(".", ","),
  rnd: (a, b) => a + Math.random() * (b - a),
  attr(id, o) {
    const e = document.getElementById(id);
    if (!e) return;
    for (const k in o) e.setAttribute(k, o[k]);
  },
  shuf(n, seed) {
    const a = [...Array(n).keys()];
    let s = seed;
    for (let i = n - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const j = Math.floor(s / 233280 * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  toast(msg, type = "", ms = 3300) {
    const T = document.getElementById("toasts");
    if (!T) return;
    const d = document.createElement("div");
    d.className = "toast " + type;
    d.innerHTML = msg;
    T.appendChild(d);
    while (T.children.length > 3) T.firstChild.remove();
    setTimeout(() => d.remove(), ms);
  },
  modal(html) {
    const c = document.getElementById("modalCard");
    const m = document.getElementById("modal");
    if (!c || !m) return;
    c.innerHTML = html;
    m.classList.add("on");
  },
  closeModal() {
    const m = document.getElementById("modal");
    if (m) m.classList.remove("on");
  },
  refsHTML() {
    return `<h3>Adabiyotlar</h3><ul style="font-size:12.8px">${LAB_REFS.map(r => `<li>${r}</li>`).join("")}</ul>`;
  },
  initShell(labId) {
    // 12-lab tezkor almashtirgich menyusi
    const swWrap = document.getElementById("labSwitchWrap");
    if (swWrap) {
      const prog = LabProgress.load();
      swWrap.innerHTML = `
        <button type="button" class="lab-switch-btn" id="labSwitchBtn" aria-expanded="false">📚 12 lab ▾</button>
        <div class="lab-switch-menu" id="labSwitchMenu">
          ${LAB_CATALOG.map(l => {
            const p = prog[l.id];
            return `<a href="${l.file}" class="${l.id === labId ? "cur" : ""}">
              <span class="num">${String(l.id).padStart(2, "0")}</span>
              <span>${l.short}</span>
              ${p && p.done ? `<span class="done-dot">✓ ${p.score}</span>` : ""}
            </a>`;
          }).join("")}
        </div>`;
      const btn = document.getElementById("labSwitchBtn");
      const menu = document.getElementById("labSwitchMenu");
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const open = menu.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", () => {
        menu.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    }
    const m = document.getElementById("modal");
    if (m) m.addEventListener("click", e => { if (e.target.id === "modal") LabUI.closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") LabUI.closeModal(); });
    document.addEventListener("pointerdown", () => SFX.init(), { once: true });
    const snd = document.getElementById("btnSnd");
    if (snd) snd.addEventListener("click", () => {
      SFX.on = !SFX.on;
      snd.textContent = SFX.on ? "🔊 Ovoz" : "🔇 Ovoz";
      if (SFX.on) SFX.play("click");
    });
    const full = document.getElementById("btnFull");
    if (full) full.addEventListener("click", () => {
      document.fullscreenElement
        ? document.exitFullscreen()
        : document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    });
  },
  /* Universal SVG grafik generatori (chiziqli, nuqtali + regressiya, ustunli) */
  niceStep(span) {
    if (span <= 0) return 1;
    const e = Math.pow(10, Math.floor(Math.log10(span))), f = span / e;
    return (f <= 1.5 ? .2 : f <= 3.5 ? .5 : f <= 7.5 ? 1 : 2) * e;
  },
  svgChart(opts) {
    const W = opts.W || 368, H = opts.H || 215;
    const padL = opts.padL || 48, padR = 14, padT = 18, padB = 34;
    const w = W - padL - padR, h = H - padT - padB;
    const x0 = opts.x0 ?? 0, xm = opts.xm ?? 10, y0 = opts.y0 ?? 0, ym = opts.ym ?? 10;
    const X = v => padL + (v - x0) / (xm - x0 || 1) * w;
    const Y = v => padT + h - (v - y0) / (ym - y0 || 1) * h;
    let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;background:#fff;border:1px solid var(--line);border-radius:10px;display:block">`;
    s += `<rect x="${padL}" y="${padT}" width="${w}" height="${h}" fill="#fafcfb"/>`;
    if (opts.bars) {
      const sy = opts.sy || LabUI.niceStep(ym - y0);
      for (let v = y0; v <= ym + 1e-9; v += sy) {
        s += `<line x1="${padL}" y1="${Y(v)}" x2="${padL + w}" y2="${Y(v)}" stroke="#e6efed"/>`;
        s += `<text x="${padL - 5}" y="${Y(v) + 3}" text-anchor="end" font-size="9" fill="#587276">${+v.toFixed(2)}</text>`;
      }
      const bw = Math.min(44, (w / opts.bars.length) * .58);
      opts.bars.forEach((b, i) => {
        const cx = padL + w * (i + .5) / opts.bars.length;
        const bh = Math.max(2, Y(y0) - Y(b.y));
        s += `<rect x="${cx - bw / 2}" y="${Y(b.y)}" width="${bw}" height="${bh}" rx="4" fill="${b.c || '#1b484f'}"/>`;
        s += `<text x="${cx}" y="${Y(b.y) - 4}" text-anchor="middle" font-size="9.5" font-weight="700" fill="#132629">${b.val ?? LabUI.f1(b.y, 1)}</text>`;
        s += `<text x="${cx}" y="${padT + h + 14}" text-anchor="middle" font-size="9.2" fill="#132629">${b.l}</text>`;
      });
    } else {
      const sx = opts.sx || LabUI.niceStep(xm - x0);
      const sy = opts.sy || LabUI.niceStep(ym - y0);
      for (let v = Math.ceil(x0 / sx) * sx; v <= xm + 1e-9; v += sx) {
        s += `<line x1="${X(v)}" y1="${padT}" x2="${X(v)}" y2="${padT + h}" stroke="#e6efed"/>`;
        s += `<text x="${X(v)}" y="${padT + h + 13}" text-anchor="middle" font-size="9" fill="#587276">${+v.toFixed(2)}</text>`;
      }
      for (let v = Math.ceil(y0 / sy) * sy; v <= ym + 1e-9; v += sy) {
        s += `<line x1="${padL}" y1="${Y(v)}" x2="${padL + w}" y2="${Y(v)}" stroke="#e6efed"/>`;
        s += `<text x="${padL - 5}" y="${Y(v) + 3}" text-anchor="end" font-size="9" fill="#587276">${+v.toFixed(2)}</text>`;
      }
      if (opts.line) {
        const [p1, p2] = opts.line;
        s += `<line x1="${X(p1.x)}" y1="${Y(p1.y)}" x2="${X(p2.x)}" y2="${Y(p2.y)}" stroke="${opts.lineColor || '#d64545'}" stroke-width="1.8" stroke-dasharray="5 3"/>`;
      }
      (opts.series || []).forEach(ser => {
        const P = [...ser.pts].sort((a, b) => a.x - b.x);
        if (P.length > 1 && !ser.scatterOnly) {
          s += `<path d="${P.map((p, i) => (i ? "L" : "M") + X(p.x).toFixed(1) + " " + Y(p.y).toFixed(1)).join(" ")}" fill="none" stroke="${ser.color || '#1b484f'}" stroke-width="2.2"/>`;
        }
        P.forEach(p => {
          s += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="3.8" fill="${ser.dot || ser.color || '#e89b3c'}" stroke="#132629" stroke-width="1"/>`;
        });
      });
    }
    s += `<text x="${padL + w}" y="${H - 4}" text-anchor="end" font-size="10" font-weight="700" fill="#132629">${opts.xl || ""}</text>`;
    s += `<text x="${padL + 4}" y="${padT - 5}" font-size="10" font-weight="700" fill="#132629">${opts.yl || ""}</text>`;
    if (opts.title) s += `<text x="${padL + w / 2}" y="${padT - 5}" text-anchor="middle" font-size="10.5" font-weight="700" fill="#132629">${opts.title}</text>`;
    return s + `</svg>`;
  }
};
