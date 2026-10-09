/**
 * PRELOADER.JS - Splash Screen Loading Sequence & Smooth Curtain-Up Transition
 * Plays the 5.1s animated video sequence and slides straight up like a curtain.
 */

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash-preloader');
    const splashVideo = document.getElementById('splash-video');
    if (!splash) return;

    let isDismissed = false;

    function dismissSplash() {
      if (isDismissed) return;
      isDismissed = true;

      // Curtain-up transition: slides straight UP
      splash.classList.add('splash-curtain-up');

      setTimeout(() => {
        splash.style.display = 'none';
        document.body.classList.remove('no-scroll');
      }, 850);
    }

    // Shortened to 2 seconds for better UX (was 5.1s)
    const autoTimer = setTimeout(dismissSplash, 2000);

    // If video ends earlier, dismiss immediately
    if (splashVideo) {
      splashVideo.addEventListener('ended', () => {
        clearTimeout(autoTimer);
        dismissSplash();
      });

      const playPromise = splashVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback: timer will handle dismissal
        });
      }
    }
  });
})();
