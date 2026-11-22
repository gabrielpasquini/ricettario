# Ricettario

Ricette in formato **tabella**: ingredienti a sinistra, azioni a destra, si legge da sinistra verso destra come una linea del tempo. Ogni colore è un gruppo di ingredienti (una ciotola).

👉 Prima di tutto leggi [come si leggono le tabelle](come-leggere.html), poi apri l'[indice](index.html).

## Struttura

| File | Cosa contiene |
|---|---|
| `index.html` | Elenco delle ricette con ricerca |
| `come-leggere.html` | Guida al formato (regole, colori, etichette) |
| `*.html` | Una pagina per ricetta |
| `style.css` | Stile comune a tutte le pagine |
| `scala.js` | Selettore delle dosi (×½, ×1, ×1,5, ×2, ×3) |
| `verifica.py` | Controllo automatico delle pagine |
| `CLAUDE.md` | Istruzioni per l'AI che aggiunge le ricette |

## Aggiungere una ricetta

Basta dare a un'AI (Claude Code) il **link della ricetta**: segue le istruzioni di [`CLAUDE.md`](CLAUDE.md), crea la pagina, la collega in `index.html` e controlla la tabella con `verifica.py`.

Per controllare a mano tutte le pagine:

```
python3 verifica.py
```

Segnala tabelle rotte (celle sovrapposte o mancanti, `rowspan` sbagliati), pagine senza fonte, senza stile o non collegate nell'indice.

## Convenzioni

- Dosi **in grammi** quando possibile; cucchiaini tra parentesi.
- Etichette: ⏰ tempo, 🌡️ temperatura, ✅ pronto quando…, ⚠️ attenzione, 👅 assaggia e aggiusta (ricette salate).
- Ogni passo del procedimento ha un **Perché**.
- Indicare sempre la fonte e cosa è stato aggiunto rispetto alla fonte.
