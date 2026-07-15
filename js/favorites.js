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
    updateFavoriteUI();
}

function updateFavoriteUI() {
    const headerFavBtn = document.querySelector("header .favorite-icon");
    const saveBtn = document.querySelector(".save-button");
    const selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));

    if (selectedRestaurant) {
        const fav = isFavorite(selectedRestaurant.id);

        if (headerFavBtn) {
            headerFavBtn.textContent = fav ? "♥" : "♡";
            headerFavBtn.classList.toggle("is-active", fav);
        }

        if (saveBtn) {
            saveBtn.textContent = fav ? "Ta bort favorit" : "Spara favorit";
            saveBtn.classList.toggle("is-active", fav);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateFavoriteUI();

    const saveBtn = document.querySelector(".save-button");
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const selectedRestaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));
            if (selectedRestaurant) {
                toggleFavorite(selectedRestaurant);
            }
        })
    }

    const headerFavBtn = document.querySelector("header .favorite-icon");
    if (headerFavBtn) {
        headerFavBtn.addEventListener("click", () => {
            if (selectedRestaurant) {
                toggleFavorite(selectedRestaurant);
            }
        })
    }
});

const backBtn = document.getElementById("back-button");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.history.back();
    });
}