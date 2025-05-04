import { toHtmlElement } from './toHtmlElement.mjs';

const navLinks = [
  { href: "index.html", label: "Home", ariaLabel: "Go to home page" },
  { href: "projects.html", label: "Projects", ariaLabel: "View my projects" },
  { href: "hobbies.html", label: "Hobbies", ariaLabel: "View my hobbies" }
];

function createNavLinksHTML() {
  return navLinks.map(link => 
    `<a href="${link.href}" aria-label="${link.ariaLabel}">${link.label}</a>`
  ).join('\n        ');
}

function createHeaderHTML(title = "Oleksandr Gorpynich") {
  return `
    <header role="banner">
      <h1>${title}</h1>
      <div class="header-controls">
        <label class="dark-mode-toggle">
          <input type="checkbox" autocomplete="off" id="dark-mode-checkbox" />
          Dark mode
        </label>
        <button id="menu-button" aria-label="Toggle navigation menu">Menu</button>
      </div>
      <nav role="navigation" aria-label="Main navigation" class="nav-links">
        ${createNavLinksHTML()}
      </nav>
    </header>
  `;
}

function setupMobileMenu() {
  const header = document.querySelector('header');
  const menuButton = document.getElementById('menu-button');
  const navLinks = document.querySelector('.nav-links');
  
  // Toggle menu when button is clicked
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('visible');
  });
  
  // Close menu when clicking outside the header
  document.body.addEventListener('click', (event) => {
    // If the click is outside the header and menu is open, close it
    if (!header.contains(event.target) && navLinks.classList.contains('visible')) {
      navLinks.classList.remove('visible');
    }
  });
}

function setupDarkModeToggle() {
  const checkbox = document.getElementById('dark-mode-checkbox');
  
  // Check localStorage for saved preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply saved preference
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    checkbox.checked = true;
  }
  
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      document.body.classList.add('dark-mode');
      // Save to localStorage
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      // Save to localStorage
      localStorage.setItem('darkMode', 'false');
    }
  });
}

function insertHeader(title) {
  const headerElement = toHtmlElement(createHeaderHTML(title));
  document.body.prepend(headerElement);
  setupMobileMenu();
  setupDarkModeToggle();
}

document.addEventListener('DOMContentLoaded', () => {
  insertHeader();
}); 