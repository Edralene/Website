(() => {
  const catalogCards = [...document.querySelectorAll('.catalog-section .product-card')];
  const filterButtons = [...document.querySelectorAll('.filter-pills [data-filter]')];
  const searchInput = document.querySelector('#siteSearch');
  let activeFilter = 'new';

  const applyFilters = () => {
    const query = (searchInput?.value || '').trim().toLowerCase();
    catalogCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const matchesFilter = categories.includes(activeFilter);
      const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
      card.classList.toggle('is-hidden', !(matchesFilter && matchesSearch));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle('selected', isSelected);
        item.setAttribute('aria-pressed', String(isSelected));
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
      dailyItems.scrollBy({ left: direction * Math.min(360, dailyItems.clientWidth * .85), behavior: 'smooth' });
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
    newsletterMessage.textContent = 'Thank you! Your 25% welcome offer is on its way.';
    newsletter.reset();
  });

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  let toastTimer;
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  };

  document.querySelectorAll('[data-order]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const name = link.closest('.product-card')?.querySelector('h3')?.textContent.trim() || 'this item';
      showToast(`${name} was added to your order list.`);
    });
  });
})();
