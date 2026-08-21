# Import a scan into Sanity

## Step 1 — Convert JSON to NDJSON

```bash
node scripts/json-to-ndjson.mjs <input.json> <output.ndjson>
```

**Example:**

```bash
node scripts/json-to-ndjson.mjs scripts/studiewinkel-scan.json scripts/studiewinkel-scan.ndjson
```

The script normalizes field names (including `notes` → `notesAndDiagnosis`) and
enum values so the document matches the v2 `prospectScan` schema.
The output is one JSON line per document (NDJSON format), with a stable
document ID based on `slug.current` so re-imports do not create a duplicate scan
for the same slug.

---

## Step 2 — Import NDJSON into Sanity

```bash
npx sanity dataset import <output.ndjson> production
```

**Example:**

```bash
npx sanity dataset import scripts/studiewinkel-scan.ndjson production
```

Run this command from the project root. If a document with the same
`_id` already exists, Sanity will ask what to do (overwrite / skip /
merge) — choose `prefer new` to overwrite.

---

## Alternative — import directly via the API (no NDJSON step)

```bash
SANITY_API_TOKEN=<token> node scripts/import-scan.mjs <input.json>
```

This script writes the document directly via the Sanity client with
`createOrReplace` and prints the Studio link and frontend URL after import.
