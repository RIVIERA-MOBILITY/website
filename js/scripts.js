
function setLanguage(lang) {
  document.documentElement.lang = lang;
  updateServiceOptions();
}

function formatEmail(form) {
  const formData = new FormData(form);
  const subject = document.documentElement.lang === 'fr' ? 'Nouvelle Demande de Réservation' : 'New Booking Request';
  const body = Array.from(formData.entries())
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  window.location.href = `mailto:booking@rivieramobility.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return false;
}

// Update the service select options when language changes
function updateServiceOptions() {
  const lang = document.documentElement.lang;
  const select = document.getElementById('serviceSelect');
  const options = {
    airport: { en: 'Airport Transfer', fr: 'Transfert Aéroport' },
    events: { en: 'Special Events', fr: 'Événements Spéciaux' },
    excursions: { en: 'Tourist Excursions', fr: 'Excursions Touristiques' },
    medical: { en: 'Medical Transport', fr: 'Transport Médical' }
  };

  select.options[0].text = lang === 'fr' ? '...' : '...';

  Object.entries(options).forEach(([value, texts], index) => {
    select.options[index + 1].text = texts[lang];
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');

  if (service) {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      if (card.dataset.service === service) {
        card.classList.add('highlighted');
        setTimeout(() => card.classList.remove('highlighted'), 2000);
      }
    });
  }
  setLanguage('en');
  updateServiceOptions();
});