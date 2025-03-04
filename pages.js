document.addEventListener("DOMContentLoaded", function () {
  loadNav();

  // Initially load the home page
  loadContent('home');

  document.getElementById("year").textContent = new Date().getFullYear();
});

/**
 * Dynamically load the nav.html
 */
function loadNav() {
  fetch('nav.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('app-nav').innerHTML = data;
      
      setupNavListeners();
    })
    .catch(error => console.error("Error loading nav:", error));
}

/**
 * Attach a listener to each nav anchor element
 */
function setupNavListeners() {
  const navLinks = document.querySelectorAll('#app-nav a:not(.icon)');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();  
      toggleMenu();

      const page = this.id.replace('-link', '');
      loadContent(page);
    });
  });
}

/**
 * Load the content of a page into the app-content container
 * @param {*} page 
 */
function loadContent(page) {
  fetch(`pages/${page}.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById('app-content').innerHTML = data;
      document.title = `SimpleStatic - ${page.charAt(0).toUpperCase() + page.slice(1)}`

      if (page === "collection") {
        // When the collection page is loaded this method should be called to refresh the collection
        refreshItems();
      }

      setActiveLink(page);
    })
    .catch(error => console.error("Error loading content:", error));
}

/**
 * Set the active page in the nav
 * @param {*} page 
 */
function setActiveLink(page) {
  const links = document.querySelectorAll('#app-nav a');
  links.forEach(link => {
    link.classList.remove('active');
  });

  const activeLink = document.getElementById(`${page}-link`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

/**
 * Function to toggle the mobile version nav
 */
function toggleMenu() {
  const nav = document.getElementById('app-nav');
  nav.classList.toggle('menu-open');
}