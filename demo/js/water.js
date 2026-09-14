/**
 * Ocean & Water Portfolio Application Controller
 */

// Theme Management (Sunrise/Day vs Twilight/Deep Ocean)
(function() {
  const toggleBtn = document.getElementById('water-theme-toggle');
  const icon = document.getElementById('water-theme-icon');

  const sunIcon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  const moonIcon = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sk_water_theme', theme);
    if (icon) {
      icon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
  }

  const storedTheme = localStorage.getItem('sk_water_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }
})();

// Sentiments Data & Renderer (Used on empathy.html)
const memberSentiments = [
  {
    filter: "non-judgemental",
    tag: "Non Judgemental",
    quote: "Thank you for letting me speak freely without judging anything I went through. I was terrified to say it out loud, but you made it safe.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  },
  {
    filter: "patient",
    tag: "Patient and Calm",
    quote: "You stayed with me through my panic attack with so much patience and kindness. Your calm energy helped bring my breathing back to normal.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  },
  {
    filter: "heard",
    tag: "Truly Heard",
    quote: "For the first time in months, I felt like another human actually listened to understand me rather than trying to fix me or brush me off.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  },
  {
    filter: "declutter",
    tag: "Clear Mind",
    quote: "My mind was spiraling with clutter. Just having you reflect things back gently helped me see the answer that was right in front of me.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  },
  {
    filter: "non-judgemental",
    tag: "Kind and Gentle",
    quote: "So kind, gentle, and thoughtful. You did not push your opinions on me once. You just held space and helped me feel grounded.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  },
  {
    filter: "heard",
    tag: "Felt Supported",
    quote: "I was carrying so much heavy weight alone. Talking to you gave me the relief and peace I desperately needed tonight. Thank you.",
    meta: "Member on 7Cups &bull; Verified Listener Feedback"
  }
];

function initSentimentExplorer() {
  const container = document.getElementById('sentiments-grid');
  if (!container) return;

  function render(filter = "all") {
    const list = filter === "all" ? memberSentiments : memberSentiments.filter(s => s.filter === filter);
    container.innerHTML = list.map(item => `
      <div class="sentiment-tile">
        <div>
          <div class="sentiment-tile-tag">${item.tag}</div>
          <div class="sentiment-tile-quote">"${item.quote}"</div>
        </div>
        <div class="sentiment-tile-meta">${item.meta}</div>
      </div>
    `).join('');
  }

  const buttons = document.querySelectorAll('.chip-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      render(this.getAttribute('data-filter'));
    });
  });

  render("all");
}

// Mobile Drawer Navigation Controller
(function() {
  function setupDrawer() {
    const hamburgerBtn = document.getElementById('mobile-menu-trigger');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-drawer-close');

    if (!hamburgerBtn || !drawer || !overlay) return;

    function openDrawer() {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    hamburgerBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    const links = drawer.querySelectorAll('.mobile-nav-link');
    links.forEach(l => l.addEventListener('click', closeDrawer));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDrawer);
  } else {
    setupDrawer();
  }
})();

document.addEventListener('DOMContentLoaded', initSentimentExplorer);

