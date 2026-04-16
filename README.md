# Venetsanos Restaurant – QR Menu Site

A mobile-first, bilingual (Greek ???? / English ????) digital menu designed to be accessed via QR code.

---

## ?? Files

| File | Purpose |
|---|---|
| `menu.html` | The full menu page (open this in a browser) |
| `style.css` | All styling (mobile-first, keep in same folder) |
| `generate_qr.py` | Python script to generate a QR code image locally |

---

## ?? Step 1 – Host the Site on GitHub Pages (Free)

> Your repo is already on GitHub at https://github.com/anve96/restaurant-site

1. Go to your repo on GitHub: **https://github.com/anve96/restaurant-site**
2. Click **Settings** (top tab)
3. In the left sidebar, click **Pages**
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**
5. Wait ~1 minute — GitHub will show you your live URL:

The URL will be: https://anve96.github.io/restaurant-site/menu.html

That URL is the one you encode into your QR code!

---

## ?? Step 2 – Generate the QR Code

### Option A – Online (easiest)
1. Go to **https://goqr.me** or **https://qr-code-generator.com**
2. Paste your URL: https://anve96.github.io/restaurant-site/menu.html
3. Download the QR image (PNG or SVG)
4. Print it on table cards, menus, or a sign

### Option B – Generate locally with Python

Run the script included in this repo:

    pip install qrcode[pil]
    python generate_qr.py

This will create a file called `menu_qr.png` in the project folder.

---

## ?? Updating the Menu

1. Edit `menu.html` (change prices, add/remove dishes)
2. Commit and push to GitHub:

    git add menu.html
    git commit -m "Update menu prices"
    git push

The live page updates automatically — your QR code stays the same!

---

## ?? Security Notes

- The site is **static HTML** — no database, no login, no user data collected
- GitHub Pages serves over **HTTPS** automatically
- Never put private info (passwords, keys) in these files

---

## ?? Contact Info

Update the phone number and footer in `menu.html` before going live.
