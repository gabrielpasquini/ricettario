#!/usr/bin/env python3
"""Controlla le pagine delle ricette. Uso: python3 verifica.py
Verifica: tabella ben formata (rowspan/colspan), colonne numerate, stile e script
collegati, ricetta presente in index.html, fonte indicata."""
import glob, sys
from html.parser import HTMLParser

class Tabella(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_ric = False; self.depth = 0
        self.righe = []; self.riga = None; self.cella = None
        self.th_testi = []
    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == 'table' and 'ric' in (a.get('class') or '').split():
            self.in_ric = True
        if not self.in_ric: return
        if tag == 'tr': self.riga = []
        elif tag in ('td', 'th') and self.riga is not None:
            self.cella = {'tag': tag, 'cls': a.get('class') or '',
                          'rs': int(a.get('rowspan', 1)), 'cs': int(a.get('colspan', 1)), 'txt': ''}
    def handle_data(self, d):
        if self.cella is not None: self.cella['txt'] += d
    def handle_endtag(self, tag):
        if not self.in_ric: return
        if tag in ('td', 'th') and self.cella is not None:
            self.riga.append(self.cella); self.cella = None
        elif tag == 'tr' and self.riga is not None:
            self.righe.append(self.riga); self.riga = None
        elif tag == 'table': self.in_ric = False

def controlla(f, indice):
    err = []
    s = open(f, encoding='utf-8').read()
    if 'href="style.css"' not in s: err.append('manca <link rel="stylesheet" href="style.css">')
    if f != 'come-leggere.html':
        if 'src="scala.js"' not in s: err.append('manca <script src="scala.js">')
        if f not in indice: err.append('non è collegata in index.html')
        if 'Fonte' not in s: err.append('manca la fonte ("Fonte: ...")')
        if 'class="q"' not in s: err.append('nessuna dose in <span class="q"> (il selettore dosi non funziona)')
    p = Tabella(); p.feed(s)
    if not p.righe: return err + ['nessuna <table class="ric"> trovata']
    intest = p.righe[0]
    ncol = sum(c['cs'] for c in intest)
    num = [c['txt'].strip()[:1] for c in intest[1:]]
    if [n for n in num if not n.isdigit()]: err.append('colonne di intestazione non numerate')
    occ = {}
    for r, riga in enumerate(p.righe):
        col = 0
        for c in riga:
            while occ.get((r, col)): col += 1
            for dr in range(c['rs']):
                for dc in range(c['cs']):
                    if (r + dr, col + dc) in occ:
                        err.append(f'riga {r}: cella sovrapposta alla colonna {col + dc}')
                    occ[(r + dr, col + dc)] = 1
            if r + c['rs'] > len(p.righe):
                err.append(f'riga {r}: rowspan={c["rs"]} esce dalla tabella')
            col += c['cs']
        if col > ncol: err.append(f'riga {r}: {col} colonne invece di {ncol}')
    for r in range(len(p.righe)):
        vuote = [c for c in range(ncol) if (r, c) not in occ]
        if vuote: err.append(f'riga {r}: colonne {vuote} non coperte (manca una cella o un rowspan)')
    return err

indice = open('index.html', encoding='utf-8').read()
ok = True
for f in sorted(glob.glob('*.html')):
    if f == 'index.html': continue
    e = controlla(f, indice)
    print(('✅ ' if not e else '❌ ') + f)
    for x in e: print('    -', x)
    ok &= not e
sys.exit(0 if ok else 1)
