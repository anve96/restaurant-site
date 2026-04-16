// =============================================
// Navigation - hamburger menu
// =============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Mark active nav link based on current page
(function markActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// =============================================
// Menu page - category tabs
// =============================================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuCategories = document.querySelectorAll('.menu-category');

if (menuTabs.length > 0) {
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      menuCategories.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// =============================================
// Reservation form submission
// =============================================
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = this.querySelector('#res-name').value.trim();
    const email = this.querySelector('#res-email').value.trim();
    const date = this.querySelector('#res-date').value;
    const time = this.querySelector('#res-time').value;
    const guests = this.querySelector('#res-guests').value;

    if (!name || !email || !date || !time || !guests) {
      alert('Please fill in all required fields.');
      return;
    }

    // Show success message
    this.style.display = 'none';
    const successMsg = document.getElementById('reservationSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.querySelector('.booking-ref').textContent =
        'REF-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
  });
}

// =============================================
// Pre-order page - quantity controls & form
// =============================================
const menuPrices = {};

function updateOrderSummary() {
  const summaryItems = document.getElementById('summaryItems');
  const orderTotal = document.getElementById('orderTotal');
  if (!summaryItems || !orderTotal) return;

  let lines = [];
  let total = 0;

  document.querySelectorAll('.order-item').forEach(item => {
    const qty = parseInt(item.querySelector('.qty-display').textContent, 10);
    if (qty > 0) {
      const name = item.querySelector('.order-item-info h4').textContent;
      const priceText = item.querySelector('.order-item-price').textContent;
      const price = parseFloat(priceText.replace('$', ''));
      lines.push(`${name} × ${qty}`);
      total += price * qty;
    }
  });

  summaryItems.textContent = lines.length > 0 ? lines.join(', ') : 'No items selected yet.';
  orderTotal.textContent = 'Total: $' + total.toFixed(2);
}

document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const display = btn.parentElement.querySelector('.qty-display');
    let qty = parseInt(display.textContent, 10);

    if (btn.classList.contains('minus')) {
      qty = Math.max(0, qty - 1);
    } else {
      qty = Math.min(99, qty + 1);
    }

    display.textContent = qty;
    updateOrderSummary();
  });
});

// Pre-order form submission
const preorderForm = document.getElementById('preorderForm');
if (preorderForm) {
  preorderForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('#po-name').value.trim();
    const phone = this.querySelector('#po-phone').value.trim();
    const pickup = this.querySelector('#po-pickup').value;

    if (!name || !phone || !pickup) {
      alert('Please fill in all required fields.');
      return;
    }

    // Check at least one item selected
    let hasItems = false;
    document.querySelectorAll('.qty-display').forEach(display => {
      if (parseInt(display.textContent, 10) > 0) hasItems = true;
    });

    if (!hasItems) {
      alert('Please select at least one item to pre-order.');
      return;
    }

    this.style.display = 'none';
    const successMsg = document.getElementById('preorderSuccess');
    if (successMsg) {
      successMsg.style.display = 'block';
      successMsg.querySelector('.order-ref').textContent =
        'ORD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
  });
}

// Set min date for reservation and pickup to today
(function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  ['res-date', 'po-pickup'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('min', today);
  });
})();
