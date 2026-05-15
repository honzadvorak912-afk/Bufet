const STORAGE_KEY_PREFIX = 'bufeteva_';

const DEFAULT_MENU = {
  po: {
    polevky: [
      { gram: '0,4 l', nazev: 'Kapustová s uzeným masem', cena: '35' }
    ],
    jidla: [
      { gram: '130 g', nazev: 'Brněnský drak, americké brambory, obloha', cena: '150' },
      { gram: '130 g', nazev: 'Krkonošský guláš, houskové knedlíky', cena: '140' },
      { gram: '130 g', nazev: 'Vepřové výpečky, houskové knedlíky, zelí', cena: '130' },
      { gram: '130 g', nazev: 'Šťavnatá hovězí pečeně, rýže', cena: '140' },
      { gram: '130 g', nazev: 'Uzená krkovička, čočka na kyslo, okurka', cena: '130' },
      { gram: '130 g', nazev: 'Azu po tatarsku, rýže', cena: '140' }
    ]
  },
  ut: {
    polevky: [
      { gram: '0,4 l', nazev: 'Gulášová', cena: '30' }
    ],
    jidla: [
      { gram: '130 g', nazev: 'Anglický rostbíf, brambory, cibulka, hořčice, tatarská omáčka', cena: '150' },
      { gram: '130 g', nazev: 'Vepřový plátek na černém pivu, bramboráčky', cena: '150' },
      { gram: '350 g', nazev: 'Halušky se zelím a uzeným masem', cena: '130' },
      { gram: '130 g', nazev: 'Krkonošský guláš, houskové knedlíky', cena: '140' },
      { gram: '350 g', nazev: 'Čínské nudle s kuřecím masem a zeleninou', cena: '130' },
      { gram: '130 g', nazev: 'Ďábelská vepřová játra, rýže', cena: '125' }
    ]
  },
  st: {
    polevky: [
      { gram: '0,4 l', nazev: 'Dršťková', cena: '35' }
    ],
    jidla: [
      { gram: '130 g', nazev: 'Kuřecí medailonky na kari, hranolky, obloha', cena: '150' },
      { gram: '130 g', nazev: 'Hovězí pečeně na houbách, rýže / houskové knedlíky', cena: '140' },
      { gram: '130 g', nazev: 'Vepřové výpečky, houskové knedlíky, zelí', cena: '130' },
      { gram: '130 g', nazev: 'Segedínský guláš, houskové knedlíky', cena: '130' },
      { gram: '130 g', nazev: 'Dušená vepřová kýta, karotka na másle, brambory', cena: '140' },
      { gram: '130 g', nazev: 'Čevapčiči, brambory, cibulka, hořčice, tatarská omáčka', cena: '140' }
    ]
  },
  ct: {
    polevky: [
      { gram: '0,4 l', nazev: 'Gulášová', cena: '35' }
    ],
    jidla: [
      { gram: '550 g', nazev: 'Pečená kachna, bramborové knedlíky, červené zelí', cena: '165' },
      { gram: '130 g', nazev: 'Svratecký guláš, houskové knedlíky', cena: '150' },
      { gram: '130 g', nazev: 'Vepřové výpečky, houskové knedlíky, zelí', cena: '130' },
      { gram: '130 g', nazev: 'Svíčková na smetaně, houskové knedlíky, citron, brusinky, šlehačka', cena: '150' },
      { gram: '270 g', nazev: 'Kuřecí stehno po španělsku, brambory, okurka', cena: '135' },
      { gram: '130 g', nazev: 'Zeleninové lečo s klobásou, brambory', cena: '125' }
    ]
  },
  pa: {
    polevky: [
      { gram: '0,4 l', nazev: 'Boršč', cena: '40' }
    ],
    jidla: [
      { gram: '130 g', nazev: 'Kuřecí prso plněné anglickou slaninou a sušenými rajčaty, hranolky, tatarská omáčka', cena: '150' },
      { gram: '130 g', nazev: 'Smažený vepřový řízek, bramborový salát', cena: '140' },
      { gram: '130 g', nazev: 'Pečená krkovička, houskové knedlíky, zelí', cena: '130' },
      { gram: '130 g', nazev: 'Hovězí zadní vařené, rajská omáčka, těstoviny', cena: '140' },
      { gram: '130 g', nazev: 'Smažený karbanátek, brambory, okurka', cena: '140' }
    ]
  }
};

const DAY_KEYS = ['po', 'ut', 'st', 'ct', 'pa'];
const DAY_DATES = {
  po: '11.5.', ut: '12.5.', st: '13.5.', ct: '14.5.', pa: '15.5.'
};

function loadData(day) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + day);
    return raw ? JSON.parse(raw) : DEFAULT_MENU[day];
  } catch (e) {
    return DEFAULT_MENU[day];
  }
}

function loadAlert() {
  try {
    return localStorage.getItem(STORAGE_KEY_PREFIX + 'oznameni') ||
      'Pro velký zájem opět spouštíme rozvoz obědů na zavolání po Chrudimi a blízkém okolí!!! Objednávky na tel. 723&nbsp;671&nbsp;487 přijímáme od 7:00 do 9:30 hod.';
  } catch (e) {
    return '';
  }
}

function buildMenuDay(day) {
  const data = loadData(day);
  const container = document.getElementById('day-' + day);
  if (!container) return;

  let html = '';

  if (data.polevky && data.polevky.length) {
    html += '<div class="menu-section-label">Polévky</div>';
    data.polevky.forEach(p => {
      if (!p.nazev) return;
      html += `<div class="menu-item">
        <div>
          <div class="menu-item-name">${escHtml(p.nazev)}</div>
          ${p.gram ? `<div class="menu-item-weight">${escHtml(p.gram)}</div>` : ''}
        </div>
        ${p.cena ? `<div class="menu-item-price">${escHtml(p.cena)} Kč</div>` : '<div></div>'}
      </div>`;
    });
  }

  if (data.jidla && data.jidla.length) {
    html += '<div class="menu-section-label">Hotová jídla</div>';
    data.jidla.forEach(j => {
      if (!j.nazev) return;
      html += `<div class="menu-item">
        <div>
          <div class="menu-item-name">${escHtml(j.nazev)}</div>
          ${j.gram ? `<div class="menu-item-weight">${escHtml(j.gram)}</div>` : ''}
        </div>
        ${j.cena ? `<div class="menu-item-price">${escHtml(j.cena)} Kč</div>` : '<div></div>'}
      </div>`;
    });
  }

  html += '<div class="menu-note">Změny jídel vyhrazeny</div>';
  container.innerHTML = html;
}

function buildAllMenuDays() {
  DAY_KEYS.forEach(day => buildMenuDay(day));
}

function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (el) el.classList.add('active');
}

function showDay(id, el) {
  document.querySelectorAll('.menu-day').forEach(d => d.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
  const day = document.getElementById('day-' + id);
  if (day) day.classList.add('active');
  if (el) el.classList.add('active');
}

function toggleDelivery(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.delivery-card').forEach(c => {
    c.classList.remove('open');
    const t = c.querySelector('.delivery-toggle');
    if (t) t.textContent = 'Více info ▼';
  });
  if (!isOpen) {
    card.classList.add('open');
    const t = card.querySelector('.delivery-toggle');
    if (t) t.textContent = 'Méně info ▲';
  }
}

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function initAlert() {
  const alertText = document.getElementById('alert-text');
  if (alertText) {
    alertText.innerHTML = loadAlert();
  }
}

function updateMenuTabDates() {
  const labels = { po: 'Pondělí', ut: 'Úterý', st: 'Středa', ct: 'Čtvrtek', pa: 'Pátek' };
  const dayOffsets = { po: 1, ut: 2, st: 3, ct: 4, pa: 5 };

  const now = new Date();
  const dow = now.getDay();
  const diffToMon = (dow === 0) ? -6 : 1 - dow;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMon);

  DAY_KEYS.forEach(day => {
    const tab = document.querySelector(`.menu-tab[data-day="${day}"]`);
    if (!tab) return;
    const d = new Date(monday);
    d.setDate(monday.getDate() + dayOffsets[day] - 1);
    const dd = d.getDate();
    const mm = d.getMonth() + 1;
    tab.textContent = labels[day] + ' ' + dd + '.' + mm + '.';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAlert();
  buildAllMenuDays();
  updateMenuTabDates();
});
