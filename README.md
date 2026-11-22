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

## Aggiungere una ricetta

1. Copia una ricetta esistente e rinominala (`nome-ricetta.html`).
2. Tieni `<link rel="stylesheet" href="style.css">` nell'`<head>` e `<script src="scala.js"></script>` prima di `</body>`.
3. Se la tabella è molto larga, aggiungi solo l'override nella pagina, per esempio `<style>table.ric{min-width:1200px}</style>`.
4. Nella colonna ingredienti metti la dose in `<span class="q">`: è quella che il selettore ricalcola. Per altri numeri da ricalcolare usa `class="sc"`.
5. Aggiungi il link in `index.html`.

## Convenzioni

- Dosi **in grammi** quando possibile; cucchiaini tra parentesi.
- Etichette: ⏰ tempo, 🌡️ temperatura, ✅ pronto quando…, ⚠️ attenzione, 👅 assaggia e aggiusta (ricette salate).
- Ogni passo del procedimento ha un **Perché**.
- Indicare sempre la fonte e cosa è stato aggiunto rispetto alla fonte.
