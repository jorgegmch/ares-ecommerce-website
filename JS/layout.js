// Logica back-end del NAV responsive

document.addEventListener('DOMContentLoaded', () => {

    const menuButton = document.querySelector('.menu-responsive');
    const overlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.menu-overlay-close');

    if (!menuButton || !overlay || !closeButton) return;

    menuButton.classList.remove('active');
    overlay.classList.remove('active');

    function openMenu() {
        menuButton.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuButton.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu(e) {
        e.stopPropagation();
        closeSearchPanel();
        overlay.classList.contains('active') ? closeMenu() : openMenu();
    }

    // Botón hamburguesa
    menuButton.addEventListener('click', toggleMenu);

    // Botón cerrar ✕
    closeButton.addEventListener('click', closeMenu);

    // Click en links
    document.querySelectorAll('.main-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar al hacer clic fuera del contenedor
    document.addEventListener('click', (e) => {

        const clickedInsideMenu = overlay.contains(e.target);
        const clickedMenuButton = menuButton.contains(e.target);

        if (!clickedInsideMenu && !clickedMenuButton) {
            closeMenu();
        }
    });


    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

});

// Panel de busqueda
document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.querySelector(".search-btn");
    const searchPanel = document.getElementById("searchPanel");
    const searchCancel = document.querySelector(".search-cancel");
    const searchInput = document.querySelector(".search-input");
    const popularList = document.querySelector(".search-column .container-list");

    if (!searchBtn || !searchPanel || !searchCancel || !searchInput || !popularList) return;


    // Data provisional para revisión de la funcionalidad
    const categories = [
        "Camisetas",
        "Jeans",
        "Zapatillas",
        "Chaquetas",
        "Accesorios",
        "Sudaderas",
        "Gorras"
    ];

    const products = [
        "Camiseta Negra ARES",
        "Jeans Slim Fit",
        "Zapatillas Urban X",
        "Chaqueta Denim",
        "Sudadera Oversize",
        "Gorra Street"
    ];

    
    // Panel cerrado por defecto
    searchPanel.classList.remove("active");

    
    // Local storage (Ranking de busqueda)
    const STORAGE_KEY = "ares_search_stats";

    function getStats() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    }

    function saveSearch(term) {
        const stats = getStats();
        stats[term] = (stats[term] || 0) + 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }

    function getTopSearches(limit = 5) {
        const stats = getStats();

        return Object.entries(stats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(item => item[0]);
    }

    // Render busquedas más populares
    function renderPopularSearches() {
        popularList.innerHTML = "";

        const topSearches = getTopSearches();

        if (topSearches.length === 0) {
            categories.slice(0, 5).forEach(cat => addPopularItem(cat));
            return;
        }

        topSearches.forEach(term => addPopularItem(term));
    }

    function addPopularItem(term) {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = term;
        a.href = `catalog.html?search=${encodeURIComponent(term)}`;

        li.appendChild(a);
        popularList.appendChild(li);
    }

    renderPopularSearches();

    
    // Busqueda en tiempo real
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        popularList.innerHTML = "";

        if (!query) {
            renderPopularSearches();
            return;
        }

        const results = [...categories, ...products].filter(item =>
            item.toLowerCase().includes(query)
        );

        results.slice(0, 5).forEach(result => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = result;
            a.href = `catalog.html?search=${encodeURIComponent(result)}`;

            li.appendChild(a);
            popularList.appendChild(li);
        });
    });

    // Enter para buscar o guardar
    searchInput.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const matches = [...categories, ...products].filter(item =>
            item.toLowerCase().includes(query)
        );

        if (matches.length === 0) return;

        const firstMatch = matches[0];

        saveSearch(firstMatch);
        window.location.href = `catalog.html?search=${encodeURIComponent(firstMatch)}`;
    });

    // Abrir y cerrar el panel
    searchBtn.addEventListener("click", () => {
        searchPanel.classList.add("active");
        document.body.style.overflow = "hidden";
        searchInput.focus();
    });

    searchCancel.addEventListener("click", () => {
        searchPanel.classList.remove("active");
        document.body.style.overflow = "";
        searchInput.value = "";
        renderPopularSearches();
    });

    document.addEventListener("click", (e) => {

        const clickedInsidePanel = searchPanel.contains(e.target);
        const clickedSearchBtn = searchBtn.contains(e.target);

        if (!clickedInsidePanel && !clickedSearchBtn) {
            searchPanel.classList.remove("active");
            document.body.style.overflow = "";
            searchInput.value = "";
            renderPopularSearches();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            searchPanel.classList.remove("active");
            document.body.style.overflow = "";
            searchInput.value = "";
            renderPopularSearches();
        }
    });
});

function closeSearchPanel() {
    const searchPanel = document.getElementById("searchPanel");
    const searchInput = document.querySelector(".search-input");

    if (!searchPanel) return;

    searchPanel.classList.remove("active");
    document.body.style.overflow = "";

    if (searchInput) searchInput.value = "";
}


