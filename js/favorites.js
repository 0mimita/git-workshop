function getFavorites() {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(restaurantId) {
    const favorites = getFavorites();
    return favorites.some(item => item.id === restaurantId);
}

function toggleFavorite(restaurant) {
    let favorites = getFavorites();
    const index = favorites.findIndex(item => item.id === restaurant.id);

    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(restaurant);
    }
    saveFavorites(favorites);
    updateSaveButton();
    renderFavorites();
}

function updateSaveButton() {
    const saveBtn = document.querySelector(".save-button");
    const selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));

    if (saveBtn && selectedRestaurant) {
        const fav = isFavorite(selectedRestaurant.id_establishment);
        saveBtn.textContent = fav ? "Ta bort favorit" : "Spara favorit";
        saveBtn.classList.toggle("is-active", fav);

        if (headerFavBtn) {
            headerFavBtn.textContent = fav ? "♥" : "♡";
            headerFavBtn.classList.toggle("is-active", fav);
        }

        if (saveBtn) {
            saveBtn.textContent = fav ? "Ta bort favorit" : "Spara favorit";
            saveBtn.classList.toggle("is-active", fav);
        }
    }

    function renderFavorites() {
        const container = document.getElementById("favorites-container");

        if (!container) return;

        const favorites = getFavorites();
        if (favorites.length === 0) {
            container.innerHTML = "<p>Inga favoriter sparade</p>";
            return;
        }

        container.innerHTML = "";
        favorites.forEach(restaurant => {
            const card = document.createElement("div");
            card.classList.add("restaurant-card)");
            card.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>
            ${restaurant.distance_in_km ? restaurant.distance_in_km.toFixed(1) + " km • " : ""}
            ${restaurant.avg_lunch_pricing} kr
            </p>
            `;

            card.addEventListener("click", () => {
                localStorage.setItem("selectedRestaurant", JSON.stringify(restaurant));
                window.location.href = "restaurant.html";
            });
            container.appendChild(card);
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        updateSaveButton();

        const saveBtn = document.querySelector(".save-button");
        if (saveBtn) {
            saveBtn.addEventListener("click", () => {
                const selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));
                if (selectedRestaurant) {
                    toggleFavorite(selectedRestaurant);
                }
            });
        }
    });

const backBtn = document.getElementById("back-button");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.history.back();
    });
}};