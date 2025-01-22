// Script Personalizzato
document.addEventListener('DOMContentLoaded', function() {
    // Aggiorna l'anno corrente nel footer
    const yearSpan = document.getElementById('annoCorrente');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Abilita animazioni su scroll con Intersection Observer
    const faders = document.querySelectorAll('.fade-up');
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          // Sblocca l'animazione
          entry.target.style.animationPlayState = 'running';
          // Se vuoi animarlo solo la prima volta, smetti di osservare
          obs.unobserve(entry.target);
        }
      });
    }, options);
  
    faders.forEach(fader => {
      // Mette l'animazione in pausa finché non appare in viewport
      fader.style.animationPlayState = 'paused';
      observer.observe(fader);
    });
  });
  