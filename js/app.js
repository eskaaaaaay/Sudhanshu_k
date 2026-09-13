/**
 * Executive Dossier Application Controller
 * Sudhanshu Kulshreshtha: Head of Data • Founder & CEO @ Loggdin
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderHero();
  renderPillars();
  renderInitiatives();
  renderExperience();
  renderGovernanceSidebar();
  initInteractions();
});

// Theme Management (Default Calm Light)
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('sk_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sk_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  } else {
    icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

// Render Hero Information & Numbers
function renderHero() {
  const p = PORTFOLIO_DATA.profile;
  const bioEl = document.getElementById('hero-bio');
  const statsContainer = document.getElementById('stats-bar-container');

  if (bioEl) bioEl.textContent = p.bio;

  if (statsContainer) {
    statsContainer.innerHTML = p.stats.map(s => `
      <div class="stat-item">
        <div class="stat-val">${s.value}</div>
        <div class="stat-label">${s.label}</div>
        <div class="stat-desc">${s.detail}</div>
      </div>
    `).join('');
  }
}

// Render Strategic Pillars
function renderPillars() {
  const container = document.getElementById('pillars-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.executivePillars.map(p => `
    <div class="pillar-card">
      <h3 class="pillar-title">${p.title}</h3>
      <p class="pillar-desc">${p.description}</p>
    </div>
  `).join('');
}

// Render Curated Initiatives (Clean, No Tag Bloat)
function renderInitiatives() {
  const container = document.getElementById('initiatives-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.initiatives.map(item => `
    <div class="initiative-card" onclick="openInitiativeModal('${item.id}')">
      <div>
        <div class="initiative-category">${item.category}</div>
        <h3 class="initiative-title">${item.title}</h3>
        <div class="initiative-lead-metric">${item.leadMetric}</div>
        <p class="initiative-summary">${item.summary}</p>
      </div>
      <div class="initiative-action">
        <span>Read Executive Brief</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  `).join('');
}

// Modal View for Executive Brief
window.openInitiativeModal = function(id) {
  const item = PORTFOLIO_DATA.initiatives.find(i => i.id === id);
  if (!item) return;

  const modal = document.getElementById('initiative-modal');
  const modalBody = document.getElementById('modal-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="initiative-category">${item.category}</div>
    <h2 style="font-size: 1.45rem; margin-top: 0.25rem; margin-bottom: 0.5rem;">${item.title}</h2>
    <div style="font-weight: 700; color: var(--calm-slate-deep); font-size: 0.95rem; margin-bottom: 0.75rem;">
      ${item.leadMetric}
    </div>
    
    <div class="modal-metric-grid">
      ${item.metrics.map(m => `
        <div class="modal-metric-item">
          <div class="val">${m.value}</div>
          <div class="lbl">${m.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="modal-sec-title">The Challenge & Mandate</div>
    <p class="modal-text">${item.challenge}</p>

    <div class="modal-sec-title">Executive Action & Methodology</div>
    <p class="modal-text">${item.action}</p>

    <div class="modal-sec-title">Measurable Strategic Outcome</div>
    <p class="modal-text">${item.outcome}</p>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeInitiativeModal = function() {
  const modal = document.getElementById('initiative-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
};

// Render Leadership Experience
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map(exp => `
    <div class="exp-card">
      <div class="exp-header">
        <h3 class="exp-role">${exp.role}</h3>
        <span class="exp-period">${exp.period}</span>
      </div>
      <div class="exp-company">${exp.company} • ${exp.location}</div>
      <p class="exp-summary">${exp.summary}</p>
      <ul class="exp-bullets">
        ${exp.keyAchievements.map(k => `
          <li class="exp-bullet">
            <span class="exp-bullet-dot">▸</span>
            <span>${k}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

// Render Governance, Appointments & Credentials Sidebar
function renderGovernanceSidebar() {
  const govContainer = document.getElementById('governance-container');
  const eduContainer = document.getElementById('education-container');
  const certContainer = document.getElementById('certifications-container');

  if (govContainer) {
    govContainer.innerHTML = PORTFOLIO_DATA.governanceAndCivic.map(g => `
      <div class="gov-item">
        <div class="gov-role">${g.title}</div>
        <div class="gov-period">${g.period}</div>
        <p class="gov-desc">${g.detail}</p>
      </div>
    `).join('');
  }

  if (eduContainer) {
    eduContainer.innerHTML = PORTFOLIO_DATA.credentials.education.map(e => `
      <div class="edu-item">
        <div class="edu-deg">${e.degree}</div>
        <div class="edu-school">${e.school} • ${e.year}</div>
      </div>
    `).join('');
  }

  if (certContainer) {
    certContainer.innerHTML = PORTFOLIO_DATA.credentials.certifications.map(c => `
      <span class="cert-pill">${c}</span>
    `).join('');
  }
}

// Interactions (Modal closing, drawer, copy email)
function initInteractions() {
  const modal = document.getElementById('initiative-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeInitiativeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInitiativeModal();
  });

  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  window.copyEmail = function() {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
      alert('Copied to clipboard: ' + PORTFOLIO_DATA.profile.email);
    });
  };
}
