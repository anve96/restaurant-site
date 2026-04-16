# generate_qr.py
# Generates a QR code image for the restaurant menu page.
#
# Install dependency first:
#   pip install qrcode[pil]
#
# Then run:
#   python generate_qr.py

import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer

# ── Change this to your live GitHub Pages URL after enabling Pages ──
MENU_URL = "https://anve96.github.io/restaurant-site/menu.html"

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction
    box_size=10,
    border=4,
)
qr.add_data(MENU_URL)
qr.make(fit=True)

img = qr.make_image(
    image_factory=StyledPilImage,
    module_drawer=RoundedModuleDrawer(),
    back_color="white",
    fill_color="#1a1a2e",  # Dark navy to match site branding
)

output_file = "menu_qr.png"
img.save(output_file)
print(f"✅ QR code saved as '{output_file}'")
print(f"   Points to: {MENU_URL}")
print("   Print this on your table cards and menus!")
