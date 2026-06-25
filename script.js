document.addEventListener('DOMContentLoaded', () => {
  const catalogCards = Array.from(document.querySelectorAll('.catalog-section .product-card'));
  const filterButtons = Array.from(document.querySelectorAll('.filter-pills [data-filter]'));
  const searchInput = document.querySelector('#siteSearch');
  let activeFilter = 'all';

  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();

    catalogCards.forEach((card) => {
      const categories = (card.dataset.category || '').toLowerCase().split(/\s+/);
      const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);
      const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
      card.classList.toggle('is-hidden', !(matchesCategory && matchesSearch));
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';

      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);
  applyFilters();

  const dailyItems = document.querySelector('#dailyItems');
  document.querySelectorAll('[data-scroll]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!dailyItems) return;
      const direction = button.dataset.scroll === 'next' ? 1 : -1;
      dailyItems.scrollBy({
        left: direction * Math.min(360, dailyItems.clientWidth * 0.85),
        behavior: 'smooth'
      });
    });
  });

  const newsletter = document.querySelector('#newsletterForm');
  const newsletterMessage = document.querySelector('#newsletterMessage');
  newsletter?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = newsletter.querySelector('input[type="email"]');

    if (!email.value || !email.checkValidity()) {
      newsletterMessage.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }

    newsletterMessage.textContent = 'Thank you! You are now signed up for fresh meal ideas.';
    newsletter.reset();
  });

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);

  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  document.querySelectorAll('[data-order]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const name = link.closest('.product-card')?.querySelector('h3')?.textContent.trim() || 'This product';
      showToast(`${name}: replace this button with your official product or store link.`);
    });
  });
});
