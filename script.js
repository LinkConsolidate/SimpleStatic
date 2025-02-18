document.addEventListener("DOMContentLoaded", function () {
  loadNav();  // Load the navigation

  // Initially load the home page
  loadContent('pages/home.html');
  setActiveLink('home');  // Set active class for Home on initial load
});

// Function to load the navigation into the #app-nav placeholder
function loadNav() {
  fetch('nav.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('app-nav').innerHTML = data;
      
      // After nav is loaded, set up event listeners
      setupNavListeners();
    })
    .catch(error => console.error("Error loading nav:", error));
}

// Function to set up event listeners for the nav links
function setupNavListeners() {
  // Attach event listeners to all nav links except the hamburger menu
  const navLinks = document.querySelectorAll('#app-nav a:not(.icon)');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();  // Prevent default behavior of the link

      // Get the page name from the link's id (e.g., home-link → home)
      const page = this.id.replace('-link', '');
      
      // Load the corresponding page
      loadContent(`pages/${page}.html`);

      // Set the active link
      setActiveLink(page);

      // Update the URL (without reloading the page)
      history.pushState(null, '', `#${page}`);
    });
  });
}

// Function to load the content into #app-content
function loadContent(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('app-content').innerHTML = data;
    })
    .catch(error => console.error("Error loading content:", error));
}

// Function to set the active class on the current link
function setActiveLink(page) {
  // Remove the active class from all links
  const links = document.querySelectorAll('#app-nav a');
  links.forEach(link => {
    link.classList.remove('active');
  });

  // Add the active class to the selected link
  const activeLink = document.getElementById(`${page}-link`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Toggle the menu for mobile view (hamburger) - no page loading triggered here
function toggleMenu() {
  const nav = document.getElementById('app-nav');
  nav.classList.toggle('responsive'); // Simply toggle visibility of the navigation
}
