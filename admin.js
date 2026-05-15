const STORAGE_KEY_PREFIX = 'bufeteva_';

const DAYS = {
  po: { label: 'Pondělí', datum: '11.5.2026' },
  ut: { label: 'Úterý',   datum: '12.5.2026' },
  st: { label: 'Středa',  datum: '13.5.2026' },
  ct: { label: 'Čtvrtek', datum: '14.5.2026' },
  pa: { label: 'Pátek',   datum: '15.5.2026' }
};

const DEFAULT_DATA = {
  po: {
    polevky: [{ gram: '0,4 l', nazev: 'Kapustová s uzeným masem', cena: '35' }],
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
    polevky: [{ gram: '0,4 l', nazev: 'Gulášová', cena: '30' }],
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
    polevky: [{ gram: '0,4 l', nazev: 'Dršťková', cena: '35' }],
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
    polevky: [{ gram: '0,4 l', nazev: 'Gulášová', cena: '35' }],
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
    polevky: [{ gram: '0,4 l', nazev: 'Boršč', cena: '40' }],
    jidla: [
      { gram: '130 g', nazev: 'Kuřecí prso plněné anglickou slaninou a sušenými rajčaty, hranolky, tatarská omáčka', cena: '150' },
      { gram: '130 g', nazev: 'Smažený vepřový řízek, bramborový salát', cena: '140' },
      { gram: '130 g', nazev: 'Pečená krkovička, houskové knedlíky, zelí', cena: '130' },
      { gram: '130 g', nazev: 'Hovězí zadní vařené, rajská omáčka, těstoviny', cena: '140' },
      { gram: '130 g', nazev: 'Smažený karbanátek, brambory, okurka', cena: '140' }
    ]
  }
};

function getData(day) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + day);
    return raw ? JSON.parse(raw) : DEFAULT_DATA[day];
  } catch (e) {
    return DEFAULT_DATA[day];
  }
}

function setData(day, data) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + day, JSON.stringify(data));
  } catch (e) {
    console.error('localStorage error:', e);
  }
}

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRows(type, day, items) {
  const container = document.getElementById(type + '-' + day);
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'item-row';
    row.dataset.idx = i;
    row.innerHTML = `
      <input type="text" placeholder="130 g" value="${escHtml(item.gram)}" data-field="gram">
      <input type="text" placeholder="Název jídla..." value="${escHtml(item.nazev)}" data-field="nazev">
      <input type="text" placeholder="0" value="${escHtml(item.cena)}" data-field="cena">
      <button class="btn-remove" onclick="removeRow('${type}','${day}',${i})" aria-label="Odstranit řádek">
        <i class="ti ti-x" aria-hidden="true"></i>
      </button>
    `;
    container.appendChild(row);
  });
}

function collectData(day) {
  const collect = (type) => {
    const rows = document.querySelectorAll('#' + type + '-' + day + ' .item-row');
    return Array.from(rows).map(row => ({
      gram:  row.querySelector('[data-field="gram"]').value.trim(),
      nazev: row.querySelector('[data-field="nazev"]').value.trim(),
      cena:  row.querySelector('[data-field="cena"]').value.trim()
    }));
  };
  return {
    polevky: collect('polevky'),
    jidla:   collect('jidla')
  };
}

function addRow(type, day) {
  const data = collectData(day);
  data[type].push({ gram: '130 g', nazev: '', cena: '' });
  renderRows(type, day, data[type]);
  const rows = document.querySelectorAll('#' + type + '-' + day + ' .item-row');
  const last = rows[rows.length - 1];
  if (last) last.querySelector('[data-field="nazev"]').focus();
}

function removeRow(type, day, idx) {
  const data = collectData(day);
  data[type].splice(idx, 1);
  renderRows(type, day, data[type]);
}

function saveDatum(day) {
  const input = document.getElementById('datum-' + day);
  if (!input) return;
  try { localStorage.setItem(STORAGE_KEY_PREFIX + 'datum_' + day, input.value.trim()); } catch(e) {}
}

function loadDatum(day) {
  try { return localStorage.getItem(STORAGE_KEY_PREFIX + 'datum_' + day) || ''; } catch(e) { return ''; }
}

function saveDay(day) {
  saveDatum(day);
  const data = collectData(day);
  setData(day, data);
  showToast('toast-' + day);
}

function saveOznameni() {
  const val = document.getElementById('ozn-text').value;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + 'oznameni', val);
  } catch (e) {}
  showToast('toast-oznameni');
}

function showToast(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2500);
}

function togglePreview(day) {
  const box = document.getElementById('preview-' + day);
  if (!box) return;
  const isShowing = box.classList.contains('show');
  box.classList.toggle('show');
  const btn = document.getElementById('btn-preview-' + day);
  if (btn) btn.innerHTML = isShowing
    ? '<i class="ti ti-eye" aria-hidden="true"></i> Náhled'
    : '<i class="ti ti-eye-off" aria-hidden="true"></i> Skrýt náhled';
  if (!isShowing) renderPreview(day);
}

function renderPreview(day) {
  const data = collectData(day);
  const d = DAYS[day];
  const container = document.getElementById('prevcontent-' + day);
  if (!container) return;

  let html = '';

  if (data.polevky.length) {
    html += '<div class="prev-section">Polévky</div>';
    data.polevky.forEach(p => {
      if (!p.nazev) return;
      html += `<div class="prev-item">
        <div class="prev-item-left">
          <span>${escHtml(p.nazev)}</span>
          ${p.gram ? `<span class="prev-gram">${escHtml(p.gram)}</span>` : ''}
        </div>
        ${p.cena ? `<span class="prev-price">${escHtml(p.cena)} Kč</span>` : ''}
      </div>`;
    });
  }

  if (data.jidla.length) {
    html += '<div class="prev-section">Hotová jídla</div>';
    data.jidla.forEach(j => {
      if (!j.nazev) return;
      html += `<div class="prev-item">
        <div class="prev-item-left">
          <span>${escHtml(j.nazev)}</span>
          ${j.gram ? `<span class="prev-gram">${escHtml(j.gram)}</span>` : ''}
        </div>
        ${j.cena ? `<span class="prev-price">${escHtml(j.cena)} Kč</span>` : ''}
      </div>`;
    });
  }

  if (!html) html = '<p style="font-size:13px;color:var(--text-muted)">Žádná jídla k zobrazení.</p>';
  container.innerHTML = html;
}

function admTab(day, el) {
  document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.adm-page').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const page = document.getElementById('adm-' + day);
  if (page) page.classList.add('active');
}

function buildDayPage(day) {
  const el = document.getElementById('adm-' + day);
  if (!el) return;
  const data = getData(day);
  const d = DAYS[day];

  const savedDatum = loadDatum(day);
  el.innerHTML = `
    <div class="day-header" style="display:flex;align-items:center;justify-content:space-between;gap:1rem">
      <div>
        <h2>${d.label}</h2>
        <p style="font-size:12px;color:var(--text-muted)">Datum v záložce na webu</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <input id="datum-${day}" type="text" placeholder="např. 11.5." value="${savedDatum}" style="width:90px;padding:0.4rem 0.6rem;font-size:13px;border:0.5px solid var(--border);border-radius:var(--radius-md);font-family:inherit;color:var(--text-body);background:var(--white)" />
      </div>
    </div>

    <div class="adm-section-label">Polévky</div>
    <div class="col-headers">
      <span class="col-h">Množství</span>
      <span class="col-h">Název</span>
      <span class="col-h">Cena (Kč)</span>
      <span></span>
    </div>
    <div id="polevky-${day}"></div>
    <button class="btn-add" onclick="addRow('polevky','${day}')">
      <i class="ti ti-plus" aria-hidden="true"></i> Přidat polévku
    </button>

    <div class="adm-section-label">Hotová jídla</div>
    <div class="col-headers">
      <span class="col-h">Množství</span>
      <span class="col-h">Název</span>
      <span class="col-h">Cena (Kč)</span>
      <span></span>
    </div>
    <div id="jidla-${day}"></div>
    <button class="btn-add" onclick="addRow('jidla','${day}')">
      <i class="ti ti-plus" aria-hidden="true"></i> Přidat jídlo
    </button>

    <div class="adm-footer-bar">
      <div class="toast" id="toast-${day}">
        <i class="ti ti-check" aria-hidden="true"></i> Uloženo!
      </div>
      <div class="adm-footer-bar-buttons">
        <button class="btn-secondary" id="btn-preview-${day}" onclick="togglePreview('${day}')">
          <i class="ti ti-eye" aria-hidden="true"></i> Náhled
        </button>
        <button class="btn-save" onclick="saveDay('${day}')">
          <i class="ti ti-device-floppy" aria-hidden="true"></i> Uložit
        </button>
      </div>
    </div>

    <div class="preview-box" id="preview-${day}">
      <div class="preview-header">
        <i class="ti ti-eye" aria-hidden="true"></i>
        Náhled — ${d.label} ${d.datum}
      </div>
      <div class="preview-content" id="prevcontent-${day}"></div>
    </div>
  `;

  renderRows('polevky', day, data.polevky);
  renderRows('jidla', day, data.jidla);
}

function initOznameni() {
  const ta = document.getElementById('ozn-text');
  if (!ta) return;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PREFIX + 'oznameni');
    if (saved) ta.value = saved;
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(DAYS).forEach(day => buildDayPage(day));
  initOznameni();
});
