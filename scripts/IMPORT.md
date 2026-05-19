# Scan importeren naar Sanity

## Stap 1 — JSON omzetten naar NDJSON

```bash
node scripts/json-to-ndjson.mjs <input.json> <output.ndjson>
```

**Voorbeeld:**

```bash
node scripts/json-to-ndjson.mjs scripts/studiewinkel-scan.json scripts/studiewinkel-scan.ndjson
```

Het script normaliseert veldnamen (o.a. `notes` → `notesAndDiagnosis`) en
enum-waarden zodat het document voldoet aan de v2 schema van `prospectScan`.
De uitvoer is één JSON-regel per document (NDJSON-formaat).

---

## Stap 2 — NDJSON importeren in Sanity

```bash
npx sanity dataset import <output.ndjson> production
```

**Voorbeeld:**

```bash
npx sanity dataset import scripts/studiewinkel-scan.ndjson production
```

Voer dit commando uit vanuit de root van het project. Bij een bestaand
document met hetzelfde `_id` vraagt Sanity wat te doen (overwrite / skip /
merge) — kies `prefer new` om te overschrijven.

---

## Alternatief — direct via de API (zonder NDJSON tussenstap)

```bash
SANITY_API_TOKEN=<token> node scripts/import-scan.mjs <input.json>
```

Dit script schrijft het document rechtstreeks via de Sanity client en
print de Studio-link en frontend-URL na import.
