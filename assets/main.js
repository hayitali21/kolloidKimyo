"use strict";
/* Kolloid Kimyo — Asosiy sahifa mantiqi: 12 laboratoriya menyusi, qidiruv, progress va Tindal shkalasi */

const LABS = [
  {
    id: 1,
    file: "labs/01-kondensatsion.html",
    group: "olinish",
    groupLabel: "Olinish va tozalash",
    accent: "#b85d24",
    title: "Kolloid eritmalarning kondensatsion usulda olinishi",
    desc: "Oltingugurt va kanifol gidrozollarini erituvchini almashtirib olish, Fe(OH)₃ zoli gidrolizi hamda AgI ning musbat va manfiy zollarini tayyorlash.",
    tags: ["S / kanifol", "Fe(OH)₃", "AgI mitsella"],
    stages: "3 tajriba · hisobot"
  },
  {
    id: 2,
    file: "labs/02-disperslash.html",
    group: "olinish",
    groupLabel: "Olinish va tozalash",
    accent: "#2a7b6f",
    title: "Kolloid sistemalarni disperslash usulida olinishi",
    desc: "SnCl₄ gidrolizi, dekantatsiya va NaOH/HCl yordamida stannat kislota peptizatsiyasi; sovun va bura bilan benzol hamda pista moyi emulsiyalari.",
    tags: ["H₂SnO₃", "Peptizatsiya", "Emulsiya"],
    stages: "3 bosqich · hisobot"
  },
  {
    id: 3,
    file: "labs/03-tozalash.html",
    group: "olinish",
    groupLabel: "Olinish va tozalash",
    accent: "#216e96",
    title: "Kolloid sistemalarni tozalash usullari",
    desc: "Yarim oʻtkazgich membranada oddiy dializ, 6–12 V kuchlanishli elektrodializ va vakuum ostida ultrafiltratsiya usullarini taqqoslash.",
    tags: ["Dializ", "Elektrodializ", "Ultrafiltratsiya"],
    stages: "3 tajriba · jadval"
  },
  {
    id: 4,
    file: "labs/04-elektroforez.html",
    group: "elektr",
    groupLabel: "Elektr va koagullanish",
    accent: "#1f6a73",
    title: "Dispers sistemalarning elektr xossalari. Elektroforez va elektroosmos",
    desc: "Loy zarrachalari elektroforezi, AgBr zollari zaryad ishorasini aniqlash va agar-agar koʻprikli U-simon nayda harakatchanlik U ni hisoblash.",
    tags: ["Elektroforez", "AgBr (±)", "U = S·l/(V·t)"],
    stages: "3 tajriba · hisoblash"
  },
  {
    id: 5,
    file: "labs/05-koagullanish.html",
    group: "elektr",
    groupLabel: "Elektr va koagullanish",
    accent: "#b5741d",
    title: "Kolloid eritmalarning koagullanishi. Jelatinani degidratlash",
    desc: "9 ta probirkada pH 3,5–6,0 atsetat bufer seriyasi tayyorlash, suvsiz etil spirt bilan degidratlash va jelatinaning izoelektrik nuqtasini (pH 4,7) topish.",
    tags: ["9 probirka", "pH 4,7 (IEN)", "C₂H₅OH"],
    stages: "3 bosqich · grafik"
  },
  {
    id: 6,
    file: "labs/06-gidrofil.html",
    group: "elektr",
    groupLabel: "Elektr va koagullanish",
    accent: "#a85632",
    title: "Gidrofil zollarning koagullanishi",
    desc: "Tuxum oqsili (albumin) zolini Byuxner voronkasida filtrlash, (NH₄)₂SO₄ bilan qaytar tuzlash va 50–60 °C qizdirib qaytmas denaturatsiyani kuzatish.",
    tags: ["Albumin", "(NH₄)₂SO₄", "Qaytar / qaytmas"],
    stages: "3 bosqich · hisobot"
  },
  {
    id: 7,
    file: "labs/07-gidrofob.html",
    group: "elektr",
    groupLabel: "Elektr va koagullanish",
    accent: "#9e3b2b",
    title: "Gidrofob zollarning va ikki kolloidning oʻzaro koagullanishi",
    desc: "As₂S₃ va Fe(OH)₃ zollarida Shultse–Gardi qoidasi, koagullanish ostonasi (4-jadval) hamda qarama-qarshi zaryadli AgI(−)/AgI(+) zollarining oʻzaro koagullanishi.",
    tags: ["Shultse–Gardi", "As₂S₃ / Fe(OH)₃", "11 probirka"],
    stages: "3 tajriba · grafik"
  },
  {
    id: 8,
    file: "labs/08-sedimentatsiya.html",
    group: "analiz",
    groupLabel: "Analiz va struktura",
    accent: "#d98829",
    title: "Sedimentatsion analiz. Zarrachaning choʻkish tezligi va oʻlchamini topish",
    desc: "VT-500 vintli tarozini sozlash, 0,5% tal'k suspenziyasining choʻkish egri chizigʻi m = f(t) ni oʻlchash, urinmalar usuli va differensial taqsimlanish grafigi.",
    tags: ["Vintli tarozi", "Stoks qonuni", "r = K√(H/t)"],
    stages: "5 bosqich · grafik"
  },
  {
    id: 9,
    file: "labs/09-qovushqoqlik.html",
    group: "analiz",
    groupLabel: "Analiz va struktura",
    accent: "#1d8c9e",
    title: "Kolloid sistemalarda strukturalar. Qovushqoqlikni viskozimetrda aniqlash",
    desc: "Ostvald viskozimetrini kalibrlash, jelatina zoli qovushqoqligiga konsentratsiya (4-jadval), harorat (0–60 °C) va KI / K₂SO₄ tuzlarining liotrop taʼsiri.",
    tags: ["Ostvald", "0–60 °C", "Liotrop qator"],
    stages: "4 bosqich · 3 grafik"
  },
  {
    id: 10,
    file: "labs/10-adsorbsiya.html",
    group: "sirt",
    groupLabel: "Sirt hodisalari",
    accent: "#2d6e57",
    title: "Dispers sistemalarning sirt hodisalari. Adsorbsiya (Freyndlix)",
    desc: "Sirka kislotaning 6 xil konsentratsiyasini hayvonot suyagi koʻmirida adsorbsiyalash, 0,1 n NaOH bilan titrlash, izoterma va Freyndlix konstantalarini (a, n) topish.",
    tags: ["CH₃COOH + C", "Titrlash", "lg(x/m) = f(lg C₁)"],
    stages: "4 bosqich · izoterma"
  },
  {
    id: 11,
    file: "labs/11-langmyur.html",
    group: "sirt",
    groupLabel: "Sirt hodisalari",
    accent: "#7b3d6e",
    title: "Qattiq jism sirtidagi adsorbsiya. Adsorbentning sirt yuzasini aniqlash",
    desc: "KMnO₄ eritmalarining faollashtirilgan koʻmirda 25 °C da adsorbsiyasi, spektrofotometriya (525 nm), Langmyur izotermasi va solishtirma sirt yuzasi S_sol.",
    tags: ["KMnO₄", "Spektrofotometr", "Langmyur · S_sol"],
    stages: "4 bosqich · izoterma"
  },
  {
    id: 12,
    file: "labs/12-emulsiya-kopik.html",
    group: "sirt",
    groupLabel: "Sirt hodisalari",
    accent: "#c48420",
    title: "Emulsiyalarning olinishi, tiplarini aniqlash va koʻpiklarning xossalari",
    desc: "Benzol va paxta moyi emulsiyalari tiplarini (M/S) aniqlash; 8-rasm asbobida 0,2% nekal va 0,2% agar-agar koʻpiklarining barqarorligi va yashash davrini oʻlchash.",
    tags: ["M/S emulsiya", "Nekal + agar", "Koʻpik drenaji"],
    stages: "3 bosqich · grafik"
  }
];

const PROG_KEY = "kolloidKimyo_progress_v1";
function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROG_KEY) || "{}"); }
  catch { return {}; }
}

let activeGroup = "all";
let searchQuery = "";

function renderSummary() {
  const prog = loadProgress();
  let doneCount = 0, scoreSum = 0, scoredCount = 0;
  LABS.forEach(l => {
    const p = prog[l.id];
    if (p && p.done) doneCount++;
    if (p && p.score > 0) { scoreSum += p.score; scoredCount++; }
  });
  const pct = Math.round((doneCount / LABS.length) * 100);
  const avgScore = scoredCount ? Math.round(scoreSum / scoredCount) : 0;

  const navTxt = document.getElementById("navProgTxt");
  const navBar = document.getElementById("navProgBar");
  if (navTxt) navTxt.textContent = `${doneCount}/12`;
  if (navBar) navBar.style.width = pct + "%";

  const mDone = document.getElementById("metricDone");
  const mAvg = document.getElementById("metricAvg");
  if (mDone) mDone.textContent = `${doneCount} / 12`;
  if (mAvg) mAvg.textContent = scoredCount ? `${avgScore} ball` : "—";
}

function renderCards() {
  const grid = document.getElementById("labsGrid");
  if (!grid) return;
  const prog = loadProgress();
  const q = searchQuery.trim().toLowerCase();

  const filtered = LABS.filter(l => {
    const matchGroup = activeGroup === "all" || l.group === activeGroup;
    if (!matchGroup) return false;
    if (!q) return true;
    const hay = `${l.id} ${l.title} ${l.desc} ${l.groupLabel} ${l.tags.join(" ")}`.toLowerCase();
    return hay.includes(q);
  });

  if (!filtered.length) {
    grid.innerHTML = `<div class="empty-state"><strong>Mos laboratoriya topilmadi.</strong><br>Boshqa kalit soʻz bilan qidirib koʻring yoki filtrni «Barchasi» ga qaytaring.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(l => {
    const p = prog[l.id];
    let statusHTML = `<span class="card-status">Boshlanmagan</span>`;
    if (p && p.done) statusHTML = `<span class="card-status done">✓ ${p.score} ball</span>`;
    else if (p && p.score > 0) statusHTML = `<span class="card-status inprog">${p.score} ball</span>`;

    return `
      <a class="lab-card" href="${l.file}" style="--card-accent:${l.accent}">
        <div class="card-top">
          <div class="card-num-wrap">
            <span class="card-num">${String(l.id).padStart(2, "0")}</span>
            <span class="card-group">${l.groupLabel}</span>
          </div>
          ${statusHTML}
        </div>
        <h3>${l.title}</h3>
        <p>${l.desc}</p>
        <div class="card-tags">${l.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="card-foot">
          <span class="meta">${l.stages}</span>
          <span>Boshlash <span class="arrow">→</span></span>
        </div>
      </a>`;
  }).join("");
}

/* ============ INTERAKTIV DISPERSLIK VA TINDAL SHKALASI ============ */
function updateTyndall(val) {
  // val: 0..100 -> log10(d_nm) from -0.5 (~0.3 nm) to 4.0 (10 000 nm = 10 µm)
  const exp = -0.5 + (val / 100) * 4.5;
  const d = Math.pow(10, exp);
  const readout = document.getElementById("twReadout");
  const desc = document.getElementById("twDesc");
  const svg = document.getElementById("twSvg");
  if (!readout || !desc || !svg) return;

  const dTxt = d < 1 ? `${d.toFixed(2).replace(".", ",")} nm`
    : d < 1000 ? `${Math.round(d)} nm`
    : `${(d / 1000).toFixed(1).replace(".", ",")} µm`;

  let cls, info, coneOpacity, solColor, partCount, partR, settleY;
  if (d < 1) {
    cls = "Chin eritma";
    info = "Ion va molekulalar (< 1 nm): yorugʻlik nuri sochilmaydi (optik boʻsh), membranadan erkin oʻtadi.";
    coneOpacity = 0.05;
    solColor = "#7ec4dc";
    partCount = 0;
    partR = 0.6;
    settleY = 0;
  } else if (d <= 100) {
    cls = "Kolloid sistema (zol)";
    info = "1–100 nm zarrachalar: kuchli Tindal konusi kuzatiladi, Broun harakati tufayli choʻkmaydi, dializda membranada ushlanadi.";
    coneOpacity = 0.45 + 0.5 * Math.sin(((Math.log10(d)) / 2) * Math.PI);
    solColor = "#b55d28";
    partCount = 26;
    partR = 1.1 + (Math.log10(d) / 2) * 1.1;
    settleY = 0;
  } else {
    cls = "Dagʻal dispers (suspenziya)";
    info = "> 100 nm zarrachalar: loyqa sistema, gravitatsiya taʼsirida choʻkadi (sedimentatsion analiz sohasi).";
    coneOpacity = 0.22;
    solColor = "#9ea79b";
    partCount = 28;
    partR = 2.4 + Math.min(2.2, (Math.log10(d) - 2) * 1.1);
    settleY = Math.min(18, (Math.log10(d) - 2) * 9);
  }

  readout.textContent = `${dTxt} · ${cls}`;
  desc.textContent = info;

  let dots = "";
  for (let i = 0; i < partCount; i++) {
    const px = 42 + ((i * 29) % 74);
    const baseY = 12 + ((i * 19) % 30);
    const py = Math.min(47, baseY + settleY);
    dots += `<circle cx="${px}" cy="${py}" r="${partR.toFixed(1)}" fill="${d <= 100 ? "#ffd88a" : "#e9e3d3"}" opacity="${d <= 100 ? .85 : .9}"/>`;
  }
  const sedH = d > 100 ? Math.min(9, (Math.log10(d) - 2) * 4.5) : 0;

  svg.innerHTML = `
    <rect x="0" y="0" width="150" height="54" fill="#0c2427"/>
    <rect x="34" y="6" width="88" height="44" rx="4" fill="${solColor}" opacity="${d < 1 ? .22 : d <= 100 ? .45 : .55}" stroke="#7aa4a8" stroke-width="1.5"/>
    <line x1="0" y1="28" x2="34" y2="28" stroke="#ffbe4f" stroke-width="2.2"/>
    <polygon points="34,26 122,19 122,37 34,30" fill="#ffcf6e" opacity="${coneOpacity.toFixed(2)}"/>
    <line x1="122" y1="28" x2="150" y2="28" stroke="#ffbe4f" stroke-width="${d > 100 ? 0.7 : 1.6}" opacity="${d > 100 ? .35 : .8}"/>
    ${dots}
    ${sedH > 0 ? `<rect x="35" y="${49 - sedH}" width="86" height="${sedH}" rx="1" fill="#e5decb" opacity=".9"/>` : ""}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderCards();

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGroup = btn.dataset.group;
      renderCards();
    });
  });

  const searchInput = document.getElementById("labSearch");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchQuery = e.target.value;
      renderCards();
    });
  }

  const slider = document.getElementById("twSlider");
  if (slider) {
    updateTyndall(+slider.value);
    slider.addEventListener("input", e => updateTyndall(+e.target.value));
  }

  const resetBtn = document.getElementById("resetProgress");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Barcha 12 ta laboratoriya boʻyicha saqlangan natijalarni tozalaysizmi?")) {
        localStorage.removeItem(PROG_KEY);
        renderSummary();
        renderCards();
      }
    });
  }
});
