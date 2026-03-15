// script.js
// Data Profil
const PROFILE = {
  name: "Al'Majid Nafi Rambe",
  nameShort: "Al'Majid",
  tagline: "Fullstack Developer & Creative",
  email: "almajidnafi@gmail.com",
};

const ROLES = [
  "Fullstack Developer",
  "Visual Design",
  "Photography",
  "Videography",
  "Video Editing",
];

const STATS = [
  { num: "16", lbl: "Tahun" },
  { num: "300+", lbl: "Proyek" },
  { num: "Kls 11", lbl: "SMK" },
];

const BIO = [
  "Halo, saya <strong>Al'Majid Nafi Rambe</strong> — Fullstack Developer muda berusia 16 tahun, lahir di Medan dan kini menetap di Rantauprapat, Sumatera Utara.",
  "Meski belum memiliki pengalaman kerja formal, saya membangun keahlian secara mandiri — dari arsitektur backend yang solid hingga antarmuka pengguna yang bersih dan intuitif.",
  "Di luar kode, saya aktif di dunia fotografi, videografi, dan konten digital. Usia bukan penghalang — setiap proyek adalah pembuktian diri.",
];

const SKILLS = [
  "Web Development",
  "UI/UX Design",
  "Photography",
  "Videography",
  "Video Editing",
  "Branding",
  "Content Creation",
];

const TECH = [
  { icon: "fa-brands fa-html5", name: "HTML5" },
  { icon: "fa-brands fa-css3-alt", name: "CSS3" },
  { icon: "fa-brands fa-js", name: "JavaScript" },
  { icon: "fa-brands fa-react", name: "React" },
  { icon: "fa-brands fa-node-js", name: "Node.js" },
  { icon: "fa-solid fa-database", name: "MySQL" },
  { icon: "fa-brands fa-git-alt", name: "Git" },
  { icon: "fa-brands fa-figma", name: "Figma" },
];

const INFO_CARDS = [
  { icon: "fa-solid fa-cake-candles", lbl: "Lahir", val: "26 Juni 2009" },
  { icon: "fa-solid fa-location-dot", lbl: "Dari", val: "Medan, Sumatra Utara" },
  { icon: "fa-solid fa-house", lbl: "Tinggal", val: "Rantauprapat, Labuhanbatu" },
  { icon: "fa-solid fa-school", lbl: "Sekolah", val: "SMKS PEMDA Rantauprapat" },
  { icon: "fa-solid fa-graduation-cap", lbl: "Kelas", val: "XI — SMK" },
  { icon: "fa-solid fa-code", lbl: "Status", val: "Self-Taught Developer" },
];

const SOCIALS = [
  { icon: "fa-brands fa-github", url: "https://github.com/NaraToMajid", label: "GitHub" },
  { icon: "fa-brands fa-tiktok", url: "https://www.tiktok.com/@orasampurna", label: "TikTok" },
  { icon: "fa-brands fa-instagram", url: "https://www.instagram.com/al_majid.16", label: "Instagram" },
  { icon: "fa-brands fa-whatsapp", url: "https://wa.me/6283853185739", label: "WhatsApp" },
  { icon: "fa-solid fa-envelope", url: "mailto:almajidnafi@gmail.com", label: "Email" },
];

const CONTACTS = [
  { icon: "fa-solid fa-envelope", lbl: "Email Utama", val: "almajidnafi@gmail.com", url: "mailto:almajidnafi@gmail.com" },
  { icon: "fa-solid fa-envelope", lbl: "Email Dev", val: "oradevofficial@gmail.com", url: "mailto:oradevofficial@gmail.com" },
  { icon: "fa-brands fa-whatsapp", lbl: "WhatsApp", val: "+62 838-5318-5739", url: "https://wa.me/6283853185739" },
  { icon: "fa-brands fa-instagram", lbl: "Instagram", val: "@al_majid.16", url: "https://www.instagram.com/al_majid.16" },
  { icon: "fa-brands fa-tiktok", lbl: "TikTok", val: "@orasampurna", url: "https://www.tiktok.com/@orasampurna" },
  { icon: "fa-brands fa-github", lbl: "GitHub", val: "@NaraToMajid", url: "https://github.com/NaraToMajid" },
];

const LOC_DETAILS = [
  { icon: "fa-solid fa-location-dot", lbl: "Alamat", val: "Rantauprapat, Labuhanbatu\nSumatera Utara, Indonesia" },
  { icon: "fa-solid fa-school", lbl: "Sekolah", val: "SMKS PEMDA Rantauprapat\nKelas XI — Aktif" },
  { icon: "fa-solid fa-map-pin", lbl: "Koordinat", val: "2°04′34.6″N  99°49′47.3″E" },
  { icon: "fa-solid fa-city", lbl: "Kota Lahir", val: "Medan, Sumatera Utara" },
];

const PHOTO = "foto.webp";

// Render Functions
function renderNav() {
  document.getElementById("nav-center").innerHTML = ["Home", "About", "Location", "Help"]
    .map((n) => `<a href="#${n.toLowerCase()}"${n === "Home" ? ' class="active"' : ""}>${n}</a>`)
    .join("");
}

function renderHero() {
  document.getElementById("h-tag").textContent = PROFILE.tagline;
  document.getElementById("h-name").innerHTML = `Halo, saya<br><em>${PROFILE.nameShort}</em>`;
  document.getElementById("h-roles").innerHTML = ROLES.map((r) => `<span class="role-chip">${r}</span>`).join("");
  document.getElementById("h-cta").innerHTML = `
    <a href="#help" class="btn btn-outline"><i class="fa-solid fa-handshake"></i>Kolaborasi</a>`;
  document.getElementById("h-socs").innerHTML = SOCIALS.map(
    (s) =>
      `<a href="${s.url}" class="soc-btn" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
  ).join("");

  const frame = document.getElementById("h-photo");
  const img = document.createElement("img");
  img.src = PHOTO;
  img.alt = PROFILE.name;
  img.style.cssText = "width:100%;height:100%;border-radius:6px;position:relative;z-index:1;object-fit:cover";
  frame.prepend(img);

  document.getElementById("h-stats").innerHTML = STATS.map(
    (s) => `<div class="stat-item"><div class="stat-num">${s.num}</div><div class="stat-lbl">${s.lbl}</div></div>`
  ).join("");
}

function renderAbout() {
  const wrap = document.getElementById("a-img");
  const img = document.createElement("img");
  img.src = PHOTO;
  img.alt = PROFILE.name;
  wrap.appendChild(img);

  document.getElementById("a-badge").innerHTML = `<strong>16</strong><span>Tahun</span>`;
  document.getElementById("a-title").innerHTML = `Muda, Ahli,<br><em>dan Berkarya</em>`;
  document.getElementById("a-bio").innerHTML = BIO.map((p, i) => `<p class="rv d${i + 1}">${p}</p>`).join("");
  document.getElementById("a-skills").innerHTML = SKILLS.map((s) => `<span class="s-chip">${s}</span>`).join("");
  document.getElementById("a-tech").innerHTML = TECH.map(
    (t) => `<div class="tech-chip"><i class="${t.icon}"></i>${t.name}</div>`
  ).join("");
  document.getElementById("a-info").innerHTML = INFO_CARDS.map(
    (c) =>
      `<div class="info-card"><div class="info-card-icon"><i class="${c.icon}"></i></div><div class="info-card-lbl">${c.lbl}</div><div class="info-card-val">${c.val}</div></div>`
  ).join("");
}

function renderLocation() {
  document.getElementById("loc-list").innerHTML = LOC_DETAILS.map(
    (l) =>
      `<div class="loc-card rv"><div class="loc-icon"><i class="${l.icon}"></i></div><div><div class="loc-lbl">${l.lbl}</div><div class="loc-val">${l.val.replace(
        /\n/g,
        "<br>"
      )}</div></div></div>`
  ).join("");
}

function renderHelp() {
  document.getElementById("hp-title").innerHTML = `Mari<br><em>Berkolaborasi</em>`;
  document.getElementById("hp-cards").innerHTML = CONTACTS.map(
    (c) =>
      `<div class="contact-card rv"><div class="contact-icon"><i class="${c.icon}"></i></div><div><div class="contact-lbl">${c.lbl}</div><div class="contact-val"><a href="${c.url}" target="_blank">${c.val}</a></div></div></div>`
  ).join("");
  document.getElementById("hp-socs").innerHTML = SOCIALS.map(
    (s) =>
      `<a href="${s.url}" class="soc-btn" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
  ).join("");

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("f-name").value.trim();
    const email = document.getElementById("f-email").value.trim();
    const type = document.getElementById("f-type").value;
    const msg = document.getElementById("f-msg").value.trim();
    if (!name || !email || !msg) return;
    const body = `Halo ${PROFILE.nameShort},\n\nSaya ${name} (${email}) ingin berkolaborasi${type ? ": " + type : ""}.\n\n${msg}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      "Kolaborasi dari " + name
    )}&body=${encodeURIComponent(body)}`;
    const el = document.getElementById("form-msg");
    el.style.display = "block";
    el.innerHTML = `<i class="fa-solid fa-circle-check"></i> Terima kasih, ${name.split(" ")[0]}! Pesan Anda terkirim.`;
    this.reset();
  });
}

function renderFooter() {
  const yr = new Date().getFullYear();
  document.getElementById("f-logo").textContent = PROFILE.name;
  document.getElementById("f-copy").textContent = `© ${yr} ${PROFILE.name}. Hak Cipta Dilindungi.`;
  document.getElementById("f-socs").innerHTML = SOCIALS.map(
    (s) =>
      `<a href="${s.url}" class="foot-soc" target="_blank" rel="noopener" aria-label="${s.label}"><i class="${s.icon}"></i></a>`
  ).join("");
}

// Theme
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  localStorage.setItem("theme", t);
  document.getElementById("theme-icon").className = t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
}
applyTheme(localStorage.getItem("theme") || "dark");
document.getElementById("theme-btn").addEventListener("click", () => {
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// Hamburger
const ham = document.getElementById("hamburger");
const mob = document.getElementById("mobile-nav");
ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mob.classList.toggle("open");
  document.body.style.overflow = mob.classList.contains("open") ? "hidden" : "";
});
document.querySelectorAll(".mob-link").forEach((a) =>
  a.addEventListener("click", () => {
    ham.classList.remove("open");
    mob.classList.remove("open");
    document.body.style.overflow = "";
  })
);

// Navbar Scroll + Active Link
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
});
const secObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        document.querySelectorAll(".nav-center a, .mobile-nav a").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id)
        );
      }
    });
  },
  { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
);
document.querySelectorAll("section[id]").forEach((s) => secObs.observe(s));

// Scroll Reveal
const rvObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("vi");
        rvObs.unobserve(en.target);
      }
    });
  },
  { threshold: 0.08 }
);
function observeAll() {
  document.querySelectorAll(".rv,.rl,.rr").forEach((el) => rvObs.observe(el));
}

// Role Chip Cycle
function startChipCycle() {
  const chips = document.querySelectorAll(".role-chip");
  if (!chips.length) return;
  let idx = 0;
  chips[0].classList.add("active-chip");
  setInterval(() => {
    chips[idx].classList.remove("active-chip");
    idx = (idx + 1) % chips.length;
    chips[idx].classList.add("active-chip");
  }, 1800);
}

// Live Clock
function updateClock() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
  const date = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const timeEl = document.getElementById("clock-time");
  const dateEl = document.getElementById("clock-date");
  if (timeEl) timeEl.textContent = time;
  if (dateEl) dateEl.textContent = date;
}
updateClock();
setInterval(updateClock, 1000);

// Anti Inspect Element
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "U") ||
    (e.ctrlKey && e.key === "S") ||
    (e.ctrlKey && e.shiftKey && e.key === "C")
  ) {
    e.preventDefault();
  }
});

// Initialization
renderNav();
renderHero();
renderAbout();
renderLocation();
renderHelp();
renderFooter();

window.addEventListener("load", () => {
  observeAll();
  startChipCycle();
});
