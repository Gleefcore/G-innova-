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
    if (window.updateDynamicFields) window.updateDynamicFields();
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

  window.updateDynamicFields = () => {
    const service = document.querySelector('#order-service').value;
    document.querySelectorAll('.dynamic-section').forEach(el => el.style.display = 'none');
    if (service === 'web') {
      const el = document.getElementById('dynamic-fields-web');
      if (el) el.style.display = 'block';
    } else if (service === 'graphisme') {
      const el = document.getElementById('dynamic-fields-graphisme');
      if (el) el.style.display = 'block';
    }
  };

  const buildMessage = () => {
    const serviceVal = fields.service.value;
    const serviceLabel = serviceNames[serviceVal] || serviceVal;
    
    let dynamicText = '';
    if (serviceVal === 'web') {
      const webType = document.querySelector('#web-type').options[document.querySelector('#web-type').selectedIndex].text;
      const webPages = clean(document.querySelector('#web-pages').value) || 'Non précisé';
      const webDomain = document.querySelector('#web-domain').options[document.querySelector('#web-domain').selectedIndex].text;
      dynamicText = `\n[Spécifications Web]\nType de site : ${webType}\nNombre de pages estimé : ${webPages}\nNom de domaine : ${webDomain}\n`;
    } else if (serviceVal === 'graphisme') {
      const designType = document.querySelector('#design-type').options[document.querySelector('#design-type').selectedIndex].text;
      const designColors = clean(document.querySelector('#design-colors').value) || 'Non précisé';
      dynamicText = `\n[Spécifications Design]\nSupport principal : ${designType}\nCouleurs préférées : ${designColors}\n`;
    }

    const lines = [
      'Bonjour G-INNOVA,',
      '',
      'Je souhaite demander une consultation pour une commande.',
      '',
      `Nom : ${clean(fields.lastname.value)}`,
      `Prénom : ${clean(fields.firstname.value)}`,
      `Entreprise / activité : ${clean(fields.business.value) || 'Non précisée'}`,
      `Service souhaité : ${serviceLabel}`,
      dynamicText,
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
  
  // Initialize dynamic fields if a service is pre-selected
  if(fields.service.value) {
    window.updateDynamicFields();
  }
})();

  // Dashboard filtering logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 50);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }
