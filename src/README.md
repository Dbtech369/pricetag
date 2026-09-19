# PriceTag MVP

Lean sellable consumer app — barcode/photo scan, SQLite price log, history chart, drop alert, nearby comparison.

## Run

```bash
npm install
npx expo start
```

## Structure
- src/App.js — entry
- src/components/Scan.js — barcode/photo scan
- src/components/HistoryChart.js — bar chart
- src/lib/db.js — SQLite schema + queries
- src/lib/alert.js — drop alert logic
- src/lib/nearby.js — nearby price comparison

Built to sell. No production deploy.
