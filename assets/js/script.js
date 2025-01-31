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
      document.getElementById('hero-subtitle').textContent = data.subtitle;
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

    // Clear existing content
    container.innerHTML = '';

    // Add paragraphs
    data.paragraphs.forEach(par => {
      const p = document.createElement('p');
      p.innerHTML = par; // Use innerHTML to preserve formatting
      container.appendChild(p);
    });

    // Create and append list if topics exist
    if (data.topics && data.topics.length > 0) {
      const ul = document.createElement('ul');
      data.topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    }
  })
  .catch(err => console.error("Error loading aimsScope:", err));

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
    fetch('assets/data/programSpeakers.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('program-title').textContent = data.programTitle;
        document.getElementById('program-intro').innerHTML = data.programIntro;
        document.getElementById('speakers-label').textContent = data.speakersLabel;
        
        const carouselInner = document.getElementById('speakersCarousel-inner');
        carouselInner.innerHTML = ''; // Clear existing slides
        
        data.speakers.forEach((speaker, index) => {
          const isActive = index === 0 ? 'active' : '';
          const slide = `
            <div class="carousel-item ${isActive} text-center">
              <img src="${speaker.image}" class="d-block mx-auto mb-4" alt="${speaker.name}" />
              <h5>${speaker.name}</h5>
              <p>${speaker.description}</p>
            </div>
          `;
          carouselInner.innerHTML += slide;
        });
      })
      .catch(err => console.error("Error loading programSpeakers:", err));

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

  // --- commitee ---

  fetch("assets/data/committee.json")
    .then(response => response.json())
    .then(committeeData => {
        document.getElementById('committee-title').innerText = committeeData.title;
        let committeeSection = document.getElementById('committee-content');
        
        Object.entries(committeeData.sections).forEach(([title, members]) => {
            let div = document.createElement('div');
            div.innerHTML = `<h4>${title}</h4>`;

            if (Array.isArray(members)) {
                let ul = document.createElement('ul');
                members.forEach(member => {
                    let li = document.createElement('li');
                    li.innerHTML = member; // Use innerHTML instead of innerText
                    ul.appendChild(li);
                });
                div.appendChild(ul);
            } else {
                div.innerHTML += `<p>${members}</p>`;
            }

            committeeSection.appendChild(div);
        });
    })
    .catch(err => console.error("Error loading committee data:", err));



    // Fetch and Load Important Dates
    fetch("assets/data/important-dates.json")
    .then(response => response.json())
    .then(datesData => {
        document.getElementById('important-dates-title').innerText = datesData.title;
        let datesContent = document.getElementById('important-dates-content');
        
        let ul = document.createElement('ul');
        datesData.dates.forEach(dateEntry => {
            let li = document.createElement('li');
            li.innerHTML = `<strong>${dateEntry.event}:</strong> ${dateEntry.date}`;
            ul.appendChild(li);
        });
        
        datesContent.appendChild(ul);
    })
    .catch(err => console.error("Error loading important dates:", err));

});
