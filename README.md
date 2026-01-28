# fintech-game

Frontend-only credit operations game built with Vite + React + TypeScript.

## Current prototype

- Sample loans with individual APRs, installment schedules, and risk profiles.
- Receivables forecast table shows expected cashflow by month.
- Loan cards show next due dates and remaining balances.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The Vite base path is set to `./`. Deploy the `dist/` folder to GitHub Pages
(via Actions or the Pages UI) and it will work from a subpath.

## Project structure

- `src/game/*` domain model and calculations
- `src/components/*` UI building blocks
- `src/game/sampleState.ts` starter data for the UI
