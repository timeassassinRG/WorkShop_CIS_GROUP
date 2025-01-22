// Imposta l'anno corrente nel footer
document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.getElementById("annoCorrente");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  });
  