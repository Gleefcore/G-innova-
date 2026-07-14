(() => {
  document.documentElement.classList.add('js');

  const navToggle = document.querySelector('.nav-toggle');
  const navigation = document.querySelector('.nav-links');

  const closeNavigation = () => {
    if (!navToggle || !navigation) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    document.body.classList.remove('nav-open');
  };

  if (navToggle && navigation) {
    navToggle.addEventListener('click', () => {
      const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navigation.classList.toggle('open', willOpen);
      document.body.classList.toggle('nav-open', willOpen);
    });
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNavigation();
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const form = document.querySelector('#order-form');
  if (!form) return;

  const serviceSelect = document.querySelector('#order-service');
  const status = document.querySelector('#form-status');
  const serviceNames = {
    graphisme: 'Conception graphique',
    web: 'Conception de site web',
    outils: "Conception d'un outil informatique",
    formation: 'Formation en entrepreneuriat'
  };

  const setService = (service) => {
    if (!serviceSelect || !serviceNames[service]) return;
    serviceSelect.value = service;
    serviceSelect.closest('label')?.classList.remove('field-error');
  };

  const requestedService = new URLSearchParams(window.location.search).get('service');
  setService(requestedService);

  document.querySelectorAll('[data-order-service]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      setService(trigger.dataset.orderService);
      window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), 500);
    });
  });

  const fields = {
    lastname: document.querySelector('#order-lastname'),
    firstname: document.querySelector('#order-firstname'),
    business: document.querySelector('#order-business'),
    service: serviceSelect,
    details: document.querySelector('#order-details'),
    deadline: document.querySelector('#order-deadline'),
    budget: document.querySelector('#order-budget')
  };

  const clean = (value) => String(value || '').trim();

  const validate = () => {
    const required = [fields.lastname, fields.firstname, fields.service, fields.details];
    let firstInvalid = null;
    required.forEach((field) => {
      const invalid = !clean(field?.value);
      field?.closest('label')?.classList.toggle('field-error', invalid);
      if (invalid && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) {
      status.textContent = 'Veuillez compléter les champs obligatoires indiqués par un astérisque.';
      firstInvalid.focus();
      return false;
    }
    status.textContent = '';
    return true;
  };

  Object.values(fields).forEach((field) => {
    field?.addEventListener('input', () => field.closest('label')?.classList.remove('field-error'));
    field?.addEventListener('change', () => field.closest('label')?.classList.remove('field-error'));
  });

  const buildMessage = () => {
    const serviceLabel = serviceNames[fields.service.value] || fields.service.value;
    const lines = [
      'Bonjour G-INNOVA,',
      '',
      'Je souhaite demander une consultation pour une commande.',
      '',
      `Nom : ${clean(fields.lastname.value)}`,
      `Prénom : ${clean(fields.firstname.value)}`,
      `Entreprise / activité : ${clean(fields.business.value) || 'Non précisée'}`,
      `Service souhaité : ${serviceLabel}`,
      '',
      'Détail de la commande :',
      clean(fields.details.value),
      '',
      `Délai souhaité : ${clean(fields.deadline.value) || 'À définir'}`,
      `Budget indicatif : ${clean(fields.budget.value) || 'À définir après consultation'}`,
      '',
      'Merci de m’indiquer les informations complémentaires nécessaires, les livrables possibles, le délai et le prix.'
    ];
    return { text: lines.join('\n'), serviceLabel };
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate()) return;
    const { text } = buildMessage();
    const url = `https://wa.me/237672356441?text=${encodeURIComponent(text)}`;
    const opened = window.open(url, '_blank');
    if (opened) opened.opener = null;
  });

  document.querySelector('#send-email')?.addEventListener('click', () => {
    if (!validate()) return;
    const { text, serviceLabel } = buildMessage();
    const subject = `Demande de consultation — ${serviceLabel} — ${clean(fields.firstname.value)} ${clean(fields.lastname.value)}`;
    window.location.href = `mailto:gweteugene05@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  });
})();
