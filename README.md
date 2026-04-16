# Venetsanos Restaurant - React QR Menu Site

A bilingual restaurant menu built with React and Vite. The menu content is loaded from `public/menu.json`, so you can update dishes and prices without touching the React code.

## Project Structure

| File               | Purpose                                           |
| ------------------ | ------------------------------------------------- |
| `public/menu.json` | Menu sections, dishes, prices, text, badges       |
| `src/App.jsx`      | Renders the menu from the JSON file               |
| `src/styles.css`   | Styling for the menu page                         |
| `public/menu.html` | Redirect so old QR links still work               |
| `generate_qr.py`   | Python script to generate a QR code image locally |

## Local Development

Install dependencies:

```powershell
npm install
```

Start the dev server:

```powershell
npm run dev
```

Open the local URL shown in the terminal. Vite usually runs at `http://localhost:5173/restaurant-site/`.

## Updating Menu Items

Edit only `public/menu.json`.

Each section has this shape:

- `id`: anchor used in navigation
- `title`: Greek and English section name
- `items`: dish list

Each dish supports:

- `name`
- `description`
- `allergens`
- `price`
- `badge` (optional)

Example item:

```json
{
  "id": "tzatziki",
  "name": {
    "el": "Τζατζίκι",
    "en": "Tzatziki"
  },
  "description": {
    "el": "Γιαούρτι, αγγούρι, σκόρδο & φρέσκο άνηθο",
    "en": "Yogurt, cucumber, garlic & fresh dill"
  },
  "price": "€4.50"
}
```

## Production Build

Create the deployable site:

```powershell
npm run build
```

The output is generated in `dist/`.

## GitHub Pages

This project is configured for GitHub Pages with base path `/restaurant-site/`.

After building, deploy the contents of `dist/` through GitHub Pages or a Pages workflow. The old QR path `menu.html` still works because `public/menu.html` redirects to the React app.

The live URL should be:

`https://anve96.github.io/restaurant-site/menu.html`

## QR Code

Online option:

1. Go to `https://goqr.me` or `https://qr-code-generator.com`
2. Paste `https://anve96.github.io/restaurant-site/menu.html`
3. Download and print the QR code

Local option:

```powershell
pip install qrcode[pil]
python generate_qr.py
```
