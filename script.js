// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode) {
  darkModeToggle.checked = JSON.parse(savedDarkMode);
  applyDarkMode(darkModeToggle.checked);
}

darkModeToggle.addEventListener('change', () => {
  localStorage.setItem('darkMode', darkModeToggle.checked);
  applyDarkMode(darkModeToggle.checked);
});

function applyDarkMode(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const recentSearches = document.getElementById('recent-searches');

function loadRecentSearches() {
  const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  recentSearches.innerHTML = '';
  searches.slice(0, 10).forEach(search => {
    const li = document.createElement('li');
    li.textContent = search;
    li.addEventListener('click', () => {
      searchInput.value = search;
      performSearch(search);
    });
    recentSearches.appendChild(li);
  });
}

function performSearch(query) {
  if (!query.trim()) return;

  const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  if (!searches.includes(query)) {
    searches.unshift(query);
    localStorage.setItem('recentSearches', JSON.stringify(searches.slice(0, 10)));
  }

  // Redirect to proxy with search
  const encodedQuery = encodeURIComponent(query);
  window.location.href = `/service/?q=${encodedQuery}`;
}

searchButton.addEventListener('click', () => {
  performSearch(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    performSearch(searchInput.value);
  }
});

// Load recent searches on page load
loadRecentSearches();

// Focus input on page load
searchInput.focus();