document.addEventListener("DOMContentLoaded", () => {
  // --- NAVBAR ---
  fetch('assets/data/navbar.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('navbar-brand').textContent = data.brand;
      document.getElementById('nav-aims-scope').textContent = data.links.aimsScope;
      document.getElementById('nav-topics').textContent = data.links.topics;
      document.getElementById('nav-program').textContent = data.links.program;
      document.getElementById('nav-committee').textContent = data.links.committee;
      document.getElementById('nav-cfp').textContent = data.links.cfp;
      // Se il file JSON non fornisce il testo per program schedule, usa il default
      document.getElementById('nav-program-schedule').textContent = data.links.programSchedule || "Program Schedule";
      document.getElementById('nav-submission-details').textContent = data.links.submissionDetails;
      document.getElementById('nav-venue').textContent = data.links.venue;
      document.getElementById('nav-registration').textContent = data.links.registration;
      document.getElementById('nav-importantDates').textContent = data.links.importantDates;
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
      container.innerHTML = '';
      data.paragraphs.forEach(par => {
        const p = document.createElement('p');
        p.innerHTML = par;
        container.appendChild(p);
      });
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
      document.getElementById('topics-title').textContent = data.topicsSectionTitle;
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
      const carouselInner = document.getElementById('speakersCarousel-inner');
      carouselInner.innerHTML = '';
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
      document.getElementById('program-committee-text').innerHTML = data.programCommitteeText;
    })
    .catch(err => console.error("Error loading programSpeakers:", err));

  // --- CFP & CONTACTS ---
  fetch('assets/data/cfpContacts.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('cfp-title').textContent = data.cfpTitle;
      const cfpContentEl = document.getElementById('cfp-content');
      cfpContentEl.innerHTML = `
        <h4 style="color: #ff6600;">${data.cfpContent.title}</h4>
        <p>${data.cfpContent.locationDate}</p>
        <p>${data.cfpContent.intro}</p>
        <p>${data.cfpContent.topicsOfInterest}</p>
        <p>${data.cfpContent.submissionInfo}</p>
        <p>${data.cfpContent.proceedingsInfo}</p>
      `;
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
      // (Eventuali dati per la sezione "Contatti" possono essere gestiti in pagina dedicata)
    })
    .catch(err => console.error("Errore cfpContacts:", err));

  // --- COMMITTEE ---
  fetch("assets/data/committee.json")
    .then(response => response.json())
    .then(committeeData => {
      document.getElementById('committee-title').innerText = committeeData.title;
      const committeeSection = document.getElementById('committee-content');
      committeeSection.innerHTML = '';
      Object.entries(committeeData.sections).forEach(([sectionTitle, members]) => {
        const div = document.createElement('div');
        div.innerHTML = `<h4>${sectionTitle}</h4>`;
        if (Array.isArray(members)) {
          const ul = document.createElement('ul');
          members.forEach(member => {
            const li = document.createElement('li');
            li.innerHTML = member;
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

  // --- PROGRAM SCHEDULE ---
  fetch('assets/data/ProgramSchedule.json')
    .then(response => response.json())
    .then(data => {
      const scheduleContainer = document.getElementById('program-schedule-content');
      scheduleContainer.innerHTML = `<h3>${data.title}</h3>`;
      data.days.forEach(day => {
         scheduleContainer.innerHTML += `<h4>${day.date}</h4><ul>`;
         day.events.forEach(event => {
           scheduleContainer.innerHTML += `<li><strong>${event.time}</strong> - ${event.description}</li>`;
         });
         scheduleContainer.innerHTML += `</ul>`;
      });
    })
    .catch(err => console.error("Error loading ProgramSchedule:", err));

  // --- SUBMISSION DETAILS ---
  fetch('assets/data/SubmissionDetails.json')
    .then(response => response.json())
    .then(data => {
      const submissionContainer = document.querySelector('#submission-details .dark-card');
      submissionContainer.innerHTML = data.content;
    })
    .catch(err => console.error("Error loading SubmissionDetails:", err));

  // --- VENUE ---
  fetch('assets/data/venue.json')
    .then(response => response.json())
    .then(data => {
      const venueContainer = document.querySelector('#venue .dark-card');
      let venueHTML = data.description;
      if (data.images && data.images.length > 0) {
        venueHTML += '<div class="venue-images">';
        data.images.forEach(img => {
          venueHTML += `<img src="${img.src}" alt="${img.alt}">`;
        });
        venueHTML += '</div>';
      }
      if (data.mapEmbed) {
        // Wrap the map embed inside a responsive container
        venueHTML += `<div class="venue-map"><div class="map-responsive">${data.mapEmbed}</div></div>`;
      }
      venueContainer.innerHTML = venueHTML;
    })
    .catch(err => console.error("Error loading venue:", err));

  // --- REGISTRATION ---
  fetch('assets/data/registration.json')
    .then(response => response.json())
    .then(data => {
      const regContainer = document.querySelector('#registration .dark-card');
      let regHTML = data.description;
      if(data.registrationLink) {
         regHTML += `<p><a href="${data.registrationLink}" class="btn btn-primary" target="_blank">Register Now</a></p>`;
      }
      if(data.fees) {
         regHTML += `<h4>Fees</h4>${data.fees}`;
      }
      regContainer.innerHTML = regHTML;
    })
    .catch(err => console.error("Error loading registration:", err));

  // --- IMPORTANT DATES ---
  fetch("assets/data/important-dates.json")
    .then(response => response.json())
    .then(datesData => {
        document.getElementById('important-dates-title').innerText = datesData.title;
        const datesContent = document.getElementById('important-dates-content');
        const ul = document.createElement('ul');
        datesData.dates.forEach(dateEntry => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${dateEntry.event}:</strong> ${dateEntry.date}`;
            ul.appendChild(li);
        });
        datesContent.appendChild(ul);
    })
    .catch(err => console.error("Error loading important dates:", err));

  // --- FOOTER ---
  fetch('assets/data/footer.json')
    .then(response => response.json())
    .then(data => {
      document.getElementById('footer-text').innerHTML = data.footerText;
      document.getElementById('footer-link').textContent = data.footerLinkText;
    })
    .catch(err => console.error("Errore footer:", err));
  
  // Imposta l'anno corrente nel footer (se non già gestito dal footer.json)
  const annoElem = document.getElementById("annoCorrente");
  if(annoElem) {
    annoElem.textContent = new Date().getFullYear();
  }
});

tsParticles.load("tsparticles", {
  fullScreen: {
    enable: true,
    zIndex: -999  // Forza il canvas a rimanere sotto tutto
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        area: 800
      }
    },
    color: {
      value: "#ff6600"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.8,
      random: true
    },
    size: {
      value: { min: 3, max: 7 },
      random: true
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: {
        default: "out"
      }
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      onClick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
}).then((container) => {
  // Forza il canvas a essere gestito tramite GPU per evitare reflow e lo "hopping"
  if (container && container.canvas && container.canvas.element) {
    const canvasEl = container.canvas.element;
    canvasEl.style.transform = "translate3d(0, 0, 0)";
    canvasEl.style.willChange = "transform";
    // Imposta dimensioni fisse
    canvasEl.style.position = "fixed";
    canvasEl.style.top = "0";
    canvasEl.style.left = "0";
    canvasEl.style.width = "100vw";
    canvasEl.style.height = "100vh";
  }
});