document.addEventListener("DOMContentLoaded", () => {
  // --- NAVBAR ---
  fetch('assets/data/navbar.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('navbar-brand').textContent = data.brand;
      document.getElementById('nav-aims-scope').textContent = data.links.aimsScope;
      document.getElementById('nav-topics').textContent = data.links.topics;
      document.getElementById('nav-program').textContent = data.links.program;
      document.getElementById('nav-cfp').textContent = data.links.cfp;
    })
    .catch(err => console.error("Errore navbar:", err));

  // --- HERO ---
  fetch('assets/data/hero.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('hero-title').textContent = data.title;
      document.getElementById('hero-paragraph').textContent = data.paragraph;
      document.getElementById('hero-button').textContent = data.button;
    })
    .catch(err => console.error("Errore hero:", err));

  // --- AIMS & SCOPE ---
  fetch('assets/data/aimsScope.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('aims-scope-title').textContent = data.title;
      const container = document.getElementById('aims-scope-content');

      // Pulisce il container e poi crea i paragrafi
      container.innerHTML = '';
      data.paragraphs.forEach(par => {
        const p = document.createElement('p');
        p.innerHTML = par; // uso innerHTML per preservare i tag <strong>, <em>, ecc.
        container.appendChild(p);
      });
    })
    .catch(err => console.error("Errore aimsScope:", err));

  // --- TOPICS & PROCEEDINGS ---
  fetch('assets/data/topicsProceedings.json')
    .then(response => response.json())
    .then(data => {
      // Titolo sezione
      document.getElementById('topics-title').textContent = data.topicsSectionTitle;

      // TOPICS
      const topicsContainer = document.getElementById('topics-content');
      topicsContainer.innerHTML = '';
      const topicsLabel = document.createElement('h4');
      topicsLabel.style.color = '#ff6600';
      topicsLabel.textContent = data.topics.label;
      topicsContainer.appendChild(topicsLabel);

      data.topics.sections.forEach(section => {
        const h5 = document.createElement('h5');
        h5.textContent = section.title;
        topicsContainer.appendChild(h5);

        const ul = document.createElement('ul');
        section.items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        topicsContainer.appendChild(ul);
      });

      // PROCEEDINGS
      const proceedingsContainer = document.getElementById('proceedings-content');
      proceedingsContainer.innerHTML = '';
      const procLabel = document.createElement('h4');
      procLabel.style.color = '#ff6600';
      procLabel.innerHTML = data.proceedings.label;
      proceedingsContainer.appendChild(procLabel);

      data.proceedings.paragraphs.forEach(par => {
        const p = document.createElement('p');
        p.innerHTML = par;
        proceedingsContainer.appendChild(p);
      });
    })
    .catch(err => console.error("Errore topicsProceedings:", err));

  // --- PROGRAM & SPEAKERS ---
  fetch('assets/data/programSpeakers.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('program-title').textContent = data.programTitle;
      document.getElementById('program-intro').innerHTML = data.programIntro;
      document.getElementById('speakers-label').textContent = data.speakersLabel;

      // Popolazione speaker
      // Slide 1
      document.getElementById('speaker1-name').textContent = data.speakers[0].name;
      document.getElementById('speaker1-desc').textContent = data.speakers[0].description;
      // Slide 2
      document.getElementById('speaker2-name').textContent = data.speakers[1].name;
      document.getElementById('speaker2-desc').textContent = data.speakers[1].description;
      // Slide 3
      document.getElementById('speaker3-name').textContent = data.speakers[2].name;
      document.getElementById('speaker3-desc').textContent = data.speakers[2].description;
      // Slide 4
      document.getElementById('speaker4-name').textContent = data.speakers[3].name;
      document.getElementById('speaker4-desc').textContent = data.speakers[3].description;

      // Program committee
      document.getElementById('program-committee-text').innerHTML = data.programCommitteeText;
    })
    .catch(err => console.error("Errore programSpeakers:", err));

  // --- CFP & CONTACTS ---
  fetch('assets/data/cfpContacts.json')
    .then(response => response.json())
    .then(data => {
      // Titolo sezione
      document.getElementById('cfp-title').textContent = data.cfpTitle;

      // CfP (colonna sinistra)
      const cfpContentEl = document.getElementById('cfp-content');
      cfpContentEl.innerHTML = `
        <h4 style="color: #ff6600;">${data.cfpContent.title}</h4>
        <p>${data.cfpContent.locationDate}</p>
        <p>${data.cfpContent.intro}</p>
        <p>${data.cfpContent.topicsOfInterest}</p>
        <p>${data.cfpContent.submissionInfo}</p>
        <p>${data.cfpContent.proceedingsInfo}</p>
      `;

      // Important dates
      const datesLabel = document.createElement('p');
      datesLabel.innerHTML = data.cfpContent.importantDates.label;
      cfpContentEl.appendChild(datesLabel);
      const ul = document.createElement('ul');
      data.cfpContent.importantDates.dates.forEach(d => {
        const li = document.createElement('li');
        li.textContent = d;
        ul.appendChild(li);
      });
      cfpContentEl.appendChild(ul);

      // Contatti (colonna destra)
      document.getElementById('contacts-title').textContent = data.contacts.title;
      document.getElementById('contacts-info').textContent = data.contacts.info;
      document.getElementById('contacts-emailtel').innerHTML = data.contacts.emailTel;

      // Form labels
      document.getElementById('label-nome').textContent = data.contacts.formLabels.nome;
      document.getElementById('nome').placeholder = data.contacts.formLabels.nomePlaceholder;

      document.getElementById('label-email').textContent = data.contacts.formLabels.email;
      document.getElementById('email').placeholder = data.contacts.formLabels.emailPlaceholder;

      document.getElementById('label-messaggio').textContent = data.contacts.formLabels.messaggio;
      document.getElementById('messaggio').placeholder = data.contacts.formLabels.messaggioPlaceholder;

      // Bottone invia
      document.getElementById('btn-invia').textContent = data.contacts.sendButton;
    })
    .catch(err => console.error("Errore cfpContacts:", err));

  // --- FOOTER ---
  fetch('assets/data/footer.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('footer-text').innerHTML = data.footerText;
      document.getElementById('footer-link').textContent = data.footerLinkText;
    })
    .catch(err => console.error("Errore footer:", err));
});
