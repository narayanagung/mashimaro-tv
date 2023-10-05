const headerTitle = document.getElementById("Header-Title");

// Render content based on the route
function renderPage(route) {
  switch (route) {
    case "/index.html":
      document.title = "Mashimaro TV";
      headerTitle.innerHTML = "<h3>Mashimaro TV</h3>";
      break;
    case "/itou-chika/index.html":
      document.title = "Itou Chika Character Song";
      headerTitle.innerHTML = "<h3>Itou Chika Character Song</h3>";
      break;
  }
}

function handleRouteChange() {
  const path = window.location.pathname;
  renderPage(path);
}

// Listen for changes in the URL
window.addEventListener("popstate", handleRouteChange);

// Initial rendering based on the current URL
handleRouteChange();
