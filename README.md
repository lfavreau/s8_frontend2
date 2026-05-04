# Recetas PFY2202

Archivos complementarios para una app React + Vite de recetas.

## Instalación base

```bash
npm create vite@latest recetas-pfy2202 -- --template react
cd recetas-pfy2202
npm install
npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom msw whatwg-fetch cypress eslint
```

## Copia de archivos

Copia el contenido de este ZIP sobre la carpeta creada por Vite.

## Scripts sugeridos para package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest",
    "coverage": "jest --coverage",
    "lint": "eslint src",
    "e2e": "cypress open",
    "e2e:run": "cypress run"
  }
}
```

## Comandos

```bash
npm run dev
npm run test
npm run coverage
npm run lint
npm run e2e
```
