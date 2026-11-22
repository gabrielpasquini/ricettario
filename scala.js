/* Selettore dosi: moltiplica le quantità della colonna ingredienti.
   Scala: .q (dosi), .sc (altri numeri da scalare) e il primo numero del primo badge (resa).
   Non scala: tempi, temperature, teglie e testo del procedimento. */
(function () {
  const FR = { '¼': .25, '½': .5, '¾': .75 };
  const SALTA = /pizzico|manciata|q\.b\.|abbondante/i;

  function leggi(intero, fraz) {
    return (intero ? parseFloat(intero.replace(',', '.')) : 0) + (fraz ? FR[fraz] : 0);
  }
  function scrivi(v, unita) {
    const grammi = /^\s*(g|kg|ml|l)\b/.test(unita);
    if (grammi) {
      if (v >= 10) return String(Math.round(v));
      return (Math.round(v * 2) / 2).toString().replace('.', ',');
    }
    // conteggi e cucchiaini: al quarto più vicino
    const q = Math.round(v * 4) / 4, i = Math.floor(q), r = q - i;
    const f = r === .25 ? '¼' : r === .5 ? '½' : r === .75 ? '¾' : '';
    if (!i && !f) return '¼';
    return (i ? i : '') + f;
  }
  // sostituisce i numeri nel testo; soloPrimo = solo il primo numero (o l'intervallo a–b)
  function scala(testo, k, soloPrimo) {
    const re = /\d+(?:[.,]\d+)?[¼½¾]?|[¼½¾]/g;
    let out = '', ultimo = 0, n = 0, m;
    while ((m = re.exec(testo))) {
      const tra = testo.slice(ultimo, m.index);
      if (soloPrimo && n >= 1 && !(n === 1 && /^\s*[–-]\s*$/.test(tra))) break;
      const t = m[0], fraz = /[¼½¾]$/.test(t) ? t.slice(-1) : null;
      const intero = fraz ? t.slice(0, -1) : t;
      const dopo = testo.slice(m.index + t.length);
      out += tra + scrivi(leggi(intero, fraz) * k, dopo);
      ultimo = m.index + t.length; n++;
    }
    // singolare/plurale: "1 cucchiaino", "2 cucchiaini"
    return (out + testo.slice(ultimo)).replace(/(\d+(?:,\d+)?)?([¼½¾])? cucchiain[oi]/g,
      (m, i, f) => m.replace(/cucchiain[oi]/, leggi(i, f) >= 2 ? 'cucchiaini' : 'cucchiaino'));
  }

  const badge = document.querySelector('.badges .badge');
  const celle = Array.from(document.querySelectorAll('td.ing .q, td.ing .sc'))
    .filter(el => !SALTA.test(el.textContent));
  if (!celle.length) return;
  const originali = new Map(celle.map(el => [el, el.textContent]));
  const badgeOrig = badge ? badge.textContent : null;

  const box = document.createElement('div');
  box.className = 'dosi';
  box.innerHTML = '<b>Dosi:</b>';
  [0.5, 1, 1.5, 2, 3].forEach(k => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = '×' + String(k).replace('.', ',');
    b.setAttribute('aria-pressed', k === 1 ? 'true' : 'false');
    b.addEventListener('click', () => applica(k, b));
    box.appendChild(b);
  });
  const avviso = document.createElement('span');
  avviso.className = 'avviso';
  avviso.textContent = '⚠️ Dosi in rosso ricalcolate. Teglia, tempi e quantità scritte nel procedimento restano quelli della dose base.';
  box.appendChild(avviso);
  (document.querySelector('.badges') || document.querySelector('h1')).after(box);

  function applica(k, bottone) {
    box.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === bottone ? 'true' : 'false'));
    box.classList.toggle('scalato', k !== 1);
    originali.forEach((t, el) => {
      el.textContent = k === 1 ? t : scala(t, k, false);
      el.classList.toggle('scalato-q', k !== 1);
    });
    if (badge) badge.textContent = k === 1 ? badgeOrig : scala(badgeOrig, k, true);
  }
})();
