# Istruzioni per aggiungere una ricetta

Il proprietario dà un **link a una ricetta** (o un testo) e vuole una nuova pagina nello stesso formato delle altre. Non scrive HTML a mano.

## Procedura
1. Leggi la ricetta dal link. Se la pagina non è leggibile, dillo e chiedi il testo.
2. Leggi `come-leggere.html` (regole del formato) e prendi come modello `tiramisu.html` (dolce a più gruppi) o `crepes-dolci-e-salate.html` (più semplice).
3. Crea `nome-ricetta.html` (minuscolo, trattini, senza accenti). Struttura dell'`<head>` e fine pagina uguali alle altre: `<link rel="stylesheet" href="style.css">` e `<script src="scala.js"></script>` prima di `</body>`. Se la tabella è molto larga, aggiungi solo `<style>table.ric{min-width:...px}</style>`.
4. Aggiungi la ricetta in `index.html` (titolo, sottotitolo con porzioni e tempo).
5. **Esegui `python3 verifica.py`** e correggi finché tutte le pagine hanno ✅. Poi apri la pagina in un browser e guardala, soprattutto la tabella.
6. Fai un branch e una pull request, non modificare `main` direttamente.

## Regole del formato
- Colonna sinistra: ingredienti, uno per riga, nell'ordine d'uso. Dose in `<span class="q">` (serve al selettore dosi), nome subito dopo, dettagli in `<small>`.
- **Dosi in grammi** (ml per i liquidi). Cucchiaini solo tra parentesi, dopo il valore in grammi. Numeri da ricalcolare che non sono dosi: `class="sc"`.
- Colonne = tempo (1 → fine). Ogni riquadro copre le righe degli ingredienti che usa (`rowspan`). Cella vuota = ingrediente che aspetta. Ogni riga deve essere coperta in ogni colonna.
- Un colore per gruppo di ingredienti (una ciotola). La **legenda sopra la tabella** dice cosa significa ogni colore in quella ricetta.
- Etichette: ⏰ tempo, 🌡️ temperatura, ✅ "pronto quando…" (più importante dei minuti), ⚠️ attenzione, 👅 assaggia e aggiusta (solo ricette salate: dove assaggiare e cosa correggere).
- **Passo 0**: forno, attrezzi, cose da tirare fuori o pesare.
- **Procedimento**: stesso numero e colore delle colonne. Ogni passo ha il **Perché**.
- **Note**: conservazione, varianti, errori comuni.
- **Fonte**: link in alto. Indica cosa hai **aggiunto o cambiato** rispetto alla fonte (es. conversioni in grammi, controlli di cottura).

## Cose da non fare
- Non inventare dosi, tempi o temperature che non sono nella fonte: se manca qualcosa, scrivilo nelle note.
- Non copiare il testo della fonte parola per parola: riscrivi i passi in modo breve e diretto.
- Non incollare CSS dentro la pagina: sta in `style.css`.
