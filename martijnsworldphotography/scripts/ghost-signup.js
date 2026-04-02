(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGhostSignup);
  } else {
    initGhostSignup();
  }

  function initGhostSignup() {
    // Check if Ghost signup container exists
    const container = document.getElementById('ghost-signup-form');
    if (!container) return;

    // Create and inject the Ghost signup script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.3/umd/signup-form.min.js';
    script.setAttribute('data-button-color', '#910101');
    script.setAttribute('data-button-text-color', '#FFFFFF');
    script.setAttribute('data-site', 'https://blog.martijntravels.nl/');
    script.setAttribute('data-locale', 'en');
    script.async = true;

    container.appendChild(script);
  }
})();
