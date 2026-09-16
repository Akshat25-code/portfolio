/**
 * TYPEWRITER.JS - Natural Animated Typewriter Effect for Hero Headline & Bento Name Card
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Typewriter
    const heroEl = document.getElementById('typewriter-text');
    if (heroEl) {
      const heroPhrases = [
        'AI Engineer.',
        'Software Developer.',
        'Cloud Engineer.',
        'Full-Stack Developer.',
        'System Architect.'
      ];

      let phraseIdx = 0;
      let charIdx = heroPhrases[0].length;
      let isDeleting = true; // Start by holding the full phrase, then deleting!
      let delay = 2200;

      heroEl.textContent = heroPhrases[0];

      function typeHero() {
        const currentPhrase = heroPhrases[phraseIdx];

        if (isDeleting) {
          charIdx--;
          heroEl.textContent = currentPhrase.substring(0, charIdx);
          delay = 45;
        } else {
          charIdx++;
          heroEl.textContent = currentPhrase.substring(0, charIdx);
          delay = 90;
        }

        if (!isDeleting && charIdx >= currentPhrase.length) {
          delay = 2400; // Hold completed phrase
          isDeleting = true;
        } else if (isDeleting && charIdx <= 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % heroPhrases.length;
          delay = 400; // Pause before typing next
        }

        setTimeout(typeHero, delay);
      }

      setTimeout(typeHero, 2000);
    }

    // 2. Bento Card 1 Typewriter (Cycles through all 6 engineering roles)
    const bentoRoleEl = document.getElementById('bento-typewriter-role');
    if (bentoRoleEl) {
      const bentoPhrases = [
        'AI Engineer.',
        'Software Developer.',
        'Cloud Engineer.',
        'Full-Stack Developer.',
        'System Architect.',
        'AI Systems Builder.'
      ];

      let bentoIdx = 0;
      let bentoChar = bentoPhrases[0].length;
      let bentoDeleting = true; // Start by holding initial phrase, then deleting!
      let bentoDelay = 2500;

      bentoRoleEl.textContent = bentoPhrases[0];

      function typeBento() {
        const current = bentoPhrases[bentoIdx];

        if (bentoDeleting) {
          bentoChar--;
          bentoRoleEl.textContent = current.substring(0, bentoChar);
          bentoDelay = 45;
        } else {
          bentoChar++;
          bentoRoleEl.textContent = current.substring(0, bentoChar);
          bentoDelay = 90;
        }

        if (!bentoDeleting && bentoChar >= current.length) {
          bentoDelay = 2400; // Hold completed phrase
          bentoDeleting = true;
        } else if (bentoDeleting && bentoChar <= 0) {
          bentoDeleting = false;
          bentoIdx = (bentoIdx + 1) % bentoPhrases.length;
          bentoDelay = 400; // Pause before typing next
        }

        setTimeout(typeBento, bentoDelay);
      }

      setTimeout(typeBento, 2200);
    }
  });
})();
